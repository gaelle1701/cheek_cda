import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISize, Sizes } from '../../core/interfaces/size';
import { ICrud } from '../../core/interfaces/crud';

@Injectable({
  providedIn: 'root',
})
export class SizesService implements ICrud<ISize> {
  baseUrl = '/api/sizes';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Sizes> {
    return this.http.get<Sizes>(this.baseUrl);
  }

  findOne(id: number): Observable<ISize> {
    return this.http.get<ISize>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<ISize>): Observable<ISize> {
    return this.http.put<ISize>(`${this.baseUrl}/${id}`, data);
  }

  create(data: ISize): Observable<ISize> {
    return this.http.post<ISize>(this.baseUrl, data);
  }

  delete(id: number): Observable<ISize> {
    return this.http.delete<ISize>(`${this.baseUrl}/${id}`);
  }
}
