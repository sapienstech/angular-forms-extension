
import {of as observableOf, Observable} from 'rxjs';

import {delay} from 'rxjs/operators';
import {
  AbstractControl, NG_ASYNC_VALIDATORS, NgControl, NgModel, ValidationErrors,
  Validator
} from "@angular/forms";
import {Component, Directive, forwardRef, Input, ViewChild} from "@angular/core";
import {AbstractFxDirective} from "./abstract-fx-form.directive";
import {FxForm} from "./fx-form.directive";
import {FxModelDirective} from "./fx-model.directive";

import {AsyncValidator} from "@angular/forms/src/directives/validators";

@Directive({
  selector: '[testAsyncValidator]',
  providers: [
    {provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => TestAsyncValidator), multi: true}
  ]
})
export class TestAsyncValidator implements AsyncValidator {

  @Input()
  delay: number;
  @Input()
  validValue: string;

  constructor() {
  }

  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    let returnValue = null;
    if(!control.value || control.value !== this.validValue) {
      returnValue = {"required": {value: "true"}};
    }
    return observableOf(returnValue).pipe(delay(this.delay));
  }
}

@Component({
  selector: 'asyncValidatorComponent',
  template: `
      <form>
        <input [(ngModel)]="value" [name]="'input'" testAsyncValidator [delay]="delay"
               [validValue]="validValue">
      </form>`
})
export class AsyncValidatorFormComponent {
  @ViewChild(FxForm) fxForm: FxForm;
  @ViewChild(NgModel) ngModel: NgModel;
  @ViewChild(FxModelDirective) fxModel: FxModelDirective;
  value = 'value';
  delay = AbstractFxDirective.defaultValidValueChangeDebounce - 1;
  validValue = "someValidValue"
}

@Component({
  selector: 'asyncValidatorFxFieldTestComponent',
  template: `
    <form>
      <fx-field label="User Name"><input [(ngModel)]="value" [name]="'input'" testAsyncValidator
                                         [delay]="delay"
                                         [validValue]="validValue"></fx-field>
    </form>`
})
export class AsyncValidatorFxFieldTestComponent {
  @ViewChild(FxForm) fxForm: FxForm;
  @ViewChild(NgModel) ngModel: NgModel;
  @ViewChild(FxModelDirective) fxModel: FxModelDirective;
  value = 'value';
  delay = AbstractFxDirective.defaultValidValueChangeDebounce - 1;
  validValue = "someValidValue"
}
