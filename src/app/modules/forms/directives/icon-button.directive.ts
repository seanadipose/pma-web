import { Directive, ElementRef, HostListener } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: '[pmaIconButton]',
})
export class IconButtonDirective {
  @HostListener('click', ['$event'])
  click(event: MouseEvent, value: boolean) {
    console.log(this, value);
    this.elRef.nativeElement;
  }
  constructor(private elRef: ElementRef<HTMLButtonElement>, private button: MatButton) {}
}
