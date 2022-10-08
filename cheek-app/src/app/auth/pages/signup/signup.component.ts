import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  title = 'Inscription';

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  isRegistered: boolean = false;
  isExisting: boolean = false;
  msgSuccess: string = '';
  msgError: string = '';
  showPassword: boolean = false;

  // regex pattern
  // - at least 1 uppercase letter
  // - at least 1 lowercase letter
  // - at least 1 digit
  // - at least 1 special character
  // - at min 8
  pswPattern: RegExp = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  );

  //icons
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.pswPattern)],
      ],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    const formValues = this.signupForm.value;

    this.isExisting = false;

    this.authService.signup(formValues).subscribe({
      next: (res) => {
        this.isRegistered = true;
        this.msgSuccess = res.message as string;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (res) => {
        console.log(res);

        this.msgError = res.error.message;
        this.isExisting = true;
      },
    });
  }
}
