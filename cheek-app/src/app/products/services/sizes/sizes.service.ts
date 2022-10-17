import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICrud } from 'src/app/core/interfaces/crud';

import { CreateResponse, ISize, ISizes, UpdateResponse } from 'src/app/core/interfaces/size'

@Injectable({
  providedIn: 'root',
})

export class SizesService implements ICrud<ISize> {
  baseUrl = '/api/sizes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ISizes> {
    return this.http.get<ISizes>(this.baseUrl);
  }

  getOne(id: number): Observable<ISize> {
    return this.http.get<ISize>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<ISize>): Observable<UpdateResponse> {
    return this.http.put<ISize>(`${this.baseUrl}/${id}`, data);
  }

  create(data: ISize): Observable<CreateResponse> {
    return this.http.post<ISize>(this.baseUrl, data);
  }

  delete(id: number): Observable<ISize> {
    return this.http.delete<ISize>(`${this.baseUrl}/${id}`);
  }
}