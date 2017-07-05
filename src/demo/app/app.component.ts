import {Component, ViewChild} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'demo-app',
  template: `
    <form [formGroup]="''|formGroup">
      <hf-form-group formGroupName="foo1">
        <hf-form-group formGroupName="foo2">
          <hf-form-control>
            <input formControlName="bar" [formControlValue]="value">
          </hf-form-control>
          <hf-form-group formGroupName="foo3">
            <hf-form-control>
              <input formControlName="bar" [formControlValue]="value" required>
            </hf-form-control>
            <hf-form-control>
              <input formControlName="bar1" [formControlValue]="value" required>
            </hf-form-control>
            <hf-form-control>
              <input formControlName="bar2" [formControlValue]="value" required>
            </hf-form-control>
            <hf-form-control>
              <input formControlName="bar3" [formControlValue]="value" required>
            </hf-form-control>
          </hf-form-group>
        </hf-form-group>
      </hf-form-group>
      <hf-form-group formGroupName="foo4">
        <hf-form-group formGroupName="foo2">
          <hf-form-group formGroupName="foo3">
            <hf-form-control>
              <input formControlName="bar" [formControlValue]="value" required>
            </hf-form-control>
          </hf-form-group>
        </hf-form-group>
      </hf-form-group>
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
