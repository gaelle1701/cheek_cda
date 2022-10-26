import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';
import { ERole } from '../../../core/enums/role';
import { LoginResponse } from '../../../core/interfaces/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Input() showRegisterLink = false;

  @Output() onConnected: EventEmitter<LoginResponse> =
    new EventEmitter<LoginResponse>();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitted: boolean = false;
  isLoggedIn: boolean = false;
  isInvalidPwd: boolean = false;
  msgSuccess: string = '';
  msgError: string = '';
  showPassword: boolean = false;

  //icons
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const formValues = this.loginForm.value;

    this.submitted = true;
    this.isInvalidPwd = false;

    this.authService.login(formValues).subscribe({
      next: (res) => {
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);

          this.isLoggedIn = true;
          this.msgSuccess = res.message as string;
          this.onConnected.emit(res);
        }
      },
      error: (res) => {
        this.msgError = res.error.message;
        this.isInvalidPwd = true;
      },
    });
  }
}
