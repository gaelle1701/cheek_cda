import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface INavItems {title: string; link: string; subNav?: this[]};

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        visibility: 'hidden',
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
})


export class NavComponent implements OnInit {

  constructor() { }
  
  //icons
  faCaretDown = faCaretDown;

  // callback function toggle from header(burger)
  @Input() toggle!: () => void;

  toggleNav() {
    if(window.innerWidth <= 900) {
      this.toggle()
    }
  }  

  navItems: INavItems[] = [
    { title: "Boutique", link:"/boutique", 
      subNav:[
        { title: "T-shirts", link: "boutique/t-shirts" },
        { title: "Sweats", link: "boutique/sweats" },
        { title: "Accessoires", link: "boutique/accessoires" },
        { title: "Autres", link: "boutique/autres" },
      ]
    },
    { title: "A propos", link:"a-propos" },
    { title: "Mon compte", link:"compte" }
  ]

  isOpenSubNav: boolean = false;

  toggleSubNav() {
    this.isOpenSubNav = !this.isOpenSubNav;  
  }

  ngOnInit(): void {
  }

}
