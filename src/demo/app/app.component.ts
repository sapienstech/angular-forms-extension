import {Component, ViewChild} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'demo-app',
  template: `
    <hf-form #form [formGroup]="form.group" 
             (validSubmit)="onSubmit($event)">
      <inner></inner>
      <hf-form-group formGroupName="foo4">
        <hf-form-group formGroupName="foo2">
          <hf-form-group formGroupName="foo3">
            <hf-form-control>
              <input formControlName="bar" [formControlValue]="value" required>
            </hf-form-control>
          </hf-form-group>
        </hf-form-group>
      </hf-form-group>

      <button>submit</button>
    </hf-form>
    {{formGroupDir.control.value | json}}
    {{formGroupDir.control.valid | json}}
  `
})
export class AppComponent {
  @ViewChild(FormGroupDirective)
  formGroupDir;

  value = 'roni';

  onValidValueChange(e) {
    console.log(e);
  }

  onSubmit(e) {
    console.log(e);
  }
}

@Component({
  selector: 'inner',
  template: `
    <hf-form-group #form2 [formGroup]="form2.group">
      <hf-form-control>
        <input formControlName="roni" required>
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
  `
})
export class InnerAppComponent {
  value = 'brachi';
}
