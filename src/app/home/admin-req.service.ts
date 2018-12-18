import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from './profiles/profiles.component';

@Injectable({
  providedIn: 'root'
})
export class AdminReqService {

  constructor(private httpService: HttpClient) { }

  takeAllUsers (): Observable<Array<UserData>> {
    return this.httpService.get<Array<UserData>>('http://localhost:8080/admin/getUsers');
}

  takeUserBy (option: string, data: string): Observable<Array<UserData>> {
    return this.httpService.get<Array<UserData>>('http://localhost:8080/admin/getUser/' + option + '/' + data);
}

  deleteUser (id: number): Observable<boolean> {
  return this.httpService.delete<boolean>('http://localhost:8080/admin/deleteUser/' + id);
}

  addUser (data: string) {
  return this.httpService.post<any>('http://localhost:8080/admin/addUser/', data);
}

  updateUser (data: string) {
  return this.httpService.put<any>('http://localhost:8080/admin/updateUserData/', data);
}

}
