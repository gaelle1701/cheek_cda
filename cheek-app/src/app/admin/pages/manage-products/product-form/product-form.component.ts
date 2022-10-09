import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { IProductDetail } from 'src/app/core/interfaces/product-detail';
import { ProductsService } from 'src/app/products/services/products.service';
import { SizesService } from 'src/app/products/services/sizes.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  title = "Ajouter un produit";

  productForm!: FormGroup
  detailsForm!: FormGroup


  productId: number = 0;
  productSlug: string = '';
  product: any;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  msgSuccessCreate: string = '';
  msgSuccessUpdate: string = '';
  msgError: string = '';
  categories: any = [];
  sizes: any = [];
  file: any;
  fileName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private sizesService: SizesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  
  initDetailsForm() {
    return this.formBuilder.group({
      price_ht: [0, [Validators.required, Validators.minLength(1)]],
      size: [0, [Validators.required, Validators.minLength(1)]],
      stock: [0, [Validators.required, Validators.min(1)]],
    });
  }


  buildForm() {
    this.detailsForm = this.initDetailsForm() 
    this.productForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      details: this.formBuilder.array([])
    })
  }

  onChangeCategory(event: Event) {
    const value = parseInt((event.target as HTMLSelectElement).value, 10);
      this.productForm.setValue({
        ...this.productForm.value,
        // @ts-ignore
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

  ngOnInit(): void {  
    this.productSlug = this.route.snapshot.paramMap.get('slug') as string;
    this.buildForm()
    this.getCategories();
    this.getSizes();


    if(this.productSlug && this.detailsForm) {
      this.title = "Modifier un produit"
      this.getProductBySlug();
    }
  }

  // **** get forms ****
  get f() {
    return this.productForm.controls;
  }

  get detailsF() {
    return this.productForm.controls['details'] as FormArray;
  }
  
  // **** methods for detailsForm input ****
  addDetails(detail?: any, index?: number){    
    console.log(detail, index);
    
    if(this.productSlug) {
      const addDetail = this.formBuilder.group({
        id: [detail.id],
        price_ht: [detail.price_ht],
        size: [detail.size],
        stock: [detail.stock],
        product: [detail.product ?? undefined]
      });
      this.detailsF.push(addDetail)
    } else {
      this.detailsF.push(this.initDetailsForm())  
    }
  }

  // removeDetails(i: number) {
  //   const control = this.details.controls['details']
  //   control.removeAt(i);
  // }

  // **** methods get of services ****
  getCategories(){
    this.categoriesService.findAll().subscribe(categories =>
      { this.categories = categories })
   }

  getSizes(){
    this.sizesService.getSizes(). subscribe( sizes => {this.sizes = sizes})
  }
  
  getProductBySlug(){   
    
    this.productsService.getProductByName(this.productSlug).subscribe( product => {
      this.productForm.patchValue({
        category: product.category.id,
        name: product.name,
        description: product.description,
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
    })
  }

  // **** submit forms ****
  onSubmit() {
    const formValues = this.productForm.value
    console.log("product",formValues);
    console.log(this.productForm.valid, this.detailsForm.valid);
    
    if(this.productSlug && this.productForm.valid){      
      this.productsService.update(this.productId, formValues as any).subscribe({

        next: (res) => {
          this.isUpdated = true;
          this.msgSuccessUpdate = res.message as string;
        },
        error: (res) => {
          this.msgError = res.error.message;
        }
      });
        
    } else if(this.productForm.valid) {
      this.productsService.create(formValues as any).subscribe({

        next: (res) => {
          // if (res.productId) {
          //   const formData = new FormData();
          //   console.log("data", formData);
            
          //   formData.append("image", this.file);
          //   formData.append("productId", res.productId);
          //   formData.append("label", this.fileName);
          
          //   const upload = this.http.post(`${environment.baseUrl}/pictures`, formData);
          //   upload.subscribe((uploadRes)=> uploadRes);
          // }
          this.msgSuccessCreate = res.message as string;     
          this.isCreated = true;
        },
        error: (res) => {
          this.msgError = res.error.message;
        }
      })
    }
  }
  // setTimeout( ()=> {
  //   this.router.navigate(['admin/gestion-produits']);
  // }, 2000 );
   
}
