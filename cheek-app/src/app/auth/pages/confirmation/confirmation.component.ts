import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  uniqueStringParams: null | string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.uniqueStringParams = this.route.snapshot.paramMap.get('uniqueString');
    this.getUniqueString();
  }

  getUniqueString() {
    this.authService
      .getUniqueString(this.uniqueStringParams as string)
      .subscribe((accountStatus) => {
        console.log(accountStatus);
      });
  }
}
