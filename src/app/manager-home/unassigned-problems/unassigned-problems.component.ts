import { ManagerReqService } from './../manager-req.service';
import { Component, OnInit } from '@angular/core';
import { ProblemData } from '../problems/problems.component';
import { TaskData } from '@angular/core/src/testability/testability';
import { UserData } from 'src/app/home/profiles/profiles.component';

@Component({
  selector: 'app-unassigned-problems',
  templateUrl: './unassigned-problems.component.html',
  styleUrls: ['./unassigned-problems.component.css']
})
export class UnassignedProblemsComponent implements OnInit {

  constructor(private managerReq: ManagerReqService) { }

  error;
  information;
  checkedProblem: ProblemData;
  checkedTask: TaskData;

  options = [
    { name: 'id', value: 'id' },
    { name: 'client', value: 'client' },
    { name: 'open date', value: 'open date' },
    { name: 'status', value: 'status' }
  ];

  problemsData: Array<ProblemData>;
  workers: UserData[];
  response: string;


  ngOnInit() {
  }

  clear() {
    this.error = '';
    this.information = '';
  }

  takeAllUnassignedProblems() {
    this.clear();
    console.log('take all problems');
    this.managerReq.takeAllUnassigendProblems().subscribe(
      (response: Array<ProblemData>) => {
        if (response.length === 0) {
          this.error = 'No result';
        }
        this.problemsData = response;
       }, error => {
          if (error.status === 401) {
            this.error = 'No Permission';
          } else {
            this.error = 'Internal Error';
          }

       }
    );

  }


  takeOverProblem() {
    this.managerReq.takeOverProblem(this.checkedProblem.id.toString()).subscribe(
      (response: Array<ProblemData>) => {
        this.information = 'Took over the problem. It is available in your panel';
        this.problemsData = this.problemsData.filter(data => data.id !== this.checkedProblem.id);
       }, error => {
          if (error.status === 401) {
            this.error = 'No Permission';
          } else {
            this.error = 'Can not take over the problem';
          }

       }
    );
  }

  seeProblem(problem: ProblemData) {
    this.response = '';
    this.checkedProblem = JSON.parse(JSON.stringify(problem));
  }

}
