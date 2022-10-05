import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/products/services/products.service';
import { SizesService } from 'src/app/products/services/sizes.service';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  
  products: any = [];
  sizes: any = [];
  selectedSize: number = 0;

  //icons
  faEdit = faPenToSquare;
  faDelete = faTrashCan;

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private sizesService: SizesService) { }

  onChangeSize(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedSize = parseInt(value);
    this.getSizeById(this.selectedSize);    
  }

  ngOnInit(): void {
    this.getProductsBySize()
    this.sizesService.getSizes().subscribe(sizes => {
      this.selectedSize = sizes[0].id;
      console.log("select getSizes", this.selectedSize);
      this.sizes = sizes
      console.log("sizes", this.sizes);
    })
  }

  getSizeById(sizeId: number){
    this.sizesService.getSizeById(sizeId).subscribe(size => {
      this.selectedSize = size.id;
      
      this.products = size.details.map((detail: any) => {
        return {
          size: { label: size.label }, 
          ...detail, ...detail.product
        }
      })
      
    })
  }

  getProductsBySize() {
    this.productsService.getProducts().subscribe((products) => {
      products.map(product => {
        product.details.map((detail) => {
         this.products?.push({...detail, ...product})
        })
     })
   })
  }
}
