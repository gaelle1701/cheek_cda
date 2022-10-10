import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../shared/interface/product';
import { CartItem, ICart } from '../shared/interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartUrl = '/api/cart';
  private countSource = new BehaviorSubject<number>(0);
  count = this.countSource.asObservable();

  constructor(private httpService: HttpClient) {}

  countChange(count: number) {
    this.countSource.next(count);
  }

  getCart() {
    return this.httpService.get<{ cart: ICart }>(`${this._cartUrl}`);
  }

  addProduct(product: CartItem) {
    return this.httpService.post<{ cart: ICart }>(this._cartUrl, {
      id: product.id,
      stock: product.stock,
      price: product.price,
      size: product.size,
    });
  }

  updateProduct(product: any) {
    return this.httpService.put<Product[]>(`${this._cartUrl}/edit/product`, {});
  }

  deleteProduct(id: number) {
    return this.httpService.delete<{ cart: ICart }>(
      `${this._cartUrl}/item/${id}`,
    );
  }

  resetCart() {
    return this.httpService.get<ICart>(`${this._cartUrl}/reset`);
  }
}
