import {Directive, EventEmitter, Input, OnInit, Output, Self, SkipSelf} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {addControl, defaultValidValueChangeDebounce} from './shared';
import {Subject} from 'rxjs/Subject';

@Directive({selector: `[ngModel]`})
export class FormControlNameDirective implements OnInit {

  @Input() validValueChangeDebounce = defaultValidValueChangeDebounce;

  @Output() ngModelValid = new EventEmitter();

  formControlValidValueDebounceStarted= new Subject();

  constructor(@Self() private self: NgModel,
              @SkipSelf() private parent: NgForm) {
  }

  get formControl() {
    return this.self.control;
  }

  @Input()
  set formControlValue(value) {
    this.formControl.setValue(value);
  }

  get valid() {
    return this.formControl.valid;
  }

  get pristine() {
    return this.formControl.pristine;
  }

  get groupSubmitted() {
    return this.parent.submitted;
  }

  get errors() {
    return this.formControl.errors;
  }

  ngOnInit() {
    addControl(this.formControl,
      this.ngModelValid,
      this.formControlValidValueDebounceStarted,
      this.validValueChangeDebounce);
  }
}
