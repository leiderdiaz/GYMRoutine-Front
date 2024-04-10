import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  Roles: any = ['Admin', 'Author', 'Reader'];
  constructor() { }
  ngOnInit() {
  }
}
