import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title = 'Inscription';

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  isRegistered: boolean = false;
  isExisting: boolean = false;
  msgSuccess: string = '';
  msgError: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private authService : AuthService, private formBuilder: FormBuilder) { 
    // this.signupForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({ 
      firstName: ['', Validators.required, Validators.minLength(2)],
      lastName: ['', Validators.required, Validators.minLength(2)],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.pattern(this.pswPattern)]
    })
  }

  // regex pattern
  // - at least 1 uppercase letter
  // - at least 1 lowercase letter
  // - at least 1 digit
  // - at lesat 1 special character
  // - at min 8
  pswPattern: RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  get f() { return this.signupForm.controls; }


  onSubmit() {
    const formValues = this.signupForm.value;

    this.isExisting = false;

    this.authService.signup(formValues).subscribe(
      (res:any) => {
        this.msgSuccess = res.message;
        this.isRegistered = true;

        setTimeout( ()=> {
          this.router.navigate(['/']);
        }, 3000 );
      },
      (error)=>{
        this.msgError = error.message;
        this.isExisting = true;
        
      }
    )
  }


}
