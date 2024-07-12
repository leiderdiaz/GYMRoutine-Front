import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _usuario: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  getAuth(username: string, password: String): Observable<any> {

    return this.http
      .get<any>(
        `http://localhost:8094/api/auth/?username=${username}&password=${password}`
      );
  }
}
