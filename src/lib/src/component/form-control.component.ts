import {Component, ContentChild, OnInit} from '@angular/core';
import {RequiredValidator} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'form-control',
  template: `<ng-content></ng-content> <span *ngIf="required">*</span>`
})
export class FormControlComponent implements OnInit {

  @ContentChild(RequiredValidator)
  requiredValidator: RequiredValidator;

  get required() {
    return this.requiredValidator && this.requiredValidator.required;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
