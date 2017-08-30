import {AfterContentInit, Component, ContentChild, Input} from '@angular/core';
import {RequiredValidator} from '@angular/forms';
import {HybridFormModelDirective} from '../directive/hybrid-form-model.directive';
import {ErrorMessageService} from '../service/error-messages.service';

@Component({
  selector: 'hf-field',
  template: `
    <div class="hf-field"
         [class.hf-field--required]="required" 
         [class.hf-field--invalid]="!valid" 
         [class.hf-field--valid-value-changes]="validValueChanges">
      <label class="hf-field__label">{{label}}</label>
      <span class="hf-field__control"><ng-content></ng-content></span>
      <span *ngIf="!valid" class="hf-field__errors">
        <label *ngFor="let error of errors" class="hf-field__error">{{error}}</label>
      </span>
    </div>`
})
export class HybridFormFieldComponent implements AfterContentInit {
  @Input() label: string;

  @ContentChild(RequiredValidator)
  requiredValidator: RequiredValidator;

  @ContentChild(HybridFormModelDirective)
  formModel: HybridFormModelDirective;

  validValueChanges = false;

  constructor(private messageService: ErrorMessageService) {
  }

  ngAfterContentInit(): void {
    this.assertNgModelExists();

    this.formModel.formControlValidValueDebounceStarted.subscribe(_ => this.validValueChanges = true);
    this.formModel.ngModelValidChange.subscribe(_ => this.validValueChanges = false);
  }
  get required() {
    return this.requiredValidator && this.requiredValidator.required;
  }

  get valid() {
    return this.formModel &&
      (!this.formModel.groupSubmitted && this.formModel.pristine || this.formModel.valid);
  }

  get errors() {
    const errors = this.formModel.errors;
    return Object.keys(errors).map(error =>
      this.messageService.getErrorMessage(this.label, error, errors[error]));
  }

  private assertNgModelExists() {
    if (!this.formModel)
      throw new Error('NgModel is missing from an "hf-field". Did you forget to add [ngModel]');
  }
}
