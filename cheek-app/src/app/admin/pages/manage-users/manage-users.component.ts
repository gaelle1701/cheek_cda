import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { ITableHeader } from '../../components/table/table.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {

  title = 'Liste des clients';
  faArrowLeft = faArrowLeft;

  headers?: ITableHeader[] = [
    { label: 'Nom', key: 'lastName' },
    { label: 'Prénom', key: 'firstName' },
    { label: "Email", key: 'email' },
    { label: 'Téléphone', key: 'phone' },
    { label: 'Addresse', key: 'address' },
  ];
  users: any = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {

      this.userService.getAll().subscribe((users) => {
        this.users = users;

        this.users = users.map((user) => {
        
          return {
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            phone: user.phone,
            address: user.address?.number + ", " + user.address?.street + " " + user.address?.city + " - " + user.address?.zip_code
          }
        });
   
      });

  }


  editUser() {
    this.title = "";
  }

  deleteUser() {
  }
}
