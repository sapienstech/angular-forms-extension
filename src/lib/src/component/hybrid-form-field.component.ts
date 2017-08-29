import {AfterContentInit, Component, ContentChild, Input} from '@angular/core';
import {RequiredValidator} from '@angular/forms';
import {HybridFormModelDirective} from '../directive/hybrid-form-model.directive';

@Component({
  selector: 'hf-field',
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
export class HybridFormFieldComponent implements AfterContentInit {
  @Input() label: string;

  @ContentChild(RequiredValidator)
  requiredValidator: RequiredValidator;

  @ContentChild(HybridFormModelDirective)
  formControlNameDirective: HybridFormModelDirective;

  validValueChanges = false;

  ngAfterContentInit(): void {
    this.formControlNameDirective.formControlValidValueDebounceStarted.subscribe(_ => this.validValueChanges = true);
    this.formControlNameDirective.ngModelValidChange.subscribe(_ => this.validValueChanges = false);
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
