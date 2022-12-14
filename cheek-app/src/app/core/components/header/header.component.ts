import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowRightFromBracket,
  faBars,
  faCartShopping,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '100vh',
          opacity: 1,
          backgroundColor: 'white',
          zIndex: 1,
        }),
      ),

      state(
        'closed',
        style({
          height: '0px',
          visibility: 'hidden',
        }),
      ),

      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  //icons
  faUser = faUser;
  faLogout = faArrowRightFromBracket;
  faCart = faCartShopping;
  faBars = faBars;
  isOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggle = () => {
    this.isOpen = !this.isOpen;
  };

  toggleHome = () => {
    this.isOpen = false;
  };

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    await this.router.navigate(['/']);
  }
}
