import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {
  private apiRutinasUrl = 'http://localhost:8094/api/rutinas/list'
  private apiTipoEjerciciosUrl = 'http://localhost:8094/api/tipoEjercicio/list';
  private apiDificultadEjerciciosUrl =
    'http://localhost:8094/api/dificultadEjercicios/list';
  constructor(private http: HttpClient) { }

  getRutinas(
    tipoRutina: string | null,
    dificultadRutina: string | null
  ): Observable<any[]> {
    let url = this.apiRutinasUrl;
    //Verificar si hay filtro por tipo y agregarlo al url del endpoint
    if (tipoRutina !== null && tipoRutina !== undefined) {
      url += `?tipoRutina=${tipoRutina}`;
    }
    //Verificar si hay filtro por dificultad y agregarlo al url del endpoint
    if (dificultadRutina !== null && dificultadRutina !== undefined) {
      url += `${url.includes('?') ? '&' : '?'
        }dificultadRutina=${dificultadRutina}`;
    }
    console.log(url);
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
