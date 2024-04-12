import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) { }
  ngOnInit() {
  }


  login(user: string, password: string){
    console.log(user, password);
    this.router.navigate(['/dashboard'])
    
  }
}
