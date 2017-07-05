import {Directive, EventEmitter, Input, OnInit, Optional, Output, SkipSelf} from '@angular/core';
import {FormControl, FormGroupDirective} from '@angular/forms';
import {FormGroupNameDirective} from './form-group-name.directive';
import {addControl} from './shared';

@Directive({selector: `[formControlName]`})
export class FormControlNameDirective implements OnInit {

  @Input() formControlName;

  @Output() formControlValueChange = new EventEmitter();

  @Output() formControlValidValueChange = new EventEmitter();

  formControl = new FormControl();

  constructor(@SkipSelf() private formGroupDirective: FormGroupDirective,
              @Optional() @SkipSelf() private formGroupNameDirective: FormGroupNameDirective) {
  }

  @Input()
  set formControlValue(value) {
    this.formControl.setValue(value);
  }

  get formControlValue() {
    return this.formControl.value;
  }

  ngOnInit() {
    addControl(this.formGroupNameDirective,
      this.formGroupDirective,
      this.formControlName,
      this.formControl,
      this.formControlValueChange,
      this.formControlValidValueChange);
  }
}
