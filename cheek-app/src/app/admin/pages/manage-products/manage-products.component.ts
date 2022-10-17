import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPenToSquare, faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { ProductsService } from 'src/app/products/services/products/products.service';
import { SizesService } from 'src/app/products/services/sizes/sizes.service';
import { ITableHeader } from '../../components/table/table.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  products: any = [];
  sizes: any = [];
  selectedSize: number = 0;
  msgSuccess: string = "";
  isDeleted: boolean = false;

  /**** ICONS ****/
  faEdit = faPenToSquare;
  faDelete = faTrashCan;
  faAdd = faCirclePlus;

  /**** TABLE ****/
  headers?: ITableHeader[] = [
    { label: 'Catégorie', key: "category" },
    { label: "Slug", key: "slug"},
    { label: 'Nom', key: "name" },
    { label: "", key: "details",
      subHeaders: [
        { label: 'Prix HT', key:"price_ht"},
        { label: 'Prix TTC', key: "price_ttc" },
        { label: 'Taille', key: "size" },
        { label: 'Stock', key: "stock" },
      ]},
    { label: 'Actions', key: "actions", editPath: "/admin/gestion-produits/editer" }
  ]

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private sizesService: SizesService
  ) {}

  onChangeSize(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedSize = parseInt(value);
    // this.getSizeById(this.selectedSize);
  }

  ngOnInit(): void {
    this.getProducts();

    // this.sizesService.getSizes().subscribe(sizes => {
    //   this.selectedSize = sizes[0].id;
    //   this.sizes = sizes
    // })
  }

  // getSizeById(sizeId: number){
  //   this.sizesService.getSizeById(sizeId).subscribe(size => {
  //     this.selectedSize = size.id;
  //     this.products = size.details.map((detail: any) => {

  //       return {
  //         size: { label: size.label },
  //         ...detail, ...detail.product
  //       }
  //     })

  //   })
  // }

  getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      products.map((product) => {
        this.products?.push({  
          ...product, 
          category: product.category.name, 
          details: product.details.map((detail) => {
            return {
              ...detail,
              size: detail.size.label
            }
          })
        });
      });      
    });
  }

  deleteProduct(productId: number){        
    this.productsService.delete(productId).subscribe(
      (product: any) => {
        this.msgSuccess = product.message;
        this.isDeleted = true;
    })
  }
}
