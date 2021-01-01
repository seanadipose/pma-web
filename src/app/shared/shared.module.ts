import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const MAT_MODULES = [
  FlexLayoutModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatIconModule,
  MatListModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MAT_MODULES],
  exports: [FlexLayoutModule, ...MAT_MODULES],
})
export class SharedModule {}
