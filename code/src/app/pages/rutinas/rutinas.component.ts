import { Component } from '@angular/core';
import { RutinasService } from './rutinas.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.scss'
})
export class RutinasComponent {
  tipos: any[] = [];
  dificultades: any[] = [];
  tipoSeleccionado: string | null = null;
  dificultadSeleccionada: string | null = null;
  displayedColumns: string[] = ['nombre', 'username','tipo', 'dificultad', 'ejercicios'];
  dataSource!: MatTableDataSource<any[]>;
  constructor(private rutinasService: RutinasService) {}

  ngOnInit(): void {
    this.getTipos();
    this.getDificultades();
    this.getRutinas();
  }

  getRutinas(): void{
    this.rutinasService
      .getRutinas(this.tipoSeleccionado, this.dificultadSeleccionada)
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
    this.rutinasService.getTipos().subscribe(
      (data) => {
        this.tipos = data;
      },
      (error) => {
        console.error('Error al obtener los tipos de ejercicios', error);
      }
    );
  }

  getDificultades(): void {
    this.rutinasService.getDificultades().subscribe(
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
