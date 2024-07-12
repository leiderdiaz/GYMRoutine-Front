import { Component } from '@angular/core';
import { EjerciciosService } from './ejercicios.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.scss',
})
export class EjerciciosComponent {
  ejercicios: any[] = [];
  tipos: any[] = [];
  dificultades: any[] = [];
  tipoSeleccionado: number | null = null;
  dificultadSeleccionada: number | null = null;

  displayedColumns: string[] = ['nombre', 'actions'];
  dataSource!: MatTableDataSource<any[]>;
  constructor(private ejerciciosService: EjerciciosService) {}

  ngOnInit(): void {
    this.getTipos();
    this.getDificultades();
    this.getEjercicios();
  }

  getEjercicios(): void {
    this.ejerciciosService
      .getEjercicios(this.tipoSeleccionado, this.dificultadSeleccionada)
      .subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource(data);
        },
        (error) => {
          console.error('Error al obtener los ejercicios', error);
        }
      );
  }

  getTipos(): void {
    this.ejerciciosService.getTipos().subscribe(
      (data) => {
        this.tipos = data;
      },
      (error) => {
        console.error('Error al obtener los tipos de ejercicios', error);
      }
    );
  }

  getDificultades(): void {
    this.ejerciciosService.getDificultades().subscribe(
      (data) => {
        this.dificultades = data;
      },
      (error) => {
        console.error(
          'Error al obtener las dificultades de los ejercicios',
          error
        );
      }
    );
  }
}
