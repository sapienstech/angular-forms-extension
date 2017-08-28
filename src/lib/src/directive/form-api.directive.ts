import {Directive, Self} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import {FormGroupNameDirective} from './form-group-name.directive';

@Directive({selector: `[formGroupName],[formGroup]`})
export class FormApiDirective {

  reset() {
    this.form.reset();
  }

  markAsPristine() {
    this.form.markAsPristine();
  }

  constructor(@Self() private formGroupDirective: FormGroupDirective,
              @Self() private formGroupNameDirective: FormGroupNameDirective) {
  }

  private get form() {
    return this.formGroupDirective && this.formGroupDirective.form || this.formGroupNameDirective && this.formGroupNameDirective.formGroup;
  }
}
