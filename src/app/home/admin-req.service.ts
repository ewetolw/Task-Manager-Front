import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from './profiles/profiles.component';

@Injectable({
  providedIn: 'root'
})
export class AdminReqService {

 addres: string = 'localhost';
  port: string = '9045';
  constructor(private httpService: HttpClient) { }

  takeAllUsers (): Observable<Array<UserData>> {
    return this.httpService.get<Array<UserData>>('http://'+ this.addres + ':' + this.port+'/admin/users');
}

  takeUserBy (option: string, data: string): Observable<Array<UserData>> {
    return this.httpService.get<Array<UserData>>('http://'+ this.addres + ':' + this.port+'/admin/users/' + option + '/' + data);
}

  deleteUser (id: number): Observable<boolean> {
  return this.httpService.delete<boolean>('http://'+ this.addres + ':' + this.port+'/admin/user/' + id);
}

  addUser (data: string) {
  return this.httpService.post<any>('http://'+ this.addres + ':' + this.port+'/admin/user/', data);
}

  updateUser (data: string) {
  return this.httpService.put<any>('http://'+ this.addres + ':' + this.port+'/admin/user/', data);
}

}
