import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  username: string;

  loadHome = true;
  loadFindProblem = false;
  loadAddProblem = false;
  loadFindTask = false;
  loadAddTask = false;
  loadUnasignedProblem = false;
  loadUnasignedTask = false;





  constructor(private authService: AuthService,
    private router: Router) {
      this.username = this.authService.username;
     }

  ngOnInit() {
  }

  loadHomeComponent() {
    this.cleanComponent();
    this.loadHome = true;
  }

  loadFindProblemComponent() {
    this.cleanComponent();
    this.loadFindProblem = true;
  }

  loadAddProblemComponent() {
    this.cleanComponent();
    this.loadAddProblem = true;
  }


  logout() {
    this.authService.token = '';
    this.authService.username = '';
    this.router.navigateByUrl('/login');
  }


  cleanComponent() {
    this.loadHome = false;
    this.loadFindProblem = false;
    this.loadAddProblem = false;
    this.loadFindTask = false;
    this.loadAddTask = false;
    this.loadUnasignedProblem = false;
    this.loadUnasignedTask = false;
    }
}
