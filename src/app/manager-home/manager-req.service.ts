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

  constructor(private  httpService: HttpClient) { }


  takeAllProblems (): Observable<Array<ProblemData>> {
    return this.httpService.get<Array<ProblemData>>('http://localhost:9000/manager/getProblems');
}


takeProblemBy (option: string, data: string): Observable<Array<ProblemData>> {
  return this.httpService.get<Array<ProblemData>>('http://localhost:9000/manager/getProblem/' + option + '/' + data);
}


addProblem (data: string) {
  return this.httpService.post<any>('http://localhost:9000/manager/addProblem/', data);
}

updateProblem (data: string) {
  return this.httpService.put<any>('http://localhost:9000/manager/updateProblem/', data);
}


getWorkers (): Observable<Array<UserData>> {
  return this.httpService.get<any>('http://localhost:9000/manager/getWorkers/');
}


addTask (problemId: string, workerId: string, task: Task) {
  return this.httpService.post<any>('http://localhost:9000/manager/addTask/' + problemId + '/' + workerId, task);
}

updateTask (workerId: string, task: Task) {
  return this.httpService.put<any>('http://localhost:9000/manager/updateTaskContent/'+ workerId, task);
}

deleteTask (taskId: string) {
  return this.httpService.delete<any>('http://localhost:9000/manager/deleteTask/' + taskId);
}

changeProblemStatus (problem: Problem) {
  return this.httpService.post<any>('http://localhost:9000/manager/changeStatus/', problem);
}

deleteProblem(problemId: string) {
  return this.httpService.delete<any>('http://localhost:9000/manager/deleteProblem/' + problemId);
}


}
