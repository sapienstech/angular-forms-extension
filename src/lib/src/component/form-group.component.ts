import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'form-group',
  template: `<ng-content></ng-content>`
})

export class FormGroupComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
