import { Component, OnInit } from '@angular/core';
import { SignupResponse } from '../../../core/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRegistered(register: SignupResponse) {
    if (register.message) {
      this.router.navigate(['/checkout/login']);
    }
  }
}
