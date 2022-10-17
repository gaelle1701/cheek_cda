import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICrud } from '../../../core/interfaces/crud';
import {
  IProductDetail,
  IProductDetails,
} from '../../../core/interfaces/product-detail';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService implements ICrud<IProductDetail> {
  baseUrl = '/api/products-details';

  constructor(private http: HttpClient) {}

  create(data: IProductDetail): Observable<IProductDetail> {
    return this.http.post<IProductDetail>(this.baseUrl, data);
  }

  delete(id: number): Observable<IProductDetail> {
    return this.http.delete<IProductDetail>(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<IProductDetails> {
    return this.http.get<IProductDetails>(this.baseUrl);
  }

  getOne(id: number): Observable<IProductDetail> {
    return this.http.get<IProductDetail>(`${this.baseUrl}/${id}`);
  }

  update(
    id: number,
    data: Partial<IProductDetail>,
  ): Observable<IProductDetail> {
    return this.http.put<IProductDetail>(`${this.baseUrl}/${id}`, data);
  }
}
