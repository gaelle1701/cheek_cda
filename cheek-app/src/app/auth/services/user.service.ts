import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUsers } from 'src/app/core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = '/api/user'
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUsers> {
    return this.http.get<IUsers>(this.userUrl)
  }

  deleteUser(user_id: number): Observable<IUsers> {
    return this.http.delete<IUsers>(`${this.userUrl}/${user_id}`)
  }
}
