import { AuthenticationGuard } from './AuthenticationGuard';
import { Observable } from 'rxjs';
import { AuthData } from './login/login.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpClient) { }
  role: string;
  token: string;
  username: string;

  addres: string = 'localhost';
  port1: string = '9045';


  login (username: string, password: string): Observable<AuthData> {
    this.token = 'Basic ' + btoa(username + ':' + password);
    // const headers = new HttpHeaders({
    //   authorization : 'Basic ' + btoa(username + ':' + password)
    // });

    return this.httpService.get<AuthData>('http://'+ this.addres + ':' + this.port1+'/log1/user');
}


loginReserve (username: string, password: string): Observable<AuthData> {
  this.token = 'Basic ' + btoa(username + ':' + password);
  // const headers = new HttpHeaders({
  //   authorization : 'Basic ' + btoa(username + ':' + password)
  // });

  return this.httpService.get<AuthData>('http://'+ this.addres + ':' + this.port1+'/log2/user');
}



  getToken() {
    return this.token;
  }

  setUsername(username: string) {
    this.username = username;
  }

  logout() {

  }


}
