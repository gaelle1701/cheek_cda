import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  loginUrl = '/api/auth/login';

  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // handle interceptor only on other routes than /login
    if (req.url !== this.loginUrl) {
      // This retrieves a token from local storage
      const token: null | string = localStorage.getItem('token');
      // This clones HttpRequest and Authorization header with Bearer token added
      if (token) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token),
        });
      }
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
    );
  }
}
