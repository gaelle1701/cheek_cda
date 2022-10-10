import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateResponse, IProduct, IProducts, UpdateResponse } from 'src/app/core/interfaces/product';
import { ICrud } from '../../core/interfaces/crud';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements ICrud<IProduct> {
  baseUrl = '/api/products';
  detailUrl = '/api/product-details';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProducts> {
    return this.http.get<IProducts>(this.baseUrl);
  }

  getProductsBySize(size_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?size_id=${size_id}`);
  }

  getProductByName(slug: string): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseUrl, {
      params: {
        slug,
      },
    });
  }

  getProductDetails(product_id: number): Observable<any> {
    return this.http.get(`${this.detailUrl}/${product_id}`);
  }

  create(data: IProduct): Observable<CreateResponse> {
    return this.http.post<IProduct>(this.baseUrl, data);
  }

  delete(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.baseUrl}/${id}`);
  }

  findAll(query: {slug: string}): Observable<IProducts> {
    return this.http.get<IProducts>(this.baseUrl, {
      params: query
    });
  }

  findOne(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<IProduct>): Observable<UpdateResponse> {
    return this.http.put<IProduct>(`${this.baseUrl}/${id}`, data);
  }
}
