import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/products/services/categories/categories.service';
import { IProducts } from 'src/app/core/interfaces/product';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  title: string | null = '';
  cards: IProducts = [];

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.title = routeParams.get('categoryName');

    this.categoriesService
      .getCategoryByName(this.title as string)
      .subscribe((category) => {
        this.cards = category.products.map((product) => {
          console.log(product);
          
          return product
        });
    });

    console.log(this.cards);
    
  }

  generateUrlPicture(url: string | any[], params: any, position = 50): string {
    if(url) {
      return `${url.slice(0, position)}${params}/${url.slice(position)}`;
    } else {
      return "https://res.cloudinary.com/dfrsqfn9f/image/upload/v1629222577/logo_Cheek_Paris_mtkynb.png";
    }
  }
}
