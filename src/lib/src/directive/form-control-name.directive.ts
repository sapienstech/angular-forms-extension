import {ChangeDetectorRef, Directive, EventEmitter, Input, OnInit, Output, Self, SkipSelf} from '@angular/core';
import {FormControl, FormControlDirective, FormGroupDirective} from '@angular/forms';
import {addControl, addToParent, defaultValidValueChangeDebounce, id} from './shared';
import {Subject} from 'rxjs/Subject';

@Directive({selector: `[formControl]`})
export class FormControlNameDirective implements OnInit {

  @Input() formControlName;

  @Input() validValueChangeDebounce = defaultValidValueChangeDebounce;

  @Output() formControlValueChange = new EventEmitter();

  @Output() formControlValidValueChange = new EventEmitter();

  formControlValidValueDebounceStarted= new Subject();

  private formControl = new FormControl();


  constructor(@Self() self: FormControlDirective,
              @SkipSelf() private parent: FormGroupDirective,
              private cd: ChangeDetectorRef) {
    self.form = this.formControl;
    addToParent(parent.form, id(), self.form);
  }

  @Input()
  set formControlValue(value) {
    this.formControl.setValue(value);
  }

  get formControlValue() {
    return this.formControl.value;
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
    addControl(this.cd,
      this.formControl,
      this.formControlValueChange,
      this.formControlValidValueChange,
      this.formControlValidValueDebounceStarted,
      this.validValueChangeDebounce);
  }
}
