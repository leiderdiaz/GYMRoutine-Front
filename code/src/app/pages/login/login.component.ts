import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor() { }
  ngOnInit() {
  }


  login(user: string, password: string){
    console.log(user, password);
    
  }
}
