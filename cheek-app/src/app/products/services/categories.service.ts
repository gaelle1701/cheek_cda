import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICategories, ICategory } from '../../core/interfaces/category';
import { ICrud } from '../../core/interfaces/crud';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements ICrud<ICategory> {
  baseUrl = 'api/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ICategories> {
    return this.http.get<ICategories>(this.baseUrl);
  }

  getCategoryByName(slug: string): Observable<ICategory> {
    return this.http.get<ICategory>(this.baseUrl, {
      params: {
        slug,
      },
    });
  }

  create(data: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.baseUrl, data);
  }

  delete(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.baseUrl}/${id}`);
  }

  getOne(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<ICategory>): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.baseUrl}/${id}`, data);
  }
}
