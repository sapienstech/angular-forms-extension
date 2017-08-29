import {Directive, EventEmitter, HostListener, Input, Output, Self} from '@angular/core';
import {NgForm} from '@angular/forms';

@Directive({
    selector: 'form[validSubmit]'
})
export class ValidSubmitDirective {

  @Output() validSubmit = new EventEmitter();

  constructor(@Self() private ngForm: NgForm) {
  }

  @HostListener('submit', ['$event'])
  onSubmit(e) {
    if (this.ngForm.valid) {
      this.validSubmit.emit(e);
    }
  }
}
