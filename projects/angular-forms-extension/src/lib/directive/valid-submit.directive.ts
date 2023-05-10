import {Directive, EventEmitter, HostListener, Output, Self} from '@angular/core';
import {NgForm} from '@angular/forms';

@Directive({selector: '[validSubmit]'})
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
