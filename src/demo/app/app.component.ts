import {Component, ViewChild} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'demo-app',
  template: `
    <form [formGroup]="''|formGroup">
      <form-group formGroupName="foo1">
        <form-group formGroupName="foo2">
          <form-control>
            <input formControlName="bar" [formControlValue]="value">
          </form-control>
          <form-group formGroupName="foo3">
            <form-control>
              <input formControlName="bar" [formControlValue]="value" required>
            </form-control>
            <form-control>
              <input formControlName="bar1" [formControlValue]="value" required>
            </form-control>
            <form-control>
              <input formControlName="bar2" [formControlValue]="value" required>
            </form-control>
            <form-control>
              <input formControlName="bar3" [formControlValue]="value" required>
            </form-control>
          </form-group>
        </form-group>
      </form-group>
      <form-group formGroupName="foo4">
        <form-group formGroupName="foo2">
          <form-group formGroupName="foo3">
            <form-control>
              <input formControlName="bar" [formControlValue]="value" required>
            </form-control>
          </form-group>
        </form-group>
      </form-group>
    </form>
      
    {{formGroupDir.control.value | json}}
    {{formGroupDir.control.valid | json}}
  `
})
export class AppComponent {
  @ViewChild(FormGroupDirective)
  formGroupDir;

  value = 'roni';
}
