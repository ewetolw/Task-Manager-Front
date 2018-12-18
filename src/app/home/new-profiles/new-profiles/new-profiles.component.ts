import { AdminReqService } from './../../admin-req.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './models/User';

@Component({
  selector: 'app-new-profiles',
  templateUrl: './new-profiles.component.html',
  styleUrls: ['./new-profiles.component.css']
})
export class NewProfilesComponent implements OnInit {

  roles = [
    { name: 'WORKER', value: 'WORKER' },
    { name: 'MANAGER', value: 'MANAGER'},
    { name: 'ADMIN', value: 'ADMIN'}
    ];

    response: string;
    username='';
    password;
    confirmPassword;

  constructor(private adminReq: AdminReqService) { }

  ngOnInit() {
  }

  addUser(formData: NgForm) {
    console.log(formData.value.username, formData.value.email,
       formData.value.lastname, formData.value.firstname,
        formData.value.password, formData.value.role);
        // tslint:disable-next-line:prefer-const
        let user = new User();
        user.parseForm2User(formData);
        // tslint:disable-next-line:prefer-const
        let data = JSON.stringify(user);
        console.log(data);
        this.adminReq.addUser(data).subscribe(
          (res: Response) => {
            this.response = 'Added User';
          }, error => {
            if (error.status === 400) {
                this.response = 'Change user data';
            } else {
              this.response = 'Internal error';
            }

          }
        );




  }


}

export interface User {
  username: string;
  lastname: string;
  firstname: string;
  password: string;
  role: string;
  email: string;
}


