import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, MatCardModule, MatButtonModule],
  exports: [FlexLayoutModule, MatCardModule, MatButtonModule],
})
export class SharedModule {}
