import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  constructor(
    private router: Router,
    private registroService: RegistrationService,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit() {}

  create(user: String, nombre: String, apellido: String, clave: String) {
    const params = {
      username: user,
      nombre: nombre,
      apellido: apellido,
      clave: clave,
    };
    this.registroService.createUser(params).subscribe((res) => {
      if (res !== null || res !== undefined) {
        this.router.navigate(['/dashboard']);
      } else {
        this.snackbar.open("Usuario no creado")
      }
    });
  }
}
