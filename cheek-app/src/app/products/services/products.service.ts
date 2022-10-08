import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct, IProducts } from 'src/app/core/interfaces/product';
import { IProductDetail } from 'src/app/core/interfaces/product-detail';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsUrl = '/api/products'
  detailUrl = '/api/product-details'

  constructor(private http: HttpClient) { }


  getProducts(): Observable<IProducts> {
    return this.http.get<IProducts>(this.productsUrl)
  }

  getProductsBySize(size_id: number): Observable<any> {
    return this.http.get(`${this.productsUrl}?size_id=${size_id}`)
  }
  
  getProductByName(slug: string): Observable<IProduct> {
    return this.http.get<IProduct>(this.productsUrl, {
      params: {
        slug
      }
    });
  }

  getProductDetails(product_id: number): Observable<any> {
    return this.http.get(`${this.detailUrl}/${product_id}`)
  }
}
