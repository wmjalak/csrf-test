import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      // withCredentials: true, // needed for CORS
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'credentials': 'same-origin'

      }
    });

    return next
      .handle(request)
      /*
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(event);
          }
        })
      )
      */
      ;
  }

}
