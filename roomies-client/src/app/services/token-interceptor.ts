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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
      catchError(err => {
        if (err.status === 401) {
          console.log(
            "Unauthorized! Please re-enter your email and password to login!"
          );
          return throwError(err);
        } else if (err.status === 400) {
          console.log("Please check the form for any input errors!");
          return throwError(err);
        } else if (err.status === 403) {
            console.log("Forbiden!");
            return throwError(err);
        }

        const error = err.error.message || err.statusText;
        console.log(error);
        return throwError(error);
      })
    );
  }
}
