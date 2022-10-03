import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFileLines, faIdCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  title = 'Mon compte'

  //icons
  faProfile = faIdCard;
  faOrder = faFileLines;

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

}
