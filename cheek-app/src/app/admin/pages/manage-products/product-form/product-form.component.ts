import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { ProductsService } from 'src/app/products/services/products.service';
import { SizesService } from 'src/app/products/services/sizes.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  title = "Ajouter un produit";

  productForm = this.formBuilder.group({
    category: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
    details: this.formBuilder.array([])
  })

  productId: number = 0;
  productSlug: string = '';
  product: any;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  msgSuccessCreate: string = '';
  msgSuccessUpdate: string = '';
  categories: any = [];
  sizes: any = [];
  file: any;
  fileName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private sizesService: SizesService,
    private router: Router
  ) {}

  onChangeCategory(event: Event) {
    const value = parseInt((event.target as HTMLSelectElement).value, 10);
    //this.productForm.setValue({'category': value})
    console.log( "cat value",value);

      this.productForm.setValue({
        ...this.productForm.value,
        // @ts-ignore
        category: value
      })


  }

  onChangeSize(event: Event, index: number) {
    const value = (event.target as HTMLSelectElement).value;
    this.details.at(index).setValue({size: parseInt(value, 10), price_ht: 0, stock: 0})
  }

  ngOnInit(): void {  
    this.getCategories();
    this.getSizes();
  }

  get f() {
    return this.productForm.controls;
  }

  get details() {
    return this.productForm.controls['details'] as FormArray;
  }
  
  addDetails(){
    const addDetail = this.formBuilder.group({
      price_ht: ['', [Validators.required, Validators.minLength(1)]],
      size: ['', [Validators.required]],
      stock: ['', [Validators.required]]
    });
    this.details.push(addDetail)    
  }

  deleteDetail() {
    
  }


  getCategories(){
    this.categoriesService.findAll().subscribe(categories =>
      { this.categories = categories })
   }

  getSizes(){
    this.sizesService.getSizes(). subscribe( sizes => {this.sizes = sizes})
  }

  onSubmit() {
    const formValues = this.productForm.value
    console.log("product",formValues);
    
    if(this.productForm.valid) {
      this.productsService.create(formValues as any).subscribe((form) => {
        console.log(form);
      })
    }
    
    // for (let i = 0; i < this.details.length; i++) {
    //  // console.log(this.detailsForm.value);
      
    //   const formDetailsValues = this.detailsForm.value
    //   console.log("details form",formDetailsValues);
      
    // }
    
   
    // if(this.productSlug){      
    //   this.productsService.update(this.productId,
    //     { ...formValues,
    //       // productSizeStockId: this.product.productSizeStocks[0].id,
    //       // stockId: this.product.productSizeStocks[0].stock.id,
    //       // priceId: this.product.price.id 
    //     }
    //     ).subscribe(
    //       (res:any) => {
    //         this.isUpdated = true;
    //         this.msgSuccessUpdate = res.message;
    //       });
        
    // } else {
      // this.productsService.create(formValues).subscribe({
    
      //   next: (res) => {
      //     console.log("form", formValues);
      //     console.log("res", res);
      //   }
      // }

        // (res:any) => {
        //   this.msgSuccessCreate = res.message;     
        //   this.isCreated = true;

        //     if (res.productId) {
        //       const formData = new FormData();
        //       console.log("data", formData);
              
        //       // formData.append("image", this.file);
        //       // formData.append("productId", res.productId);
        //       // formData.append("label", this.fileName);
            
        //       // const upload = this.http.post(`${environment.baseUrl}/pictures`, formData);
        //       // upload.subscribe((uploadRes)=> uploadRes);
        //     }
        // }
      //)
    
    // setTimeout( ()=> {
    //   this.router.navigate(['admin/gestion-produits']);
    // }, 2000 );
   
  }
}
