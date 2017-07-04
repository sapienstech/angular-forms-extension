import {FormGroupNameDirective} from './form-group-name.directive';
import {AbstractControl, FormGroupDirective} from '@angular/forms';
import {EventEmitter} from '@angular/core';

export function addControl<T>(formGroupNameDirective: FormGroupNameDirective,
                           formGroupDirective: FormGroupDirective,
                           name: string,
                           control: AbstractControl,
                           eventEmitter: EventEmitter<T>) {
  let parent = formGroupNameDirective ? formGroupNameDirective.formGroup : formGroupDirective.form;
  parent.addControl(name, control);
  control.valueChanges.subscribe(v => eventEmitter.emit(v));
}
