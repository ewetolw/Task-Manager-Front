import { Task } from './models/Task';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagerReqService } from '../manager-req.service';
import { Problem } from './models/Problem';
import { UserData } from 'src/app/home/profiles/profiles.component';
import { TaskData } from '@angular/core/src/testability/testability';

@Component({
  selector: 'app-new-problems',
  templateUrl: './new-problems.component.html',
  styleUrls: ['./new-problems.component.css']
})
export class NewProblemsComponent implements OnInit {


  response;
  constructor(private managerReq: ManagerReqService) { }

  ngOnInit() {

  }



  addProblem(formData: NgForm) {

        // tslint:disable-next-line:prefer-const
        let problem = new Problem();
        problem.parseForm2Problem(formData);
        // tslint:disable-next-line:prefer-const
        let data = JSON.stringify(problem);
        console.log(data);
        this.managerReq.addProblem(data).subscribe(
          (res: Response) => {
            this.response = 'Reported problem';
          }, error => {
            if (error.status === 400) {
                this.response = 'Problem content is too short. Minimum 15 character';
            } else {
              this.response = 'Internal error';
            }

          }
        );
}




}
