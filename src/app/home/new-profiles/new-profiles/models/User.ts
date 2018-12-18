import { NgForm } from '@angular/forms';



export class User {
    id: number;
    username: string;
    role: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    activated = true;

  constructor(username?, role?, lastname?, firstname?, email?, password?) {
    this.username = username;
    this.role = role;
    this.lastName = lastname;
    this.firstName = firstname;
    this.email = email;
    this.password = password;
  }


  parseForm2User(formData: NgForm) {
    this.username = formData.value.username;
    this.firstName = formData.value.firstname;
    this.lastName = formData.value.lastname;
    this.email = formData.value.email;
    if ( formData.value.password !== '' ) {
    this.password = formData.value.password;
    this.role = formData.value.role;
    }
}





}
