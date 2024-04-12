import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-mainpage',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;
  
  ngOnInit(): void {
    this.items = [
      { label: 'Membresia', icon: 'pi pi-fw pi-home', routerLink: 'membresia'  },
      { label: 'Ejercicios', icon: 'pi pi-fw pi-calendar', routerLink: 'ejercicios' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' }
  ];

  this.activeItem = this.items[0];
  }

}
