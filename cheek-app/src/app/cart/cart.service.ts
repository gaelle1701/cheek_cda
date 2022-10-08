import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/interface/product';
import { CartItem, ICart } from '../shared/interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartUrl = '/api/cart';
  constructor(private httpService: HttpClient) {}

  getCart() {
    return this.httpService.get<{ cart: ICart }>(`${this._cartUrl}`);
  }

  addProduct(product: CartItem) {
    console.log(product);
    return this.httpService
      .post<CartItem>(this._cartUrl, {
        id: product.id,
        stock: product.stock,
        price: product.price,
        size: product.size,
      })
      .subscribe((s) => {
        console.log(s);
      });
  }

  updateProduct(product: any) {
    return this.httpService.put<Product[]>(`${this._cartUrl}/edit/product`, {});
  }

  resetCart() {
    return this.httpService.get<ICart>(`${this._cartUrl}/reset`);
  }
}
