import { Component, OnInit } from '@angular/core';
import { SignupResponse } from '../../../core/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  title = 'Inscription';

  constructor(private router: Router) {}

  ngOnInit() {}

  onRegistered(u: SignupResponse) {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
