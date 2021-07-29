import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { ErrorService } from '../services/error.service'

import * as R from 'remeda';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../core.module';
// import { clone } from 'src/app/app-routing.module';


// const appRoutes = R.clone(clone)

@Injectable({providedIn: 'root'})
export class ValidRouteGuard implements CanActivate{

  constructor(@Inject(WINDOW) private window: Window, private errorSvc: ErrorService, @Inject('Routelist')  private routeList: string[], private router: Router) { }
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {

    const segment = route.url.toString()

    console.log(state)
    const test = this.routeList.includes( segment.toLowerCase() );

    if ( !test ) {

      this.errorSvc.log( 'error', { message: 'Failed to load route' + segment } )

      // this.router.navigate([state.url])
      setTimeout(() => this.window.history.back(), 5000)
      return false;
    }




    return true;
  }

}
