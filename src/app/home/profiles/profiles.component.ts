import { UserData } from 'src/app/home/profiles/profiles.component';
import { Component, OnInit } from '@angular/core';
import { AdminReqService } from '../admin-req.service';
import { NgForm } from '@angular/forms';
import { User } from '../new-profiles/new-profiles/models/User';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  options = [
    { name: 'id', value: 'id' },
    { name: 'username', value: 'username' },
    { name: 'email', value: 'email' },
    { name: 'lastname', value: 'lastname' },
    { name: 'role', value: 'role' },

  ];

  roles = [
    { name: 'WORKER', value: 'WORKER' },
    { name: 'MANAGER', value: 'MANAGER'},
    { name: 'ADMIN', value: 'ADMIN'}
    ];

  usersData: Array<UserData>;
  error;
  information;
  response;
  checkedUser: UserData;

  constructor(private adminReq: AdminReqService) { }

  ngOnInit() {
  }

  clear() {
    this.error = '';
    this.information = '';
  }

  takeAllUsers() {
    this.clear();
    console.log('take all users');
    this.adminReq.takeAllUsers().subscribe(
      (response: Array<UserData>) => {
        console.log(response);
        this.usersData = response;
       }, error => {
          if (error.status === 401) {
            this.error = 'No Permission';
          } else {
            this.error = 'Internal Error';
          }

       }
    ); }

    takeUserBy(formData: NgForm) {
    this.clear();
    console.log(formData.value.data, formData.value.option);

    // tslint:disable-next-line:prefer-const
    let option =  formData.value.option;
    // tslint:disable-next-line:prefer-const
    let data = formData.value.data;
     console.log('take user by ' + option + ' data: ' + data);
     if (option && data) {
          this.adminReq.takeUserBy(option, data).subscribe(
            (response: Array<UserData>) => {
              console.log('response ' + response);
              this.usersData = response;
              this.error = null;
              if (response.length === 0) {
                this.information = 'No result';
              } else {
                this.information = null;
              }
            }, error => {
                if (error.status === 401) {
                  this.error = 'No Permission';
                } else {
                  this.error = 'Internal Error';
                }
                this.information = null;
            }
          );
      } else {this.information = 'Input data and choose search option'; }
    }


  deleteUser(id: number) {
    this.adminReq.deleteUser(id).subscribe(

      (result: boolean) => {
        if (result === true) {
          this.usersData = this.usersData.filter(data => data.id !== id);
        }
        }
        );
    }



    updateUser(formData: NgForm) {
          // tslint:disable-next-line:prefer-const
          let user = new User();
          user.parseForm2User(formData);
          user.id = this.checkedUser.id;
          user.role=this.checkedUser.role;
          // tslint:disable-next-line:prefer-const
          let data = JSON.stringify(user);
          console.log(data);
          this.adminReq.updateUser(data).subscribe(
            (res: Response) => {
              this.response = 'Updated user';
              let i = this.usersData.findIndex(d => d.id === this.checkedUser.id);
              this.usersData[i] = user;
            }, error => {
              if (error.status === 400) {
                  this.response = 'Change user data';
              } else {
                this.response = 'Internal error';
              }

            }
          );
    }

    seeUser(checkedUser: UserData) {
      this.response='';
      this.checkedUser = JSON.parse(JSON.stringify(checkedUser));
    }

  }

export interface UserData {
  id: number;
  username: string;
  email: string;
  lastName: string;
  firstName: string;
  activated: boolean;
  role: string;
}
