import {Component, ViewChild} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'demo-app',
  template: `
    <form [formGroup]="''|formGroup"
          (validSubmit)="onSubmit($event)">

      <inner></inner>

      <button>submit</button>
    </form>
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
    <hf-form-group #form [formGroup]="''|formGroup">
      <hf-form-control [label]="'Name'" class="flex-container align-items-center user-display-name-div-spec">
        <input class="user-display-name-input-spec"
               formControlName="username"
               [(formControlValue)]="userName"
               required>
      </hf-form-control>

      <hf-form-control [label]="'Display Name'" class="flex-container align-items-center user-name-div-spec">
        <input formControlName="displayname"
               [(formControlValue)]="userDisplayName"
               required>
      </hf-form-control>

      <hf-form-control [label]="'Email'" class="form-group flex-container align-items-center">
        <input type="email"
               formControlName="email"
               [(formControlValue)]="userMailAddress"
               email="">
      </hf-form-control>
    </hf-form-group>
  `
})
export class InnerAppComponent {
  userName = '';
  userDisplayName = 'userDisplayName';
  userMailAddress = 'userMailAddress';
}
