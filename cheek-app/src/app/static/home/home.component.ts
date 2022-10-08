import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/core/interfaces/product';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: IProducts = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {  
    this.productsService.getProducts().subscribe(products => {
      this.cards = products.map(product => { 
        return { ...product }
      })
    })
  }

}
