import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'form-control',
  template: `<ng-content></ng-content>`
})

export class FormControlComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
