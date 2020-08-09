import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

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
          localStorage.setItem('userAcessToken', res.accessToken);
        }
      }),
      tap(_ => console.log("Login successfully!")),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * this.authService.register(this.registrationForm.value)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/login']); 
      }, (err) => {
      console.log(err);
      alert("Your registration was unsuccessful!");
    });
   */
  createNewUserAccount(newAccountForm: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'createNewUserAccount', newAccountForm)
    .pipe(
      tap(_ => console.log("Create new user account successful!")),
      catchError(err => this.handleError(err))
    );
  }

  logout() {
    this.loginStatus.next(false);
    localStorage.clear();   
    console.log("Logged out successfully!");
  }

  logoutHouse() {
    localStorage.removeItem("houseAccessToken");
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
