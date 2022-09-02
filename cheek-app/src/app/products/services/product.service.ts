import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _productUrl = '/api/products';

  constructor(private httpService: HttpClient) {}

  getProducts() {
    return this.httpService.get<Product[]>(`${this._productUrl}`);
  }
}
