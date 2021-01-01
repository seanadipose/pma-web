import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
import { LogLevels } from '../enums/enums/log-levels.enum';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorSvc: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log('error happened');

        if (err.status === 401) {
          // auto logout if 401 response returned from api
          /* redirect to logout page */
          // this.authSvc.logout();
        }

        const error = err?.error?.message || err.statusText;
        // this.logSvc.logError({
        //   lvl: 'ERROR',
        //   mssg: `${request.urlWithParams} failed with error: ${error}`,
        // });

        /**
         * Ex: request.url = http://localhost:8200/api/User
         *
         * get the unique part of url
         * return url = '/User'
         */
        const url = request.url.split('api')[1];
        // Not includes in array of urls then show pop up
        if (!['/user', '/applicationsettings'].includes(url.toLowerCase())) {
          this.errorSvc.log(LogLevels.ERROR, { message: error.message });
        }
        // this.modalSvc.openCustomDialog(dialogComponent, params);
        return throwError(error);
        // return next.handle(request)
      })
    );
  }
}
