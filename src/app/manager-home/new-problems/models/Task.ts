import { NgForm } from '@angular/forms';



export class Task {

    contractorId: string;
    taskContent: string;
    id: number;

  constructor(contractorId?, content?) {
    this.contractorId = contractorId;
    this.taskContent = content;
  }


  parseForm2Task(formData: NgForm) {
    this.contractorId = formData.value.contractorID;
    this.taskContent = formData.value.taskContetn;
}





}
