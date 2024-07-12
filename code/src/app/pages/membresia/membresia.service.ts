import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
    return this.httpCliente
      .get(`http://localhost:8094/api/membresia/list/${id_usuario}`)
      .pipe(
        map((membresias: any) => {
          const date = new Date();

          let currentDate = this.getDateString(date);
          currentDate = new Date().toJSON().slice(0, 10);

          membresias = membresias.map((membresia: any) => {
            let Difference_In_Days;
            Number;
            const fechaFin = new Date(membresia.fechaFin);
            const fechaInicio = new Date(membresia.fechaInicio);
            const fechaHoy = new Date(currentDate);

            let Difference_In_Time_with_today =
              fechaFin.getTime() - fechaHoy.getTime();
            let Difference_In_Time = fechaFin.getTime() - fechaInicio.getTime();

            const Difference_In_Days_total = Math.round(
              Difference_In_Time / (1000 * 3600 * 24)
            );
            const Difference_In_Days_today = Math.round(
              Difference_In_Time_with_today / (1000 * 3600 * 24)
            );
            if (fechaHoy >= fechaInicio) {
              Difference_In_Days = Difference_In_Days_today;
            } else {
              Difference_In_Days = Difference_In_Days_total;
            }

            const percent =
              Difference_In_Days * (100 / Difference_In_Days_total);

            return {
              ...membresia,
              fechaHoy: currentDate,
              diasRestantes: Difference_In_Days,
              percent: percent,
            };
          });
          this._membresia.next(membresias);
          return membresias;
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
      switchMap((membresias) =>
        this.httpCliente
          .post(`http://localhost:8094/api/membresia/`, params)
          .pipe(
            map((membresia: any) => {
              return membresia.idUsuario;
            }),
            switchMap((membresia: any) => this.consultarMembresiaPorIdUsuario(membresia.idUsuario))
          )
      )
    );
  }

  eliminarMembresiaPorId(id: string): Observable<any> {
    return this.membresias$.pipe(
      take(1),
      tap((membresias) =>
        this.httpCliente
          .delete(`http://localhost:8094/api/membresia/${id}`)
          .subscribe(() => {
            membresias.splice(
              membresias.findIndex(
                (membresia: { id: string }) => membresia.id === id
              ),
              1
            );

            this._membresia.next(membresias);
          })
      )
    );
  }
}
