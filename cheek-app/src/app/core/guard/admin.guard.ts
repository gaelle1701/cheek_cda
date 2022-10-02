import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.checkLogin(route, state.url)
  }
 
  checkLogin(route: ActivatedRouteSnapshot, url: any) {
    const role: null | string = this.authService.getRole();

    if (route.data['role'] && route.data['role'].indexOf(role) === -1) {
      this.router.navigate(['/'])
      return false;
    }
    
    return true
  }
  
}
