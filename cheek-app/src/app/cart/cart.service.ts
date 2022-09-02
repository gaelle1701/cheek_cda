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
    return this.httpService
      .post<any>(this._cartUrl, {
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      })
      .subscribe((c) => {
        console.log(c);
      });
  }

  updateProduct(product: any) {
    return this.httpService.put<Product[]>(`${this._cartUrl}/edit/product`, {});
  }

  resetCart() {
    return this.httpService.get<ICart>(`${this._cartUrl}/reset`);
  }
}
