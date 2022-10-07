import { Injectable } from '@angular/core';
import { ICrud } from '../../core/interfaces/crud';
import { IInvoice, Invoices } from '../../core/interfaces/invoice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService implements ICrud<IInvoice> {
  baseUrl = '/api/invoices';
  constructor(private http: HttpClient) {}

  create(data: IInvoice): Observable<IInvoice> {
    return this.http.post<IInvoice>(this.baseUrl, data);
  }

  delete(id: number): Observable<IInvoice> {
    return this.http.delete<IInvoice>(`${this.baseUrl}/${id}`);
  }

  findAll(): Observable<Invoices> {
    return this.http.get<Invoices>(this.baseUrl);
  }

  findOne(id: number): Observable<IInvoice> {
    return this.http.get<IInvoice>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<IInvoice>): Observable<IInvoice> {
    return this.http.put<IInvoice>(`${this.baseUrl}/${id}`, data);
  }
}
