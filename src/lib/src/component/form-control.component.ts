import {AfterContentInit, Component, ContentChild, Input} from '@angular/core';
import {RequiredValidator} from '@angular/forms';
import {FormControlNameDirective} from '../directive/form-control-name.directive';
// "hf-field,{'hf-field--required': required},{'hf-field--invalid': !valid},{'hf-field--valid-value-changes': !validValueChanges}"
@Component({
  selector: 'hf-form-control',
  template: `
    <div [ngClass]="{'hf-field': true, 'hf-field--required': required, 'hf-field--invalid': !valid, 'hf-field--valid-value-changes': validValueChanges}">
      <label class="hf-field__label">{{label}}</label>
      <span class="hf-field__control"><ng-content></ng-content></span>
      <label *ngIf="!valid" class="hf-field__errors">{{errors|json}}</label>
    </div>`
})
export class FormControlComponent implements AfterContentInit {
  @Input() label: string;

  @ContentChild(RequiredValidator)
  requiredValidator: RequiredValidator;

  @ContentChild(FormControlNameDirective)
  formControlNameDirective: FormControlNameDirective;

  validValueChanges = false;

  ngAfterContentInit(): void {
    this.formControlNameDirective.formControlValidValueDebounceStarted.subscribe(_ => this.validValueChanges = true);
    this.formControlNameDirective.formControlValidValueChange.subscribe(_ => this.validValueChanges = false);
  }

  get required() {
    return this.requiredValidator && this.requiredValidator.required;
  }

  get valid() {
    return this.formControlNameDirective &&
      (this.formControlNameDirective.pristine || this.formControlNameDirective.valid);
  }

  get errors() {
    return this.formControlNameDirective.errors;
  }
}
