import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  //let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ LoginFormComponent ],
      providers: [ AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form invalid when empty', () => {
    const form = component.loginForm;
    const emailInput = form.controls['email'];
    const passwordInput = form.controls['password'];

    emailInput.setValue('');
    passwordInput.setValue('');
    expect(form.valid).toBeFalsy()
  })

  it('should form validity', () => {
    const form = component.loginForm;
    const emailInput = form.controls['email'];
    const passwordInput = form.controls['password'];

    emailInput.setValue('johndoe@mail.com');
    passwordInput.setValue('Test123@');    
    expect(form.valid).toBeTruthy();
  })

  it('should input validity', () => {
    const form = component.loginForm;
    const emailInput = form.controls['email'];
    const passwordInput = form.controls['password'];

    expect(emailInput.valid).toBeFalsy();
    expect(passwordInput.valid).toBeFalsy();

    emailInput.setValue('johndoe@mail.com');
    expect(emailInput.valid).toBeTruthy();

    passwordInput.setValue('Test123@');
    expect(passwordInput.valid).toBeTruthy();
  })

  it('should input errors', () => {
    const form = component.loginForm;
    const emailInput = form.controls['email'];
    const passwordInput = form.controls['password'];

    expect(emailInput?.errors?.['required']).toBeTruthy();
    expect(passwordInput?.errors?.['required']).toBeTruthy();

    emailInput.setValue('johndoe@mail.com');
    expect(emailInput.errors).toBeNull();

    emailInput.setValue('johndoe');
    expect(emailInput?.errors?.['email']).toBeTruthy();

    passwordInput.setValue('Test123@');
    expect(passwordInput.errors).toBeNull();
  });

});
