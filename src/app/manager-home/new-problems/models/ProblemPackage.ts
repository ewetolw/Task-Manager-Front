import { NgForm } from '@angular/forms';
import { Problem } from './Problem';
import { Task } from './Task';



export class ProblemPackage {

    problem: Problem;
    tasks: Array<Task>;

  constructor(problem?, tasks?) {
    this.problem = problem;
    this.tasks = tasks;

  }


//   parseForm2Problem(formData: NgForm) {
//     this.client = formData.value.client;
//     this.content = formData.value.content;
// }





}
