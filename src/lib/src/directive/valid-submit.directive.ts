import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
    selector: 'form[validSubmit]'
})
export class ValidSubmitDirective {

  @Output() validSubmit = new EventEmitter();

  @Input() formGroup;

  @HostListener('submit', ['$event'])
  onSubmit(e) {
    if (this.formGroup.valid) {
      this.validSubmit.emit(e);
    }
  }
}
