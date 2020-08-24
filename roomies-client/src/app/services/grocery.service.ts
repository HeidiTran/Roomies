import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Item } from "../shared/item";
import { environment } from "src/environments/environment";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GroceryService {
  houseId = localStorage.getItem("houseId");

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item> {
    return this.http
      .get<Item>(environment.apiUrl + "getAllItems?houseId=" + this.houseId)
      .pipe(retry(1), catchError(this.handleError));
  }

  getItem(itemId: number): Observable<Item> {
    return this.http
      .get<Item>(environment.apiUrl + "getItem/" + itemId)
      .pipe(retry(1), catchError(this.handleError));
  }

  createItem(item: any): Observable<Item> {
    return this.http
      .post<Item>(environment.apiUrl + "addItem", JSON.stringify(item))
      .pipe(retry(1), catchError(this.handleError));
  }

  updateItem(itemId: number, item): Observable<Item> {
    return this.http
      .put<Item>(
        environment.apiUrl + "editItem/" + itemId,
        JSON.stringify(item)
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteItem(itemId: number): Observable<Item> {
    return this.http
      .delete<Item>(environment.apiUrl + "deleteItem/" + itemId)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error) {
    console.log(error);
    if (error.error instanceof ErrorEvent) console.log(error.error.message);
    return throwError(error);
  }
}
