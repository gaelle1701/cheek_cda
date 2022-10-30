import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ICrud } from '../../core/interfaces/crud';
import { IOrderLine, OrderLines } from '../../core/interfaces/order-line';

@Injectable({
  providedIn: 'root',
})
export class OrderLineService implements ICrud<IOrderLine> {
  baseUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  create(data: IOrderLine): Observable<IOrderLine> {
    return this.http.post<IOrderLine>(this.baseUrl, data);
  }

  delete(id: number): Observable<IOrderLine> {
    return this.http.delete<IOrderLine>(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<OrderLines> {
    return this.http.get<OrderLines>(this.baseUrl);
  }

  getOne(id: number): Observable<IOrderLine> {
    return this.http.get<IOrderLine>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<IOrderLine>): Observable<IOrderLine> {
    return this.http.put<IOrderLine>(`${this.baseUrl}/${id}`, data);
  }
}
