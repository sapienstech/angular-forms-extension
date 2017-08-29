import {Directive, EventEmitter, Input, OnInit, Output, Self, SkipSelf} from '@angular/core';
import {FormControl, NgForm, NgModel} from '@angular/forms';
import {addControl, defaultValidValueChangeDebounce} from './shared';
import {Subject} from 'rxjs/Subject';

@Directive({selector: `[ngModel]`})
export class HybridFormModelDirective implements OnInit {

  @Input() ngModelValidChangeDebounce = defaultValidValueChangeDebounce;

  @Output() ngModelValidChange = new EventEmitter();

  formControlValidValueDebounceStarted= new Subject();

  constructor(@Self() private self: NgModel,
              @SkipSelf() private parent: NgForm) {
  }

  get formControl(): FormControl {
    return this.self.control;
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
      this.ngModelValidChange,
      this.formControlValidValueDebounceStarted,
      this.ngModelValidChangeDebounce);
  }
}
