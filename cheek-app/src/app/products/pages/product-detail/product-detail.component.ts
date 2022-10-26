import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../../cart/cart.service';
import { IProduct } from '../../../core/interfaces/product';
import { IProductDetail } from '../../../core/interfaces/product-detail';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  slides: any = [];
  detail?: IProductDetail[] = [];
  sizes: any = [];
  stocks: number[] = [];
  products = [];
  selectedSize: number = 0;
  selectedStock = 0;
  isDisable: boolean = false;
  product!: IProduct;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
  ) {}

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.getStockBySize(parseInt(value));
    this.isDisable = this.stocks.length === 0;
  }

  onSelectStock(event: Event) {
    this.selectedStock = parseInt(
      (event.target as HTMLSelectElement).value,
      10,
    );
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.getStockBySize(this.selectedSize);
    this.productsService
      .getProductByName(routeParams.get('productName') as string)
      .subscribe((product) => {
        this.product = product;
        this.detail = product.details;
        this.sizes = product.details.map((detail) => {
          return {
            id: detail.size.id,
            label: detail.size.label,
          };
        });
        this.slides = product.pictures.map((picture) => {
          return {
            label: picture.label,
            url: this.generateUrlPicture(picture.url, 'c_scale,w_300'),
          };
        });
      });
  }

  generateUrlPicture(url: string, params: any, position = 50): string {
    const isHttps = /^https?:\/\//;
    if (isHttps.test(url)) {
      position = 50;
      return `${url.slice(0, position)}${params}/${url.slice(position)}`;
    } else {
      return `${url.slice(0, position)}${params}/${url.slice(position)}`;
    }
  }

  getStockBySize(selectedSize: number) {
    const stockBySize = this.detail?.find(
      (detail) => detail.size.id === selectedSize,
    )?.stock;
    this.selectedSize = selectedSize;
    this.stocks = [...Array(stockBySize).keys()].map((i) => i + 1);
  }

  addProductToCart(product: IProduct) {
    this.cartService
      .addProduct({
        productId: product.id,
        stock: this.selectedStock,
        size: this.selectedSize,
        priceHt: product.details[0].price_ht,
      })
      .subscribe(({ msg }) => {
        if (msg === 'ok') {
          this.cartService.getCart().subscribe(({ cart }) => {
            this.cartService.countChange(cart.items.length);
          });
        }
      });
  }
}
