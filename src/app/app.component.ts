import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'pma-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <pma-navigation>
      <router-outlet></router-outlet>
    </pma-navigation>

    <ngx-spinner></ngx-spinner>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Progressive Mental Alignment';
  constructor(private authSvc: AuthService, private router: Router, private loadingSvc: LoadingService) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((obs) => {
      // if (obs) this.router.navigate(['home']);
    });

    // this.loadingSvc.start();
  }
}
