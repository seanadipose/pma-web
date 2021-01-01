import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal.component';
import { JournalPageComponent } from './views/journal-page/journal-page.component';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent,
    children: [
      { path: 'create', component: JournalPageComponent },
      { path: ':/id', component: JournalPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalRoutingModule {}
