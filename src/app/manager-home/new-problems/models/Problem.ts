import { NgForm } from '@angular/forms';
import { Client } from './Client';



export class Problem {
    id: number;
    client: Client;
    content: string;
    status: string;

  constructor(client?, content?, id?, status?) {
    this.id = id;
    this.client = client;
    this.content = content;
    this.status = status;
  }


  parseForm2Problem(formData: NgForm) {
    const c = new Client();
    c.client = formData.value.client;
    c.client = c.client.toUpperCase();
    this.client = c;
    this.content = formData.value.content;
}





}
