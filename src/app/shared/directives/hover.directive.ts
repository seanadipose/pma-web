import { ComponentType } from '@angular/cdk/portal';
import { Component, Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { JournalCardComponent } from 'src/app/pages/journal/components/journal-card/journal-card.component';

@Directive({
  selector: '[pmaHover]',
})
export class HoverDirective {
  hoverClass = 'mat-elevation-z8';
  normalClass = 'mat-elevation-z2';

  @HostBinding('class')
  className = this.normalClass;

  elevationClass: string;
  @HostListener('mouseenter')
  onMouseEnter() {
    this.className = this.hoverClass;
    console.log(this);
  }
  @HostListener('mouseleave')
  onMouseExit() {
    this.className = this.normalClass;
  }
  constructor() {}
}
