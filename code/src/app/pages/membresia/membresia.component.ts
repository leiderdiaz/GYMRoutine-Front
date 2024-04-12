import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MembresiaService } from './membresia.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrl: './membresia.component.scss',
})
export class MembresiaComponent implements OnInit, OnDestroy {
  
  membresia!: Subscription
  membresias: any;
  fechaInicio!: Date;
  fechaFinal!: Date;
  minDateValue: Date = new Date;
  create!: Boolean;
  minDateValueAfter!: Date;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient, private membresiaService: MembresiaService) { }

  ngOnInit(): void {
    this.membresia = this.membresiaService.consultarMembresiaPorIdUsuario('2812').subscribe()

     this.membresiaService.membresias$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(membresia => {
          this.membresias = membresia     
          if(this.membresias?.length > 0){
            this.create = false
          } else if(this.membresias === null){
            this.create = false
          }
          else{
            this.create = true
          }
      })
  }

  createMembresia(fechaInicio: Date, fechaFin:Date){
    const fechaI = this.parseDateToString(fechaInicio);
    const fechaF = this.parseDateToString(fechaFin);
    const params = {
      "idUsuario": "2812",
      "fechaInicio": fechaI,
      "fechaFin": fechaF
  }
  
  this.membresiaService.crearMembresia(params).subscribe({
    error: (err) => {
      console.log('->',err);
      
    },
    complete: () => {
      this.create = false;
    }
  })
  
  }

  changeFinalDate(date: Date){
    this.minDateValueAfter = date;
  }


  parseDateToString(date: Date){
    return date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  deleteById(id: string){
    this.membresiaService.eliminarMembresiaPorId(id).subscribe(() => {})
    
  }

  ngOnDestroy(): void {
    this.membresia.unsubscribe();
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }



}


