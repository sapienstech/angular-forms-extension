import {Component, ContentChild, Input, OnInit} from '@angular/core';
import {RequiredValidator} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'form-control',
  template: `
    <div ngClass="hf-field,{'hf-field--required': required}">
      <label class="hf-field__label">{{label}}</label>
      <span><ng-content></ng-content></span>
    </div>`
})
export class FormControlComponent implements OnInit {

  @ContentChild(RequiredValidator)
  requiredValidator: RequiredValidator;

  @Input()
  label: string;

  get required() {
    return this.requiredValidator && this.requiredValidator.required;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
