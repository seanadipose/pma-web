import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateJournalFormComponent } from './components/create-journal-form/create-journal-form.component';
import { JournalComponent } from './journal.component';
import { CreateJournalPageComponent } from './views/create-journal-page/create-journal-page.component';
import { JournalPageComponent } from './views/journal-page/journal-page.component';
import { JournalsPageComponent } from './views/journals-page/journals-page.component';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent,
    children: [
      { path: '', component: JournalsPageComponent },
      { path: 'new', component: CreateJournalPageComponent, pathMatch: 'full' },
      { path: ':id', component: JournalPageComponent },
      // { path: ':/id', component: JournalPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalRoutingModule {}
