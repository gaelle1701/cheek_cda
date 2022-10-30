import { Component, OnInit } from '@angular/core';
import { LoginResponse } from '../../../core/interfaces/user';
import { Router } from '@angular/router';
import { ERole } from '../../../core/enums/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'Connexion';
  showRegisterLink = true;

  constructor(private router: Router) {}

  ngOnInit() {}

  onConnected(user: LoginResponse) {
    setTimeout(() => {
      if (user.role === ERole.ADMIN) {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['/']);
      }
    }, 3000);
  }
}
