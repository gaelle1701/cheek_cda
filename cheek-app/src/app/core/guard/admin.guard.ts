import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ERole } from '../enums/role';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  isAdmin = false;

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    return this.authService.getProfile().pipe(
      map((profile) => {
        if (profile.role === ERole.ADMIN) {
          return true;
        } else {
          this.router.navigate(['connexion']);
          return false;
        }
      }),
    );
  }
}
