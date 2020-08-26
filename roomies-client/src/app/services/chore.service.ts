import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Task } from "../shared/task";
import { environment } from "src/environments/environment";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ChoreService {
  houseId = localStorage.getItem("houseId");

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task> {
    return this.http
      .get<Task>(environment.apiUrl + "getAllTasks?houseId=" + this.houseId)
      .pipe(retry(1), catchError(this.handleError));
  }

  getTask(taskId: number): Observable<Task> {
    return this.http
      .get<Task>(environment.apiUrl + "getTask/" + taskId)
      .pipe(retry(1), catchError(this.handleError));
  }

  addTask(task: any): Observable<Task> {
    return this.http
      .post<Task>(environment.apiUrl + "addTask", task)
      .pipe(retry(1), catchError(this.handleError));
  }

  editTask(taskId: number, task): Observable<Task> {
    return this.http
      .put<Task>(environment.apiUrl + "editTask/" + taskId, task)
      .pipe(retry(1), catchError(this.handleError));
  }

  doneTask(taskId): Observable<Task> {
    return this.http
      .put<Task>(environment.apiUrl + "doneTask/" + taskId, {})
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteTask(taskId: number): Observable<Task> {
    return this.http
      .delete<Task>(environment.apiUrl + "deleteTask/" + taskId)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error) {
    console.log(error);
    if (error.error instanceof ErrorEvent) console.log(error.error.message);
    return throwError(error);
  }
}
