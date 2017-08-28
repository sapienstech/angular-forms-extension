import {Component, ViewChild} from '@angular/core';
import {FormGroupNameDirective} from 'quickstart-lib';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'demo-app',
  template: `
    <form [formGroup]
          (validSubmit)="onSubmit($event)"
          (unsaved)="onUnsavedChange($event)"
    >
      <hf-form-control [label]="'Email'" class="form-group flex-container align-items-center">
        <input type="email"
               [formControl]
               [(formControlValue)]="baboo"
               email="">
      </hf-form-control>
      <!--<inner></inner>-->

      <button>submit</button>
    </form>
    {{formGroupDir.self.form.value | json}}
    {{formGroupDir.self.form.valid | json}}
    
    <br>
    {{unsaved}}
  `
})
export class AppComponent {
  baboo;
  unsaved = false;
  @ViewChild(FormGroupNameDirective)
  formGroupDir;
  form = new FormGroup({});
  value = 'roni';

  onValidValueChange(e) {
    console.log(e);
  }

  onSubmit(e) {
    console.log(e);
    this.form.registerControl()
  }

  onUnsavedChange(e) {
    this.unsaved = e;
    console.log(e);
  }
}

//
// @Component({
//   selector: 'inner',
//   template: `
//     <hf-form-group [formGroup]="form">
//       <hf-form-control [label]="'Name'" class="flex-container align-items-center user-display-name-div-spec">
//         <input class="user-display-name-input-spec"
//                [formControl]
//                [(formControlValue)]="userName"
//                required>
//       </hf-form-control>
//
//       <hf-form-control [label]="'Display Name'" class="flex-container align-items-center user-name-div-spec">
//         <input [formControl]
//                [(formControlValue)]="userDisplayName"
//                required>
//       </hf-form-control>
//
//       <hf-form-control [label]="'Email'" class="form-group flex-container align-items-center">
//         <input type="email"
//                [formControl]
//                [(formControlValue)]="userMailAddress"
//                email="">
//       </hf-form-control>
//     </hf-form-group>
//   `
// })
// export class InnerAppComponent {
//   form = new FormGroup({});
//
//   ngOnInit() {
//     setTimeout(() => {
//       this.userName = 'ff';
//       this.userDisplayName = 'userDisplayName';
//       this.userMailAddress = 'fsdjkl@';
//     }, 5);
//   }
//
//   userName;
//   userDisplayName ;
//   userMailAddress ;
// }
