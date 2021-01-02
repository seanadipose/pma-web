import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(private loaderService: LoadingService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept');
    if (this.count === 0) {
      this.loaderService.start();
    }
    this.count++;
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
