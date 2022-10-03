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
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormGroup({
      number: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      zip_code: new FormControl('')
    })
  });

  showPassword: boolean = false;
  userId: number | undefined;
  isUpdated: boolean = false;
  msgSuccess: string = '';
  msgError: string = '';
  phonePattern: RegExp = new RegExp("^[0-9]*$");
  zipCodePattern: RegExp = new RegExp("^[0-9]*$");

  constructor(private router: Router, private authService : AuthService, private formBuilder: FormBuilder) {}

  keyPress(event: any) {
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !this.phonePattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressZipCode(event: any) {
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !this.zipCodePattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern), Validators.minLength(10), Validators.maxLength(10)]],
        address : this.formBuilder.group({
          number: ['', [Validators.required]],
          street: ['', [Validators.required, Validators.minLength(2)]],
          city: ['', [Validators.required, Validators.minLength(2)]],
          zip_code: ['', [Validators.required, Validators.pattern(this.zipCodePattern), Validators.minLength(5), Validators.maxLength(5)]],
        })
    })

    this.authService.getProfile().subscribe(user => {
      this.userId = user.id;
      console.log(this.userId);
      console.log(user.address);
      
      this.profileForm.setValue({
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        phone: user.phone,
        address: {
          number: user.address.number,
          street: user.address.street,
          city: user.address.city,
          zip_code: user.address.zip_code
        }   
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
      },
      error: (res)=>{        
        this.msgError = res.error.message;

      }
    })
  }
      


}
