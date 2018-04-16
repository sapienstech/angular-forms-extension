import {
  AbstractControl, NG_ASYNC_VALIDATORS, NgControl, NgModel, ValidationErrors,
  Validator
} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Component, Directive, forwardRef, Input, ViewChild} from "@angular/core";
import {AbstractFxDirective} from "./abstract-fx-form.directive";
import {FxForm} from "./fx-form.directive";
import {FxModelDirective} from "./fx-model.directive";
import "rxjs/add/operator/delay";

@Directive({
  selector: '[testAsyncValidator]',
  providers: [
    {provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => TestAsyncValidator), multi: true}
  ]
})
export class TestAsyncValidator implements Validator {

  @Input()
  delay: number;
  @Input()
  validValue: string;

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | any {
    let returnValue = null;
    if(!control.value || control.value !== this.validValue) {
      returnValue = {"testAsyncValidator": {value: "true"}};
    }
    return Observable.of(returnValue).delay(this.delay);
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
