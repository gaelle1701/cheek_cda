import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICrud } from '../../core/interfaces/crud';
import { IAddress, IAddresses } from '../../core/interfaces/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService implements ICrud<IAddress> {
  baseUrl = '/api/address';
  constructor(private http: HttpClient) {}

  create(data: IAddress): Observable<IAddress> {
    return this.http.post<IAddress>(this.baseUrl, data);
  }

  delete(id: number): Observable<IAddress> {
    return this.http.delete<IAddress>(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<IAddresses> {
    return this.http.get<IAddresses>(this.baseUrl);
  }

  getOne(id: number): Observable<IAddress> {
    return this.http.get<IAddress>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<IAddress>): Observable<IAddress> {
    return this.http.put<IAddress>(`${this.baseUrl}/${id}`, data);
  }
}
