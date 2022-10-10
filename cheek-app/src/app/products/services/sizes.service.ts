import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ISize, ISizes } from 'src/app/core/interfaces/size'

@Injectable({
  providedIn: 'root',
})
export class SizesService {
  sizesUrl = '/api/sizes/';

  constructor(private http: HttpClient) {}

  getSizes(): Observable<ISizes> {
    return this.http.get<ISizes>(this.sizesUrl);
  }

  getSizeById(sizeId: number): Observable<ISize> {
    return this.http.get<ISize>(this.sizesUrl + sizeId);
  }
}
