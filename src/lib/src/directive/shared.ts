import {FormGroupNameDirective} from './form-group-name.directive';
import {AbstractControl, FormGroupDirective} from '@angular/forms';
import {EventEmitter} from '@angular/core';

export function addControl<T>(formGroupNameDirective: FormGroupNameDirective,
                           formGroupDirective: FormGroupDirective,
                           name: string,
                           control: AbstractControl,
                           valueChange: EventEmitter<T>,
                           validValueChange: EventEmitter<T>) {
  let parent = formGroupNameDirective ? formGroupNameDirective.formGroup : formGroupDirective.form;
  parent.addControl(name, control);
  control.valueChanges.subscribe(v => valueChange.emit(v));
  control.valueChanges.subscribe(v => control.valid ? validValueChange.emit(v) : null);
}
