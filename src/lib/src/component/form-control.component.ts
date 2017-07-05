import {Component, ContentChild, Input} from '@angular/core';
import {RequiredValidator} from '@angular/forms';
import {FormControlNameDirective} from '../directive/form-control-name.directive';

@Component({
  selector: 'hf-form-control',
  template: `
    <div ngClass="hf-field,{'hf-field--required': required},{'hf-field--invalid': !valid}">
      <label class="hf-field__label">{{label}}</label>
      <span class="hf-field__control"><ng-content></ng-content></span>
      <label *ngIf="!valid" class="hf-field__errors">{{errors|json}}</label>
    </div>`
})
export class FormControlComponent {

  @Input() label: string;

  @ContentChild(RequiredValidator)
  requiredValidator: RequiredValidator;

  @ContentChild(FormControlNameDirective)
  formControlNameDirective: FormControlNameDirective;

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
