import {AfterContentInit, Component, ContentChild, Input} from '@angular/core';
import {RequiredValidator} from '@angular/forms';
import {FormControlNameDirective} from '../directive/form-control-name.directive';

@Component({
  selector: 'hf-form-control',
  template: `
    <div class="hf-field"
         [class.hf-field--required]="required" 
         [class.hf-field--invalid]="!valid" 
         [class.hf-field--valid-value-changes]="validValueChanges">
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
    this.formControlNameDirective.ngModelValid.subscribe(_ => this.validValueChanges = false);
  }

  get required() {
    return this.requiredValidator && this.requiredValidator.required;
  }

  get valid() {
    return this.formControlNameDirective &&
      (!this.formControlNameDirective.groupSubmitted && this.formControlNameDirective.pristine || this.formControlNameDirective.valid);
  }

  get errors() {
    return this.formControlNameDirective && this.formControlNameDirective.errors;
  }
}
