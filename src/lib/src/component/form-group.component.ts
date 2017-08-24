import {Component, ContentChild} from '@angular/core';
import {FormGroupNameDirective} from '../directive/form-group-name.directive';

@Component({
  selector: 'hf-form-group',
  template: `<ng-content></ng-content>`
})

export class FormGroupComponent {
  @ContentChild(FormGroupNameDirective)
  formGroupNameDirective: FormGroupNameDirective;

  get group() {
    return this.formGroupNameDirective.formGroup;
  }
}
