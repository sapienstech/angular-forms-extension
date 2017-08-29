import {AbstractControl} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import {Observer} from 'rxjs/Observer';

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
