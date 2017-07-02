import {Component, ViewChild} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'demo-app',
  template: `
      <form-group [formGroup]="''|formGroup">
        <form-control>
          <input formControlName="bar" [formControlValue]="value" required>
        </form-control>
      </form-group>
      
    {{formGroupDir.control.value | json}}
    {{formGroupDir.control.valid | json}}
  `
})
export class AppComponent {
  @ViewChild(FormGroupDirective)
  formGroupDir;

  value = 'roni';
}
