import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal.component';
import { JournalPageComponent } from './views/journal-page/journal-page.component';
import { JournalForm } from './models/journal-form.model';
import { JournalFormComponent } from './components/journal-form/journal-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from 'src/app/modules/forms/forms.module';
import { CreateJournalFormComponent } from './components/create-journal-form/create-journal-form.component';
import { CreateJournalPageComponent } from './views/create-journal-page/create-journal-page.component';
import { JournalsPageComponent } from './views/journals-page/journals-page.component';

@NgModule({
  declarations: [JournalComponent, JournalPageComponent, JournalFormComponent, CreateJournalFormComponent, CreateJournalPageComponent, JournalsPageComponent],
  imports: [CommonModule, JournalRoutingModule, SharedModule, FormsModule, MatMenuModule],
})
export class JournalModule {}
