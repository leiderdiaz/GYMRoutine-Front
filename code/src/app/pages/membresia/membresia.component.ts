import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MembresiaService } from './membresia.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrl: './membresia.component.scss',
})
export class MembresiaComponent implements OnInit, OnDestroy {
  membresia!: Subscription;
  membresias: any;
  fechaInicio!: Date;
  fechaFinal!: Date;
  minDateValue: Date = new Date();
  create!: Boolean;
  value!: Number;
  minDateValueAfter!: Date;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private http: HttpClient,
    private membresiaService: MembresiaService
  ) {}

  ngOnInit(): void {
    this.membresia = this.membresiaService
      .consultarMembresiaPorIdUsuario('668c0d2090a6fda3a38d25e9')
      .subscribe();

    this.membresiaService.membresias$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((membresia) => {
        this.membresias = membresia;
        if (this.membresias?.length > 0) {
          this.create = false;
          this.value = membresia[0].percent;
        } else if (this.membresias === null) {
          this.create = false;
        } else {
          this.create = true;
        }
      });
  }

  createMembresia(fechaInicio: Date, fechaFin: Date) {
    const fechaI = this.parseDateToString(fechaInicio);
    const fechaF = this.parseDateToString(fechaFin);
    const params = {
      idUsuario: '668c0d2090a6fda3a38d25e9',
      fechaInicio: fechaI,
      fechaFin: fechaF,
    };

    this.membresiaService.crearMembresia(params).subscribe({
      error: (err) => {
        console.log('->', err);
      },
      complete: () => {
        this.create = false;
      },
    });
  }

  changeFinalDate(date: Date) {
    this.minDateValueAfter = date;
  }

  parseDateToString(date: Date) {
    return date.toISOString().split('.')[0];
  }

  deleteById(id: string) {
    this.membresiaService.eliminarMembresiaPorId(id).subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.membresia.unsubscribe();
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
