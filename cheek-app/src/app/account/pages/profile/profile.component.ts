import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({ 
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  showPassword: boolean = false;
  userId: number | undefined;
  isUpdated: boolean = false;
  msgSuccess: string = '';

  constructor(private router: Router, private authService : AuthService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    })

    this.authService.getProfile().subscribe(user => {
      this.userId = user.id;
      console.log(this.userId);
      
      this.profileForm.setValue({
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email 
      })
    })
  }

  get f() { return this.profileForm.controls; }

  onSubmit() {
    const formValues = this.profileForm.value;

    this.authService.editProfile(this.userId as number, formValues).subscribe({
      next: (res) => {
        this.msgSuccess = res.message as string;
        this.isUpdated = true;

        setTimeout( () => {
          this.router.navigate(['/']);
        }, 2000 );
      }
    })
  }
      


}
