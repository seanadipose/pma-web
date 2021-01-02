import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../modules/user/services/auth.service';
import firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  // user: Account;
  authRq: { scopes: string[]; prompt: string };
  user: firebase.UserInfo;
  constructor(
    // @Inject(CF2_AUTH_REQUEST) private authRq: Cf2AuthRequestType,
    private authSvc: AuthService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(state);
    return this.authSvc.checkUser().pipe(
      switchMap((res) => {
        return of(res !== null ? true : this.router.createUrlTree(['login']));
      })
    );
  }
}
