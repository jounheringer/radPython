import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {PutStudentModel} from "../models/PutStudentModel";
import {Student} from "../models/student";
import {LoginModel} from "../models/LoginModel";
import {SubjectModel} from "../models/SubjectModel";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "http://127.0.0.1:8000/alunos";
  private registerApiUrl = "http://127.0.0.1:8000/register";
  private loginApiUrl = "http://127.0.0.1:8000/login";
  private subjectApiUrl = "http://127.0.0.1:8000/subject";

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
  };

  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`).pipe(catchError(this.handlerError))
  }
  getStudent(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(catchError(this.handlerError))
  }

  addStudent(student: PutStudentModel): Observable<any> {
    return this.http.post(`${this.registerApiUrl}`, student, {observe: "response"}).pipe(catchError(this.handlerError))
  }

  removeStudent(id: Number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError(this.handlerError))
  }

  editStudent(student: Student): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${student.id}`, student).pipe(catchError(this.handlerError))
  }

  validateLogin(login: FormData): Observable<any> {
    return this.http.post(`${this.loginApiUrl}`, login, {observe: "response"}).pipe(catchError(this.handlerError))
  }

  updateFirstLogin(login: LoginModel, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/first/${id}`, login)
  }

  addSubject(subject: {subject_name: string, id_user: number}): Observable<any> {
    return this.http.post(`${this.subjectApiUrl}/`, subject)
  }

  editSubject(subject: SubjectModel): Observable<any> {
    return this.http.put(`${this.subjectApiUrl}/${subject.id}`, subject)
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Existe algum problema com o lado do cliente ou internet: ", error);
    } else {
      console.error("Erro do servidor: ", error);
    }

    return throwError(() => new Error("Problemas ao receber lista de alunos do servidor, por favor tente novamente."));
  }
}
