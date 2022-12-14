import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import {
  IUser,
  LoginResponse,
  ProfileResponse,
  SignupResponse,
} from 'src/app/core/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signupUrl = '/api/auth/signup';
  loginUrl = '/api/auth/login';
  profileUrl = '/api/auth/profile';
  editProfileUrl = '/api/auth/edit-profile';
  confirmUrl = 'api/mailer/confirm';

  constructor(private http: HttpClient) {}

  signup({
    lastName,
    firstName,
    email,
    password,
  }: {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
  }): Observable<SignupResponse> {
    return this.http.post<IUser>(this.signupUrl, {
      lastName,
      firstName,
      email,
      password,
    });
  }

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http.post<IUser>(this.loginUrl, {
      email,
      password,
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null ? true : false;
  }

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>(this.profileUrl);
  }

  editProfile(
    user_id: number,
    {
      firstName,
      lastName,
      email,
      phone,
      address,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: any;
    },
  ): Observable<ProfileResponse> {
    return this.http.put<IUser>(`${this.editProfileUrl}/${user_id}`, {
      firstName,
      lastName,
      email,
      phone,
      address,
    });
  }

  getUniqueString(uniqueString: string) {
    return this.http.get(`${this.confirmUrl}/${uniqueString}`);
  }
}
