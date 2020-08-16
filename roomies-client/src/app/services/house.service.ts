import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HouseService {
  private joinHouseStatus = new BehaviorSubject<boolean>(
    this.checkJoinHouseStatus()
  );

  constructor(private http: HttpClient) {}

  joinHouse(joinHouseForm: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + "joinHouse", joinHouseForm)
      .pipe(
        map((res) => {
          // TODO: change accessToken to what backend returns
          if (res && res.accessToken) {
            this.joinHouseStatus.next(true);
            localStorage.setItem("houseAccessToken", res.accessToken);
          }

          return res;
        }),
        tap((_) => console.log("Join house successfully!")),
        catchError((err) => this.handleError(err))
      );
  }

  createNewHouse(newHouseForm: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + "createNewHouse", newHouseForm)
      .pipe(
        tap((_) => console.log("Create new house successful!")),
        catchError((err) => this.handleError(err))
      );
  }

  leaveHouse() {
    this.joinHouseStatus.next(false);
    localStorage.removeItem("houseAccessToken");
    console.log("Leave house successfully!");
  }

  get hasJoinedHouse() {
    return this.joinHouseStatus.asObservable();
  }

  private handleError(error) {
    console.log(error);
    if (error.error instanceof ErrorEvent) console.log(error.error.message);
    return throwError(error);
  }

  private checkJoinHouseStatus(): boolean {
    return false;
  }
}
