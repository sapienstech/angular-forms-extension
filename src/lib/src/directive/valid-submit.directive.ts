import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Directive({
  selector: '[validSubmit]',
  exportAs: 'form',
})
export class ValidSubmitDirective {

  @Output() validSubmit = new EventEmitter();

  group = new FormGroup({});

  @HostListener('submit', ['$event'])
  onSubmit(e) {
    if (this.group.valid) {
      this.validSubmit.emit(e);
    }
  }
}
