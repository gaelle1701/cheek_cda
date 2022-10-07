import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { ICategories, ICategory } from 'src/app/core/interfaces/category';
import { IProducts } from 'src/app/core/interfaces/product';

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
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.title = routeParams.get('categoryName');

    this.categoriesService
      .getCategoryByName(this.title as string)
      .subscribe((category) => {
        this.cards = category.products.map((product) => {
          return { ...product };
        });
      });
  }
}
