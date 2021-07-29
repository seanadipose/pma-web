import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule) },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'journals',
    loadChildren: () => import('./pages/journal/journal.module').then((m) => m.JournalModule),
    canActivate: [LoginGuard],
  },
  { outlet: 'missing', path: 'missing', component: NotFoundComponent, },
{  path: 'not-found', component: NotFoundComponent, },
  { path: '**', component: NotFoundComponent, outlet:'missing'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class AppRoutingModule {}
