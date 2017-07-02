import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'form-group',
  template: `<ng-content></ng-content>`
})

export class FormGroupComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
