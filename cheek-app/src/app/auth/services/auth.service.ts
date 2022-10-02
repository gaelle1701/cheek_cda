import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { IUser, LoginResponse, SignupResponse } from 'src/app/core/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signupUrl = '/api/auth/signup'
  loginUrl = '/api/auth/login'
  profileUrl = '/api/auth/profile'
  editProfileUrl = '/api/auth/edit-profile'
  confirmUrl = 'api/mailer/confirm'

  roleAs: string | null = '';
 
  constructor(private http: HttpClient) {}

  signup({ lastName, firstName, email, password }: { roleAs: string, lastName: string, firstName: string, email: string, password: string }): Observable<SignupResponse> {
    return this.http.post<IUser>(this.signupUrl, {
      lastName,
      firstName,
      email,
      password
    })
  }

  login({ email, password }: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<IUser>(this.loginUrl, {
      email,
      password
    });
  }

  getProfile(user_id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.profileUrl}/${user_id}`)
  }

  editProfile(user_id: number, { firstName, lastName, email, phone, address }: 
    { firstName: string, lastName: string, email: string, phone: string, address: any }): Observable<IUser> {
      return this.http.put<IUser>(`${this.editProfileUrl}/${user_id}`, {
        firstName,
        lastName,
        email,
        phone,
        address
      })
  }

  getRole() {
    this.roleAs = localStorage.getItem('role');
    return this.roleAs;
 }

  getUniqueString(uniqueString: string) {
    return this.http.get(`${this.confirmUrl}/${uniqueString}`)
  }
}
