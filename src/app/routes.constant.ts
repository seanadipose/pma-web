import { Routes } from '@angular/router';
import { ValidRouteGuard } from './core/guards/can-load.guard';
import { LoginGuard } from './core/guards/login.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


export const routes: Routes = [

  { path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule), canLoad: [ValidRouteGuard] },
  {
    path: 'home',
    loadChildren: () => import( './pages/home/home.module' ).then( ( m ) => m.HomeModule ),
     canLoad: [ValidRouteGuard],
    canActivate: [LoginGuard],
  },
  {
    path: 'journals',
    loadChildren: () => import('./pages/journal/journal.module').then((m) => m.JournalModule),
    canActivate: [LoginGuard],
  },
  // { outlet: 'missing', path: 'missing', component: NotFoundComponent, },
{  path: 'not-found', component: NotFoundComponent, },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];


export const clone = routes.map( route => route.path );
