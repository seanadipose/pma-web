import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidRouteGuard } from './core/guards/can-load.guard';
import { LoginGuard } from './core/guards/login.guard';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import * as R from 'remeda';

export const routes: Routes = [

  { path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule), canLoad: [ValidRouteGuard] },
  {
    path: 'home',
    loadChildren: () => import( './pages/home/home.module' ).then( ( m ) => m.HomeModule ),
    canActivate: [ ValidRouteGuard, LoginGuard ],
  },
  {
    path: 'journals',
    loadChildren: () => import('./pages/journal/journal.module').then((m) => m.JournalModule),
    canActivate: [ValidRouteGuard, LoginGuard ],

  },
  // { outlet: 'missing', path: 'missing', component: NotFoundComponent, },
  {
    path: 'not-found', component: NotFoundComponent,
    canActivate: [ ValidRouteGuard ],

  },
  {
    path: '**',component: NotFoundComponent,
    canActivate: [ ValidRouteGuard ],

  },
];


export const clone = routes.map( route => route.path );


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class AppRoutingModule {}
