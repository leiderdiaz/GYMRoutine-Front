import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  private _membresia: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private httpCliente: HttpClient) { }


  /**
   * @Accesors
   */

  get membresias$(): Observable<any> {
    return this._membresia.asObservable();
  }


  /**
   * 
   * @param id_usuario 
   * @returns 
   */
  consultarMembresiaPorIdUsuario(id_usuario: string): Observable<any> {
    return this.httpCliente.get(`http://localhost:3000/api/membresia/list/${id_usuario}`).pipe(
      map((membresias: any) => {
        const date = new Date();

        let currentDate = this.getDateString(date);
        currentDate = new Date().toJSON().slice(0, 10);

        membresias = membresias.map((membresia: any) => {
          const fechaFin = new Date(membresia.fechaFin)
          let Difference_In_Time = fechaFin.getTime() - date.getTime();
          let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

          return {
            ...membresia,
            fechaHoy: currentDate,
            diasRestantes: Difference_In_Days
          }
        })
        this._membresia.next(membresias)
        return membresias
      })
    );
  }

  public getDateString(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
    return currentDate;
  }

  crearMembresia(params: any): Observable<any> {
    return this.membresias$.pipe(
      take(1),
      switchMap(membresias => this.httpCliente.post(`http://localhost:3000/api/membresia/`,params)
      .pipe(
        map((membresia: any) => {
          console.log('------>',membresia.idUsuario);
          
          return membresia.idUsuario
        }),
        switchMap(id => this.consultarMembresiaPorIdUsuario(id))
      )
      )
    )
  }

  eliminarMembresiaPorId(id: string): Observable<any> {
    return this.membresias$.pipe(
      take(1),
      tap(membresias => this.httpCliente.delete(`http://localhost:3000/api/membresia/${id}`).subscribe(() => {

        membresias.splice(membresias.findIndex((membresia: { id: string; }) => membresia.id === id), 1);

        this._membresia.next(membresias);
      }))
    )
  }


}
