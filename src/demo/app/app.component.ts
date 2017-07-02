import {Component, ViewChild} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'demo-app',
  template: `
      <div [formGroup]="null|formGroup">
          <input formControlName="bar" [formControlValue]="value" required>
      </div>

    {{formGroupDir.control.value | json}}
  `
})
export class AppComponent {
  @ViewChild(FormGroupDirective)
  formGroupDir;

  value = 'roni';
}
