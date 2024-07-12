import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) { }

  createUser(params: any): Observable<any> {
    var res = this.http.post<any>(`http://localhost:8094/api/usuario/`, params);
    return res;
  }
}
