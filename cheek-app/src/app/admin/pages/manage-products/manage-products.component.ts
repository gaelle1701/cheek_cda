import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPenToSquare, faTrashCan, faCirclePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ProductsService } from 'src/app/products/services/products/products.service';
import { SizesService } from 'src/app/products/services/sizes/sizes.service';
import { ITableHeader } from '../../components/table/table.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {

  title = "Liste des produits"
  products: any = [];
  sizes: any = [];
  size!: number;
  selectedSize: number = 0;
  msgSuccess: string = "";
  isDeleted: boolean = false;

  /**** ICONS ****/
  faEdit = faPenToSquare;
  faDelete = faTrashCan;
  faAdd = faCirclePlus;
  faArrowLeft = faArrowLeft;

  /**** TABLE ****/
  headers?: ITableHeader[] = [
    { label: 'Catégorie', key: "category" },
    { label: "Slug", key: "slug" },
    { label: 'Nom', key: "name" },
    { label: "", key: "details",
      subHeaders: [
        { label: 'Prix HT', key:"price_ht" },
        { label: 'Prix TTC', key: "price_ttc" },
        { label: 'Taille', key: "size" },
        { label: 'Stock', key: "stock" },
      ]
    },
    { label: 'Actions', key: "actions" }
  ]

  constructor(
    private router: Router,
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
    console.log(this.products);
    

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

  editProduct(productId: number) {
    this.router.navigate([`admin/gestion-produits/editer/${productId}`])
  }

  deleteProduct(productId: number){        
    this.productsService.delete(productId).subscribe(
      (product: any) => {
        this.msgSuccess = product.message;
        this.isDeleted = true;
    })
  }
}
