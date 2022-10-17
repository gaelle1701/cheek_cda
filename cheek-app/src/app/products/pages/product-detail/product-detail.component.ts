import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';

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
  selectedSize = 0;
  isDisable = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {}

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.getStockBySize(parseInt(value));
    console.log(value);
    
    this.isDisable = this.stocks.length === 0;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    this.getStockBySize(this.selectedSize);
    console.log(this.selectedSize);
    
    this.productsService
      .getProductByName(routeParams.get('productName') as string)
      .subscribe((product) => {
        this.product = product
        this.detail = product.details;
        this.sizes = product.details.map((detl) => detl.size.label);
        this.slides = product.pictures.map(picture => {
          return {
            label: picture.label,
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
    console.log(this.stocks);
    
  }
}


