import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizesService {
  sizesUrl = '/api/sizes/'

  constructor(private http: HttpClient) { }

  getSizes(): Observable<any> {
    return this.http.get(this.sizesUrl);
  }

  getSizeById(sizeId: number): Observable<any> {
    return this.http.get(this.sizesUrl+sizeId);
  }
}
