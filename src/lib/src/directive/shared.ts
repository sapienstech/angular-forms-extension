import {FormGroupNameDirective} from './form-group-name.directive';
import {AbstractControl, FormGroupDirective} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import {Observer} from 'rxjs/Observer';

export function addControl<T>(formGroupNameDirective: FormGroupNameDirective,
                              formGroupDirective: FormGroupDirective,
                              name: string,
                              control: AbstractControl,
                              valueChange: EventEmitter<T>,
                              validValueChange: EventEmitter<T>,
                              validValueChangeDebounceStarted: Observer<T>,
                              validValueChangeDebounce: number) {
  let parent = formGroupNameDirective ? formGroupNameDirective.formGroup : formGroupDirective.form;
  parent.addControl(name, control);
  control.valueChanges.subscribe(v => valueChange.emit(v));
  control.valueChanges
    .subscribe(v => control.valid ? validValueChangeDebounceStarted.next(v) : null);
  control.valueChanges.debounceTime(validValueChangeDebounce)
    .subscribe(v => control.valid ? validValueChange.emit(v) : null);
}

export const defaultValidValueChangeDebounce = 400;
