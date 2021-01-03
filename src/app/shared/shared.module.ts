import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { ButtonContainerComponent } from './components/button-container/button-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';

const MAT_MODULES = [
  FlexLayoutModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatIconModule,
  MatListModule,
  MatChipsModule,
  MatGridListModule,
];

@NgModule({
  declarations: [ButtonContainerComponent, DashboardComponent],
  imports: [CommonModule, ...MAT_MODULES, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, LayoutModule],
  exports: [FlexLayoutModule, ...MAT_MODULES, ButtonContainerComponent, DashboardComponent],
})
export class SharedModule {}
