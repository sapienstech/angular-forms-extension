import {AbstractControl, FormGroup, FormGroupDirective} from '@angular/forms';
import {ChangeDetectorRef, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import {Observer} from 'rxjs/Observer';
import {FormGroupNameDirective} from './form-group-name.directive';

export const defaultValidValueChangeDebounce = 400;

export function addControl<T>(control: AbstractControl,
                              validValueChange: EventEmitter<T>,
                              validValueChangeDebounceStarted: Observer<T>,
                              validValueChangeDebounce: number) {
    control.valueChanges
      .subscribe(v => control.valid ? validValueChangeDebounceStarted.next(v) : null);
    control.valueChanges.debounceTime(validValueChangeDebounce)
      .subscribe(v => control.valid ? validValueChange.emit(v) : null);
}

function assertNoNameConflicts(parent: FormGroup, name: string) {
  if (parent.get(name)) throw new Error(`A control of named: '${name}' already exists on parent: ${JSON.stringify(parent.value)}. Perhaps you did not name your group or control?`);
}

