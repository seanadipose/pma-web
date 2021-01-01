import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal.component';
import { JournalPageComponent } from './views/journal-page/journal-page.component';
import { JournalForm } from './models/journal-form.model';
import { JournalFormComponent } from './components/journal-form/journal-form.component';

@NgModule({
  declarations: [JournalComponent, JournalPageComponent, JournalFormComponent],
  imports: [CommonModule, JournalRoutingModule],
  providers: [{ provide: JournalForm, useValue: new JournalForm() }],
})
export class JournalModule {}
