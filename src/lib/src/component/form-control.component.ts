import {Component, ContentChild, Input, OnInit} from '@angular/core';
import {RequiredValidator} from '@angular/forms';

@Component({
  selector: 'hf-form-control',
  template: `
    <div ngClass="hf-field,{'hf-field--required': required},{'hf-field--invalid': !valid}">
      <label class="hf-field__label">{{label}}</label>
      <span class="hf-field__control">><ng-content></ng-content></span>
      <label class="hf-field__errors"></label>
    </div>`
})
export class FormControlComponent implements OnInit {

  @ContentChild(RequiredValidator)
  requiredValidator: RequiredValidator;

  @Input() label: string;

  get required() {
    return this.requiredValidator && this.requiredValidator.required;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
