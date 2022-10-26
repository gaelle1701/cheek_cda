import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ICrud } from '../../core/interfaces/crud';
import { IOrder, Orders } from '../../core/interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements ICrud<IOrder> {
  baseUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  create(data: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.baseUrl, data);
  }

  delete(id: number): Observable<IOrder> {
    return this.http.delete<IOrder>(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<Orders> {
    return this.http.get<Orders>(this.baseUrl);
  }

  getOne(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<IOrder>): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.baseUrl}/${id}`, data);
  }
}
