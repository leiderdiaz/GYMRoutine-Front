import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EjerciciosService {
  private apiEjerciciosUrl = 'http://localhost:8094/api/ejercicios/list';
  private apiTipoEjerciciosUrl = 'http://localhost:8094/api/tipoEjercicio/list';
  private apiDificultadEjerciciosUrl =
    'http://localhost:8094/api/dificultadejercicios/list';
  constructor(private http: HttpClient) {}

  getEjercicios(
    idTipoEjercicio: number | null,
    idDificultadEjercicio: number | null
  ): Observable<any[]> {
    let url = this.apiEjerciciosUrl;
    //Verificar si hay filtro por tipo y agregarlo al url del endpoint
    if (idTipoEjercicio !== null) {
      url += `?idTipoEjercicio=${idTipoEjercicio}`;
    } 
    //Verificar si hay filtro por dificultad y agregarlo al url del endpoint
    if (idDificultadEjercicio !== null) {
      url += `${
        url.includes('?') ? '&' : '?'
      }idDificultadEjercicio=${idDificultadEjercicio}`;
    }
    return this.http.get<any[]>(url);
  }

  getDificultades(): Observable<any[]> {
    let url = this.apiDificultadEjerciciosUrl;
    return this.http.get<any[]>(url);
  }

  getTipos(): Observable<any[]> {
    let url = this.apiTipoEjerciciosUrl;
    return this.http.get<any[]>(url);
  }
}
