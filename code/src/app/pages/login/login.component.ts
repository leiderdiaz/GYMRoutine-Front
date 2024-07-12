import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  usuario: any;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit() {}
  ngOnDestroy(): void {}
  login(user: string, password: string) {
    this.loginService.getAuth(user, password).subscribe((data) => {
      this.usuario = data;
      if (data === null || data === undefined) {
        this.snackbar.open('Usuario o contraseña erroneos', 'Ok', {
          duration: 5000,
        });
      } else if (data !== null) {
        this.router.navigate(['/dashboard']);
      }
    });
    console.log(this.usuario.id);
  }
}
