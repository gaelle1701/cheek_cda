import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { CartItem, CartResponse, ICart } from '../../core/interfaces/cart';
import { INITIAL_CART } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartUrl = '/api/cart';
  private countSource = new BehaviorSubject<ICart>(INITIAL_CART);
  cart$: Observable<ICart> = this.countSource.asObservable();

  constructor(private httpService: HttpClient) {}

  countChange(cart: ICart) {
    this.countSource.next(cart);
  }

  getCart() {
    return this.httpService.get<CartResponse>(`${this._cartUrl}`);
  }

  addProduct(product: CartItem) {
    return this.httpService.post<{ msg: string }>(this._cartUrl, {
      productId: product.productId,
      stock: product.stock,
      priceHt: product.priceHt,
      size: product.size,
    });
  }

  updateProduct(product: any) {
    return this.httpService.put<{ msg: string }>(
      `${this._cartUrl}/edit/product`,
      {},
    );
  }

  deleteProduct(productId: number, sizeId: number) {
    return this.httpService.delete<{ msg: string }>(
      `${this._cartUrl}/item/${productId}`,
      {
        body: {
          sizeId,
        },
      },
    );
  }

  resetCart() {
    return this.httpService.get<{ msg: string }>(`${this._cartUrl}/reset`);
  }
}
