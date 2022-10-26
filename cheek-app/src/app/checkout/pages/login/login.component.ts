import { Component, OnInit } from '@angular/core';
import { LoginResponse } from '../../../core/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'checkout-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onConnected(user: LoginResponse) {
    if (user) {
      this.router.navigate(['/checkout/billing']);
    }
  }
}
