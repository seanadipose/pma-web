import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './views/home/home-page.component';

const routes: Routes = [{ path: '', component: HomeComponent, children: [{ path: '', component: HomePageComponent }] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
