import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  
  constructor(private http: HttpClient) { }

  signin(signinForm: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'signin', signinForm)
    .pipe(
      map(res => {
        // login successful if there's a jwt token in the response
        if (res && res.accessToken) {
          this.loginStatus.next(true);
          localStorage.setItem('userAccessToken', res.accessToken);
        }

        return res;
      }),
      tap(_ => console.log("Login successfully!")),
      catchError(err => this.handleError(err))
    );
  }

  createNewUserAccount(newAccountForm: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'createNewUserAccount', newAccountForm)
    .pipe(
      tap(_ => console.log("Create new user account successful!")),
      catchError(err => this.handleError(err))
    );
  }

  getAllUsers(): Observable<any> {
    const houseId = localStorage.getItem("houseId");
    return this.http.get(environment.apiUrl + "getUsers?houseId=" + houseId)
    .pipe(retry(1), catchError(this.handleError));
  }

  logout() {
    this.loginStatus.next(false);
    localStorage.clear();   
    console.log("Logged out successfully!");
  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }
  
  private handleError(error) {
    console.log(error);
    if (error.error instanceof ErrorEvent) console.log(error.error.message);
    return throwError(error);
  }

  private checkLoginStatus(): boolean {
    return false;
  }
}
