import {AfterContentInit, Component, ContentChild, Input} from '@angular/core';
import {RequiredValidator} from '@angular/forms';
import {FxModelDirective} from '../directive/fx-model.directive';
import {FormValidationMessageService} from '../service/form-validation-message.service';

@Component({
  selector: 'fx-field',
  template: `
    <div class="fx-field"
         [class.fx-field--required]="required" 
         [class.fx-field--invalid]="!valid" 
         [class.fx-field--valid-value-changes]="validValueChanges">
      <label class="fx-field__label">{{label}}</label>
      <span class="fx-field__control"><ng-content></ng-content></span>
      <span *ngIf="!valid" class="fx-field__errors">
        <label *ngFor="let error of errors" class="fx-field__error">{{error}}</label>
      </span>
    </div>`
})
export class FieldComponent implements AfterContentInit {
  @Input() label: string;

  @ContentChild(RequiredValidator)
  private requiredValidator: RequiredValidator;

  @ContentChild(FxModelDirective)
  private formModel: FxModelDirective;

  private validValueChanges = false;

  constructor(private messageService: FormValidationMessageService) {
  }

  ngAfterContentInit(): void {
    this.assertNgModelExists();

    this.formModel.ngModelValidValueDebounceStarted.subscribe(_ => this.validValueChanges = true);
    this.formModel.ngModelValidChange.subscribe(_ => this.validValueChanges = false);
  }

  get value() {
    return this.formModel && this.formModel.value;
  }

  private get required() {
    return this.requiredValidator && this.requiredValidator.required;
  }

  private get valid() {
    return this.formModel &&
      (!this.formModel.groupSubmitted && this.formModel.pristine || this.formModel.valid);
  }

  private get errors() {
    const errors = this.formModel.errors;
    return Object.keys(errors).map(error =>
      this.messageService.getErrorMessage(this.label, error, errors[error]));
  }

  private assertNgModelExists() {
    if (!this.formModel)
      throw new Error('NgModel is missing from an "fx-field". Did you forget to add [ngModel]');
  }
}
