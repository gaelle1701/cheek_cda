import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories, ICategory } from 'src/app/core/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categoriesUrl = 'api/categories'

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategories> {
    return this.http.get<ICategories>(this.categoriesUrl)
  }

  getCategoryByName(slug: string): Observable<ICategory> {
    return this.http.get<ICategory>(this.categoriesUrl, {
      params: {
        slug
      }
    });
  }
}
