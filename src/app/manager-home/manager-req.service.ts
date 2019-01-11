import { Problem } from './new-problems/models/Problem';
import { Task } from './new-problems/models/Task';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemData, ResultInfo } from './problems/problems.component';
import { UserData } from '../home/profiles/profiles.component';

@Injectable({
  providedIn: 'root'
})
export class ManagerReqService {

  addres: string = 'localhost';
  port: string = '9045';

  constructor(private  httpService: HttpClient) { }


  takeAllProblems (): Observable<Array<ProblemData>> {
    return this.httpService.get<Array<ProblemData>>('http://'+ this.addres + ':' + this.port+'/manager/problems');
}

takeAllUnassigendProblems (): Observable<Array<ProblemData>> {
  return this.httpService.get<Array<ProblemData>>('http://'+ this.addres + ':' + this.port+'/manager/problem/noManager');
}


takeProblemBy (option: string, data: string): Observable<Array<ProblemData>> {
  return this.httpService.get<Array<ProblemData>>('http://'+ this.addres + ':' + this.port+'/manager/problem/' + option + '/' + data);
}


addProblem (data: string) {
  return this.httpService.post<any>('http://'+ this.addres + ':' + this.port+'/manager/problem/', data);
}

updateProblem (data: string) {
  return this.httpService.put<any>('http://'+ this.addres + ':' + this.port+'/manager/problem/', data);
}


getWorkers (): Observable<Array<UserData>> {
  return this.httpService.get<any>('http://'+ this.addres + ':' + this.port+'/manager/workers/');
}


addTask (problemId: string, workerId: string, task: Task) {
  return this.httpService.post<any>('http://'+ this.addres + ':' + this.port+'/manager/task/' + problemId + '/' + workerId, task);
}

updateTask (workerId: string, task: Task) {
  return this.httpService.put<any>('http://'+ this.addres + ':' + this.port+'/manager/taskContent/' + workerId, task);
}

deleteTask (taskId: string) {
  return this.httpService.delete<any>('http://'+ this.addres + ':' + this.port+'/manager/task/' + taskId);
}

changeProblemStatus (problem: Problem) {
  return this.httpService.post<any>('http://'+ this.addres + ':' + this.port+'/manager/problemStatus/', problem);
}

deleteProblem(problemId: string) {
  return this.httpService.delete<any>('http://'+ this.addres + ':' + this.port+'/manager/problem/' + problemId);
}

takeOverProblem(id: string) {
  return this.httpService.post<any>('http://'+ this.addres + ':' + this.port+'/manager/problemWithoutManager/' + id, {});
}

}
