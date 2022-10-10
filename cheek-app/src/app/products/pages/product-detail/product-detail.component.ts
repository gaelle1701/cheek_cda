import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  slides: any = [];
  detail?: { stock: number }[] = [];
  sizes: string[] = [];
  stocks: number[] = [];
  products = [];
  product: any;
  selectedSize: number = 0;
  isDisable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {}

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.getStockBySize(parseInt(value));
    this.isDisable = this.stocks.length === 0;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    this.productsService
      .getProductByName(routeParams.get('productName') as string)
      .subscribe((product) => {
        console.log("product", product);
        this.product = product
        this.detail = product.details;
        this.sizes = product.details.map((detl: any) => detl.size.label);
        this.getStockBySize(this.selectedSize);

        this.slides = product.pictures.map(picture => {
          return {
            ...picture,
            url: this.generateUrlPicture(picture.url, 'c_scale,w_300')
          }
        });
    });
  }

  generateUrlPicture(url: string, params: any, position = 50): string {
    const isHttps = /^https?:\/\//;
    if(isHttps.test(url)) {
      position = 50;

      return `${url.slice(0, position)}${params}/${url.slice(position)}`;
    } else {
      return `${url.slice(0, position)}${params}/${url.slice(position)}`;
    }
  }

  
  getStockBySize(selectedSize: number) {
    const stockBySize = this.detail?.find(
      (_: any, idx: any) => idx === selectedSize,
    )?.stock;
    this.selectedSize = selectedSize;
    this.stocks = [...Array(stockBySize).keys()].map((i) => i + 1);
  }
}


