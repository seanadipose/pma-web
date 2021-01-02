import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from './modules/user/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { StateService } from './core/services/state-service';

@Component({
  selector: 'pma-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <pma-navigation *ngIf="isReady">
      <router-outlet></router-outlet>
    </pma-navigation>

    <ngx-spinner></ngx-spinner>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Progressive Mental Alignment';
  isReady = false;

  constructor(
    private authSvc: AuthService,
    private stateSvc: StateService,
    private router: Router,
    private loadingSvc: LoadingService
  ) {
    this.loadingSvc.start();
  }

  ngOnInit() {
    this.authSvc
      .checkUser()
      .pipe(switchMap((obs) => from(this.stateSvc.init(obs))))
      .subscribe((res) => {
        console.log('loaded');

        this.isReady = true;
        this.loadingSvc.hide();
      });
  }
}
