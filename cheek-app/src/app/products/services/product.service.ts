import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../shared/interface/product';
import { ICrud } from '../../core/interfaces/crud';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements ICrud<Product> {
  private _productUrl = '/api/products';

  constructor(private httpService: HttpClient) {}

  baseUrl: string = '/api/products';

  create(data: Product): Observable<Product> {
    return this.httpService.post<Product>(this.baseUrl, data);
  }

  delete(id: number): Observable<Product> {
    return this.httpService.delete<Product>(`${this.baseUrl}/${id}`);
  }

  findAll(): Observable<Product[]> {
    return this.httpService.get<Product[]>(`${this._productUrl}`);
  }

  findOne(id: number): Observable<Product> {
    return this.httpService.get<Product>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<Product>): Observable<Product> {
    return this.httpService.put<Product>(`${this.baseUrl}/${id}`, data);
  }
}
