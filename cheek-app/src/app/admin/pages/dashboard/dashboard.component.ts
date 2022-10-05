import { Component, OnInit } from '@angular/core';
import { faFileLines, faShirt, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard'

   //icons
   faShirt = faShirt;
   faUsers = faUsers;
   faOrder = faFileLines;
   
  constructor() { }

  ngOnInit(): void {
  }

}
