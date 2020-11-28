import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LabelnputRelativeDisplayType} from 'quickstart-lib';

@Component({
  selector: 'demo-app',
  template: `
    <form ngForm (validSubmit)="onSubmit($event)" (unsaved)="onUnsavedChange($event)">
      <inner></inner>
      {{ngForm.form.value | json}}
      <button>submit</button>
    </form>
    <br>
    {{unsaved}}
  `
})
export class AppComponent {
  unsaved = false;
  value = 'roni';
  @ViewChild(NgForm) ngForm: NgForm;
  onValidValueChange(e) {
    console.log(e);
  }

  onSubmit(e) {
    console.log(e);
  }

  onUnsavedChange(e) {
    this.unsaved = e;
    console.log(e);
  }
}


@Component({
  selector: 'inner',
  template: `
    <form>
      <fx-field [label]="'Name'" class="flex-container align-items-center user-display-name-div-spec" 
                [icon]="'icon-class'"
                [labelRelativePos]=labelPos
                [labelWidthPercentage]="'30'">
        <input class="user-display-name-input-spec"
               [name]="'username'"
               [(ngModel)]="userName"
               required>
      </fx-field>

      <fx-field [label]="'Display Name'" class="flex-container align-items-center user-name-div-spec" 
                [icon]="'icon-class'"
                [labelRelativePos]=labelPos
                [labelWidthPercentage]="'30'"
                [tooltip]="'tooltip text'" [fontSize]="14" [fontWeight]="300" 
                [inputColor]="'green'" [labelColor]="'red'">
        <input [name]="'display'"
               minlength="5"
               [(ngModel)]="userDisplayName"
               required>
      </fx-field>

      <fx-field [label]="'Email'" class="form-group flex-container align-items-center" 
                [icon]="'icon-class'"
                [labelRelativePos]=labelPos
                [labelWidthPercentage]="'30'">
        <input type="email"
               [name]="'email'"
               [(ngModel)]="userMailAddress"
               email="">
      </fx-field>
      <fx-field [label]="'Email'"><label>HELLO WORLD!</label></fx-field>
      <fx-field [setInputWidthOnly]="20">
          <input type="text" [name]="'Phone'" [(ngModel)]="phoneNumber">
      </fx-field>
    </form>
  `
})
export class InnerAppComponent {
  ngOnInit() {
    setTimeout(() => {
      this.userName = 'ff';
      this.userDisplayName = 'userDisplayName';
      this.userMailAddress = 'fsdjkl@';
      this.labelPos = LabelnputRelativeDisplayType.LABEL_ON_RIGHT;
      this.phoneNumber = 987456321;

    }, 5);
  }
  userName;
  userDisplayName;
  userMailAddress;
  labelPos;
  phoneNumber;

}
