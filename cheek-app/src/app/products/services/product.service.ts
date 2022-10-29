import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct, IProducts } from '../../core/interfaces/product';
import { ICrud } from '../../core/interfaces/crud';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements ICrud<IProduct> {
  private _productUrl = '/api/products';

  constructor(private httpService: HttpClient) {}

  baseUrl: string = '/api/products';

  create(data: IProduct): Observable<IProduct> {
    return this.httpService.post<IProduct>(this.baseUrl, data);
  }

  delete(id: number): Observable<IProduct> {
    return this.httpService.delete<IProduct>(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<IProducts> {
    return this.httpService.get<IProducts>(`${this._productUrl}`);
  }

  getOne(id: number): Observable<IProduct> {
    return this.httpService.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<IProduct>): Observable<IProduct> {
    return this.httpService.put<IProduct>(`${this.baseUrl}/${id}`, data);
  }
}
