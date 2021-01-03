import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal.component';
import { JournalPageComponent } from './views/journal-page/journal-page.component';
import { JournalFormComponent } from './components/journal-form/journal-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from 'src/app/modules/forms/forms.module';
import { CreateJournalFormComponent } from './components/create-journal-form/create-journal-form.component';
import { CreateJournalPageComponent } from './views/create-journal-page/create-journal-page.component';
import { JournalsPageComponent } from './views/journals-page/journals-page.component';
import { JournalCardComponent } from './components/journal-card/journal-card.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@blox/material';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    JournalComponent,
    JournalPageComponent,
    JournalFormComponent,
    CreateJournalFormComponent,
    CreateJournalPageComponent,
    JournalsPageComponent,
    JournalCardComponent,
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    SharedModule,
    FormsModule,
    MatMenuModule,
    AgmCoreModule,
    GoogleMapsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JournalModule {}
