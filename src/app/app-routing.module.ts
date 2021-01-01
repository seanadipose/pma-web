import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule) },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'journal',
    loadChildren: () => import('./pages/journal/journal.module').then((m) => m.JournalModule),
    canActivate: [LoginGuard],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class AppRoutingModule {}
