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
import {Directive, EventEmitter, forwardRef, Inject, Input, Optional, Output, Self, SimpleChange} from '@angular/core';

@Directive({
  selector: `[${FormControlDirective.SELECTOR}]`, providers: [{
    provide: NgControl,
    useExisting: forwardRef(() => FormControlDirective)
  }], exportAs: 'ngForm'
})
export class FormControlDirective extends AngularFormControlDirective {

  @Input('formFieldName') fieldName;

  @Input(FormControlDirective.SELECTOR) fieldValue;

  @Output(FormControlDirective.SELECTOR) fieldValueChange = new EventEmitter();

  static readonly SELECTOR = 'formFieldValue';

  /* @override */
  constructor(@Optional() @Self() @Inject(NG_VALIDATORS) validators: Array<Validator | ValidatorFn>,
              @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<AsyncValidator | AsyncValidatorFn>,
              @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]) {
    super(validators, asyncValidators, valueAccessors);
    this.form = new FormControl();
    this.ngOnChanges({form: new SimpleChange(null, this.form, true)});
  }

  ngOnInit() {
    this.form.setValue(this.fieldValue);
    this.form.valueChanges.subscribe(v => this.fieldValueChange.emit(v));
  }
}
