import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

const MAT_MODULES = [MatFormFieldModule, MatInputModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, RxReactiveFormsModule, ...MAT_MODULES],
  exports: [ReactiveFormsModule, RxReactiveFormsModule, ...MAT_MODULES],
})
export class FormsModule {}
