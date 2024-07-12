import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-mainpage',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [
      { label: 'Membresia', icon: 'pi pi-fw pi-home', routerLink: 'membresia' },
      {
        label: 'Ejercicios',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'ejercicios',
      },
      {
        label: 'Rutinas',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'rutinas',
      },
      { label: 'Usuarios', icon: 'pi pi-fw pi-pencil', routerLink: 'usuarios' },
    ];

    this.activeItem = this.items[0];
  }
}
