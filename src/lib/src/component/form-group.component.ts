import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'hf-form-group',
  template: `<ng-content></ng-content>`
})

export class FormGroupComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
