import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUsers } from 'src/app/core/interfaces/user';
import { ICrud } from '../../core/interfaces/crud';

@Injectable({
  providedIn: 'root',
})
export class UserService implements ICrud<IUser> {
  baseUrl = '/api/user';
  constructor(private http: HttpClient) {}

  create(data: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, data);
  }

  delete(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.baseUrl}/${id}`);
  }

  findAll(): Observable<IUsers> {
    return this.http.get<IUsers>(this.baseUrl);
  }

  findOne(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/${id}`, data);
  }
}
