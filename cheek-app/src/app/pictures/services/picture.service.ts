import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICrud } from '../../core/interfaces/crud';
import { IPicture, IPictures } from '../../core/interfaces/picture';

@Injectable({
  providedIn: 'root',
})

export class PictureService implements ICrud<IPicture> {
  baseUrl = '/api/pictures';

  constructor(private http: HttpClient) {}

  create(data: IPicture): Observable<IPicture> {
    return this.http.post<IPicture>(this.baseUrl, data, {
      headers: {
        Accept: 'application/json',
        //"Content-Type": "multipart/form-data"
      }
    });
  }

  delete(id: number): Observable<IPicture> {
    return this.http.delete<IPicture>(`${this.baseUrl}/${id}`);
  }

  findAll(): Observable<IPictures> {
    return this.http.get<IPictures>(this.baseUrl);
  }

  findOne(id: number): Observable<IPicture> {
    return this.http.get<IPicture>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<IPicture>): Observable<IPicture> {
    return this.http.put<IPicture>(`${this.baseUrl}/${id}`, data);
  }
}
