import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from 'src/app/products/services/categories/categories.service';
import { PictureService } from 'src/app/products/services/pictures/picture.service';
import { ProductsService } from 'src/app/products/services/products/products.service';
import { SizesService } from 'src/app/products/services/sizes/sizes.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  title = "Ajouter un produit";

  /**** ICONS ****/
  faAdd = faCirclePlus;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash
  
  /**** FORMS ****/
  productForm!: FormGroup
  detailsForm!: FormGroup
  picturesForm!: FormGroup

  /********/
  productId: number = 0;
  product: any;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  msgSuccessCreate: string = '';
  msgSuccessUpdate: string = '';
  msgError: string = '';
  categories: any = [];
  sizes: any = [];
  file: any | null;
  fileName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private sizesService: SizesService,
    private pictureService: PictureService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  initDetailsForm() {
    return this.formBuilder.group({
      price_ht: [0, [Validators.required, Validators.minLength(1)]],
      size: [0, [Validators.required, Validators.minLength(1)]],
      stock: [0, [Validators.required, Validators.min(1)]],
    });
  }

  initPicturesForm(){
    return this.formBuilder.group({
      picture: ['', [Validators.required]],
      label: ['', [Validators.required]]
    });
  }

  buildForm() {
    this.picturesForm = this.initPicturesForm()
    this.detailsForm = this.initDetailsForm() 
    this.productForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      pictures: this.formBuilder.array([]),
      details: this.formBuilder.array([])
    })
  }

  /************* ONCHANGE *************/
  onChangeCategory(event: Event) {
    const value = parseInt((event.target as HTMLSelectElement).value, 10);
      this.productForm.setValue({
        ...this.productForm.value,
        category: value
      })
  }

  onChangeSize(event: Event, index: number, detailForm?: any) {
    const value = (event.target as HTMLSelectElement).value;
    this.detailsF.at(index).setValue({
      size: parseInt(value ?? detailForm.value.size, 10), 
      price_ht: detailForm.value.price_ht ?? 0, 
      stock: detailForm.value.stock ?? 0,
      ...(detailForm.value.product ? {
        product: detailForm.value.product,
        id: detailForm.value.id
      } : undefined)
    })    
  }


  /************* UPLOAD FILE *************/
  onFileSelected(event: any) {
    const pictures = event.target.files
    if(pictures){
      this.fileName = pictures[0].name
    }
   
    for (let index = 0; index < pictures.length; index++) {
      const picture = pictures[index];
      const addPicture = this.formBuilder.group({
        picture,
        label: picture.name
      })
      this.picturesF.push(addPicture)
    }
  }

  ngOnInit(): void {  
    this.route.paramMap.subscribe(param => {
      this.productId = parseInt(param.get('id') as string, 10)
    })
    this.buildForm()
    this.getCategories();
    this.getSizes();

    if(this.productId && this.detailsForm) {
      this.title = "Modifier un produit"
      this.getProductById();
    }
  }

  /************* GET FORMS *************/
  get f() {
    return this.productForm.controls;
  }

  get picturesF(){
    return this.productForm.controls['pictures'] as FormArray;
  }

  get detailsF() {
    return this.productForm.controls['details'] as FormArray;
  }
  
 
  /************* DETAILS FORM *************/
  addDetails(detail?: any, index?: number){      
    if(this.productId) {      
      const addDetail = this.formBuilder.group({
        id: [detail.id],
        price_ht: [detail.price_ht],
        size: [detail.size],
        stock: [detail.stock],
        product: [detail.product ?? undefined]
      });
      this.detailsF.push(addDetail)      
    } else {
      this.detailsF.push(this.initDetailsForm());           
    }
  }

  removeDetails(i: any) {
    this.detailsF.removeAt(i);
  }

  /************* GET METHODS *************/
  getCategories(){
    this.categoriesService.getAll().subscribe(categories =>
      { this.categories = categories })
   }

  getSizes(){
    this.sizesService.getAll(). subscribe( sizes => {this.sizes = sizes})
  }
  
  getProductById(){      
    this.productsService.getOne(this.productId).subscribe( product => {
      this.productForm.patchValue({
        category: product.category.id,
        name: product.name,
        description: product.description,
        picture: product.pictures,
        details: product.details.map((detail, i) => { 
            this.addDetails({ 
              id: detail.id,
              price_ht: detail.price_ht, 
              size: detail.size.id,
              stock: detail.stock,
              product: product.id
            }, i)
        })        
      })
      this.productId = product.id
      this.product = product
      console.log("get product", this.product);
      
    })
  }

  /************* SUBMIT FORM *************/
  onSubmit() {
    const formValues = this.productForm.value  
    const { pictures, ...productPayload } = formValues

    if(this.productId && this.productForm.valid){            
      this.productsService.update(this.productId, productPayload).subscribe({
        next: (res) => {
          this.isUpdated = true;
          this.msgSuccessUpdate = res.message as string;          
        },
        error: (res) => {
          this.msgError = res.error.message;
        }
      });
    } else if(this.productForm.valid) {
      this.productsService.create(productPayload).subscribe({
        next: (product) => {          
          // @ts-ignore
          if (product.savedProduct.id && pictures.length >= 0) {
            pictures.map((picture: any) => {
              const formData: any = new FormData();
              formData.append("picture", picture.picture);
              // @ts-ignore
              formData.append("product_id", product.savedProduct.id);
              formData.append("label", picture.label);
              
              this.pictureService.create(formData).subscribe();             
            })
            this.isCreated = true;
            this.msgSuccessCreate = product.message as string; 
          }
        },
        error: (res) => {
          this.msgError = res.error.message;
        }
      })
    }
    
    setTimeout( ()=> {
      this.router.navigate(['admin/gestion-produits']);
    }, 3000 );
  }
 
   
}
