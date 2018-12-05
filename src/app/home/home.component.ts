import { AuthService } from './../auth/auth.service';
import { AuthenticationGuard } from './../auth/AuthenticationGuard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadHome = true;
  loadFindUser = false;
  loadAddUser = false;
  loadUpadteUser = false;
  loadDeleteUser = false;
  username: string;

  constructor(private authService: AuthService) {
    this.username = this.authService.username;
  }

  ngOnInit() {
  }

  loadHomeComponent() {
    this.cleanComponent();
    this.loadHome = true;
  }

  loadFindUserComponent() {
    this.cleanComponent();
    this.loadFindUser = true;
  }

  loadAddUserComponent() {
    this.cleanComponent();
    this.loadAddUser = true;
  }

  cleanComponent() {
  this.loadHome = false;
  this.loadFindUser = false;
  this.loadAddUser = false;
  this.loadUpadteUser = false;
  this.loadDeleteUser = false;
  }

}
