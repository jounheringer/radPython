import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "http://127.0.0.1:8000/alunos";

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`).pipe(catchError(this.handlerError))
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Existe algum problema com o lado do cliente ou internet: ", error);
    }else {
      console.error("Erro do servidor: ", error);
    }

    return throwError(() => new Error("Problemas ao receber lista de alunos do servidor, por favor tente novamente."));
  }
}
