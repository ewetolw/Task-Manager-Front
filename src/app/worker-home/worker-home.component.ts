import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-worker-home',
  templateUrl: './worker-home.component.html',
  styleUrls: ['./worker-home.component.css']
})
export class WorkerHomeComponent implements OnInit {
  loadHome = true;
  username;
  constructor(private authService: AuthService,
    private router: Router) {
      this.username = this.authService.username;
     }

  ngOnInit() {
  }


  logout() {
    this.authService.token = '';
    this.authService.username = '';
    this.router.navigateByUrl('/login');
  }

  cleanComponent() {
    this.loadHome = false;

    }

    loadHomeComponent() {
      this.cleanComponent();
      this.loadHome = true;
    }

}
