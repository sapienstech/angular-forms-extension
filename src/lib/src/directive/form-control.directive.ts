import {
  AsyncValidator,
  AsyncValidatorFn,
  ControlValueAccessor,
  FormControl,
  FormControlDirective as AngularFormControlDirective,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validator,
  ValidatorFn
} from '@angular/forms';
import {Directive, forwardRef, Inject, Optional, Self, SimpleChange} from '@angular/core';

@Directive({
  selector: `[${FormControlDirective.SELECTOR}]`, providers: [{
    provide: NgControl,
    useExisting: forwardRef(() => FormControlDirective)
  }], exportAs: 'ngForm'
})
export class FormControlDirective extends AngularFormControlDirective {
  static readonly SELECTOR = 'hfFormControl';

  /* @override */
  constructor(@Optional() @Self() @Inject(NG_VALIDATORS) validators: Array<Validator | ValidatorFn>,
              @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<AsyncValidator | AsyncValidatorFn>,
              @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]) {
    super(validators, asyncValidators, valueAccessors);
    this.form = new FormControl();
  }
}
