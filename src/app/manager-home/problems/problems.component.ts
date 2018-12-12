import { Task } from './../new-problems/models/Task';
import { Component, OnInit } from '@angular/core';
import { ManagerReqService } from '../manager-req.service';
import { NgForm } from '@angular/forms';
import { UserData } from 'src/app/home/profiles/profiles.component';
import { Problem } from '../new-problems/models/Problem';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
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

  constructor(private managerReq: ManagerReqService) {

  }





  ngOnInit() {

  }


  getWorkers() {
    this.managerReq.getWorkers().subscribe(
      (res: Array<UserData>) => {
        this.workers = res;
      }, error => {
        if (error.status === 400) {
            this.response = 'Internal error';
        } else {
          this.response = 'Internal error';
        }

      }
    );
}

  seeProblem(problem: ProblemData) {
    this.checkedProblem = problem;
  }

  seeTask(task: TaskData) {
    this.checkedTask = task;
  }

  updateProblem(formData: NgForm) {
    // tslint:disable-next-line:prefer-const
    let problem = new Problem();
    problem.parseForm2Problem(formData);
    problem.id = this.checkedProblem.id;
    // tslint:disable-next-line:prefer-const
    let data = JSON.stringify(problem);
    console.log(data);
    this.managerReq.updateProblem(data).subscribe(
      (res: Response) => {
        this.response = 'Problem updated';
      }, error => {
        if (error.status === 400) {
            this.response = 'Problem content is too short. Minimum 15 characters1';
        } else {
          this.response = 'Internal error';
        }
      }
    );

  }

  updateTask(formData: NgForm) {
    const workerSelect: string = formData.value.worker;
    const taskSelect: string = formData.value.task;
    const task = new Task();
    task.taskContent = taskSelect;
    task.id = this.checkedTask.id;
    const workerId =  workerSelect.match('[0-9]+');
    console.log(workerId[0]); // id workera
    this.managerReq.updateTask( workerId[0], task ).subscribe(
      (response: ResultInfo) => {
        this.response = response.successful;
        this.managerReq.takeProblemBy('id' , this.checkedProblem.id.toString()).subscribe(
          (newData: Array<ProblemData>) => {
            let p = this.problemsData.indexOf(this.checkedProblem);
            this.checkedProblem = newData[0];
            this.problemsData[p.toString()] = this.checkedProblem;
            this.error = null;
          }, error => {
              if (error.status === 401) {
                this.error = 'No Permission';
              } else {
                this.error = 'Internal Error';
              }
              this.information = null;
          }
        );
      }, error => {
          if (error.status === 401) {
            this.response = 'No Permission';
          } else {
            this.response = 'can not update task';
          }
          this.information = null;
      }
    );
  }

  takeAllProblems() {
    console.log('take all problems');
    this.managerReq.takeAllProblems().subscribe(
      (response: Array<ProblemData>) => {
        console.log(response);
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

  clearResponse(){
    this.response='';
  }


  takeProblemBy(formData: NgForm) {
    console.log(formData.value.data, formData.value.option);
    let option =  formData.value.option;
    // tslint:disable-next-line:prefer-const
    let data = formData.value.data;
     console.log('take user by ' + option + ' data: ' + data);
     if (option && data) {
       if (option === 'open date') {
         option = 'date';
       }
          this.managerReq.takeProblemBy(option, data).subscribe(
            (response: Array<ProblemData>) => {
              this.problemsData = response;
              this.error = null;
              if (response.length === 0) {
                this.information = 'No result';
              } else {
                this.information = null;
              }
            }, error => {
                if (error.status === 401) {
                  this.error = 'No Permission';
                } else {
                  this.error = 'Internal Error';
                }
                this.information = null;
            }
          );
      } else {this.information = 'Input data and choose search option'; }
    }

    addTask(formData: NgForm) {
    const workerSelect: string = formData.value.worker;
    const taskSelect: string = formData.value.task;
    const task = new Task();
    task.taskContent = taskSelect;
    console.log(workerSelect);
    const workerId =  workerSelect.match('[0-9]+');
    console.log(workerId[0]); // id workera
    this.managerReq.addTask( (this.checkedProblem.id).toString(), workerId[0], task ).subscribe(
      (response: ResultInfo) => {
        this.response = response.successful;
        this.managerReq.takeProblemBy('id' , this.checkedProblem.id.toString()).subscribe(
          (newData: Array<ProblemData>) => {
            let p = this.problemsData.indexOf(this.checkedProblem);
            this.checkedProblem = newData[0];
            this.problemsData[p.toString()] = this.checkedProblem;
            this.error = null;
          }, error => {
              if (error.status === 401) {
                this.error = 'No Permission';
              } else {
                this.error = 'Internal Error';
              }
              this.information = null;
          }
        );
      }, error => {
          if (error.status === 401) {
            this.response = 'No Permission';
          } else {
            this.response = 'can not add task';
          }
          this.information = null;
      }
    );

    }



    updateStatus() {
        let problem = new Problem();
        problem.id = this.checkedProblem.id;

        problem.status = 'FINISHED';
        this.managerReq.changeProblemStatus(problem).subscribe(
          (response: ResultInfo) => {
            console.log('wywołuje się');
            this.managerReq.takeProblemBy('id' , this.checkedProblem.id.toString()).subscribe(
              (newData: Array<ProblemData>) => {
                let p = this.problemsData.indexOf(this.checkedProblem);
                this.checkedProblem = newData[0];
                this.problemsData[p.toString()] = this.checkedProblem;
                this.error = null;
              }, error => {
                  if (error.status === 401) {
                    this.error = 'No Permission';
                  } else {
                    this.error = 'Internal Error';
                  }
                  this.information = null;
              }
            );
          }, (error: ResultInfo) => {
              this.response = error.error;
          }
        );
    }


    deleteProblem(problem: ProblemData) {
      this.checkedProblem = problem;
      this.managerReq.deleteProblem(this.checkedProblem.id.toString()).subscribe(
        (response: ResultInfo) => {
          this.problemsData =   this.problemsData.filter(data => data.id !== this.checkedProblem.id);
        }
      );
    }



    deleteTask(task: TaskData) {

      this.managerReq.deleteTask(task.id.toString()).subscribe(
        (response: ResultInfo) => {
          this.checkedProblem.tasksList = this.checkedProblem.tasksList.filter(data => data.id !== task.id );

        }, error => {
            if (error.status === 401) {
              this.response = 'No Permission';
            } else {
              this.response = error.body;
            }
            this.information = null;
        }
      );

      }

}

export interface ProblemData {
  id: number;
  content: string;
  client: string;
  status: string;
  openDate: Date;
  changeStatusDate: Date;
  tasksList: Array<TaskData>;
}

export interface TaskData {
  id: number;
  feedback: string;
  taskContent: string;
  status: string;
  openDate: Date;
  changeStatusDate: Date;
  contractorId: ContractorData;
}


export interface ContractorData {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
}

export interface ResultInfo {
  successful: string;
  error: string;
}
