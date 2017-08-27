import {ChangeDetectorRef, Directive, EventEmitter, Input, OnInit, Optional, Output, SkipSelf} from '@angular/core';
import {FormControl, FormGroupDirective} from '@angular/forms';
import {FormGroupNameDirective} from './form-group-name.directive';
import {addControl, defaultValidValueChangeDebounce} from './shared';
import {Subject} from 'rxjs/Subject';

@Directive({selector: `[formControlName]`})
export class FormControlNameDirective implements OnInit {

  @Input() formControlName;

  @Input() validValueChangeDebounce = defaultValidValueChangeDebounce;

  @Output() formControlValueChange = new EventEmitter();

  @Output() formControlValidValueChange = new EventEmitter();

  formControlValidValueDebounceStarted= new Subject();

  private formControl = new FormControl();


  constructor(@SkipSelf() private formGroupDirective: FormGroupDirective,
              @Optional() @SkipSelf() private formGroupNameDirective: FormGroupNameDirective,
              private cd: ChangeDetectorRef) {
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
    return this.formGroupDirective.submitted;
  }

  get errors() {
    return this.formControl.errors;
  }

  ngOnInit() {
    addControl(this.cd,
      this.formGroupNameDirective,
      this.formGroupDirective,
      this.formControlName,
      this.formControl,
      this.formControlValueChange,
      this.formControlValidValueChange,
      this.formControlValidValueDebounceStarted,
      this.validValueChangeDebounce);
  }
}
