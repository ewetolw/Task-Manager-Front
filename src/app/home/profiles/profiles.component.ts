import { Component, OnInit } from '@angular/core';
import { AdminReqService } from '../admin-req.service';
import { NgForm } from '@angular/forms';

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

  usersData: Array<UserData>;
  error;
  information;


  constructor(private adminReq: AdminReqService) { }

  ngOnInit() {
  }

  takeAllUsers() {
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
    console.log(formData.value.data, formData.value.option);
    let option =  formData.value.option;
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
    console.log('delete user with id' + id);
    this.adminReq.deleteUser(id).subscribe(

      (result: boolean) => {
        if (result === true) {
          this.usersData = this.usersData.filter(data => data.id !== id);
        }
        }
        );
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
