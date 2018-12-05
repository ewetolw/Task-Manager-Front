import { AuthenticationGuard } from './../AuthenticationGuard';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error;



  constructor(private authService: AuthService,
    private router: Router,
    private authGuard: AuthenticationGuard) {}

  ngOnInit() {
  }

  login(formData: NgForm) {

    this.authService.login(formData.value.username, formData.value.password).subscribe(
    (
      (response: AuthData) => {
        if (response['authorities']) {
          let role = response.authorities[0].authority.toString();
          console.log(response);
          this.authService.setUsername(formData.value.username);
          sessionStorage.setItem('role', role);
            if (role === 'ADMIN') {
              this.router.navigateByUrl('/admin');
            } else if (role === 'MANAGER') {
              this.router.navigateByUrl('/manager');
            } else if (role === 'WORKER') {
              this.router.navigateByUrl('/worker');
            }
        }
       }),
      error => {
      if (error.status === 401) { // error path
      this.error = 'Bad Credentials';
      } else {
      this.error = 'Internal error';
            }
      });


    console.log(formData.value.password, formData.value.username);
  }


  logout() {

  }

}

export interface AuthData {
  authorities: {
    [index: number]: Authority
  };
}

export interface Authority {
  authority: string;
}


