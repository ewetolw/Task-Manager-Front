import { NgForm } from '@angular/forms';



export class Problem {
    id: number;
    client: string;
    content: string;
    status: string;

  constructor(client?, content?, id?, status?) {
    this.id = id;
    this.client = client;
    this.content = content;
    this.status = status;

  }


  parseForm2Problem(formData: NgForm) {
    this.client = formData.value.client;
    this.content = formData.value.content;
}





}
