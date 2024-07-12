import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaUsuariosService } from './consulta-usuarios.service';
const todos: any[] = [
  { id: '123', description: 'Complete me!', completed: false },
];
const todos2: any[] = [{ id: '321', description: 'Done!', completed: true }];
@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrl: './consulta-usuarios.component.scss',
})
export class ConsultaUsuariosComponent {
  displayedColumns: string[] = ['username', 'actions'];
  dataSource!: MatTableDataSource<any[]>;

  constructor(private consultaUsuariosService: ConsultaUsuariosService) {}

  ngOnInit(): void {}

  getUsuarios(username: String): void {
    this.consultaUsuariosService.getEjercicios(username).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
