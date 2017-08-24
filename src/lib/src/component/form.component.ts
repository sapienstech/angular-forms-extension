import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'hf-form',
  template: `
    <form [formGroup]="group" (submit)="onSubmit($event)" class="hf-form" novalidate>
      <div class="hf-form__content">
        <ng-content></ng-content>
      </div>
      <div class="hf-form__buttons">
      </div>
    </form>
  `
})
export class FormComponent {
  @Input() buttons: 'ok' | 'cancel' | ['ok', 'cancel'];

  @Output() validSubmit = new EventEmitter();

  group = new FormGroup({});

  onSubmit(e) {
    if (this.group.valid) {
      this.validSubmit.emit(e);
    }
  }
}
