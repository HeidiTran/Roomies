import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // TODO: localStorage.getItem("houseAccessToken")
    // If available --> use request with this token instead of user token

    const token = localStorage.getItem("userAccessToken");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token,
        },
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json"),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("event--->>>", event);
        }
        return event;
      }),
      catchError((err) => {
        console.log(err.url);
        if (err.status === 401) {
          if (err.url === environment.apiUrl + "createNewUserAccount") {
            alert("Email or username already exists!");
          } else if (err.url === environment.apiUrl + "signin") {
            alert("Username does not exist. Please create a new account.");
            this.router.navigate(["newAccount"]);
          }
          return throwError(err);
        } else if (err.status === 400) {
          alert("Please check the form for any input errors!");
          return throwError(err);
        } else if (err.status === 403) {
          alert("Username or password is incorrect. Please try again!");
          return throwError(err);
        } else if (err.status === 500) {
          alert("Internal Server Error");
          return throwError(err);
        }

        const error = err.error.message || err.statusText;
        console.log(error);
        return throwError(error);
      })
    );
  }
}
