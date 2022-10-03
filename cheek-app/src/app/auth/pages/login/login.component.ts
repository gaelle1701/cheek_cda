import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ERole } from 'src/app/core/enums/role';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Connexion';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  submitted: boolean = false;
  isLoggedIn: boolean = false;
  isInvalidPwd: boolean = false;
  msgSuccess: string = '';
  msgError: string = '';
  showPassword: boolean = false;

  //icons
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private router: Router, private authService : AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    const formValues = this.loginForm.value;
    
    this.submitted = true;
    this.isInvalidPwd = false;

    this.authService.login(formValues).subscribe({
      next: (res) => {
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken)
          localStorage.setItem('role', res.role)
          
          this.isLoggedIn = true;
          this.msgSuccess = res.message as string;
    
          setTimeout( ()=> {
            if(res.role === ERole.ADMIN){
              this.router.navigate(['dashboard']);
            }
            this.router.navigate(['/']);
          }, 3000 )
        } 
      },
      error: (res)=> {
        this.msgError = res.error.message;
        console.log(this.msgError);
        
        this.isInvalidPwd = true;
      }
    })
  }

}
