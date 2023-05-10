import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LabelnputRelativeDisplayType} from "angular-forms-extension";


@Component({
  selector: 'demo-app',
  template: `

    <form #ngForm="ngForm" (validSubmit)="onSubmit($event)" (unsaved)="onUnsavedChange($event)">
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
  @ViewChild(NgForm) ngForm!: NgForm;

  onValidValueChange(e: any) {
    console.log(e);
  }

  onSubmit(e: any) {
    console.log(e);
  }

  onUnsavedChange(e: any) {
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
                [labelWidthPercentage]="30" [labelStyles]="{'font-size': '16px', color: 'blue', 'font-weight': '600'}"
                [inputStyles]="{'font-size': '16px', color: 'red', 'font-weight': '300'}">
        <input class="user-display-name-input-spec"
               [name]="'username'"
               [(ngModel)]="userName"
               required>
      </fx-field>

      <fx-field [label]="'Display Name'" class="flex-container align-items-center user-name-div-spec"
                [icon]="'icon-class'"
                [labelRelativePos]=labelPos
                [labelWidthPercentage]="30"
                [tooltip]="'tooltip text'" [errorMsgStyles]="styleObj">
        <input [name]="'display'"
               minlength="5"
               [(ngModel)]="userDisplayName"
               required>
      </fx-field>

      <fx-field [label]="'Email'" class="form-group flex-container align-items-center"
                [icon]="'icon-class'"
                [labelRelativePos]=labelPos
                [labelWidthPercentage]="30">
        <input type="email"
               [name]="'email'"
               [(ngModel)]="userMailAddress"
               email="">
      </fx-field>
      <fx-field [label]="'Email'"><label>HELLO WORLD!</label></fx-field>
      <fx-field [label]="'Phone'" [inputStyles]="{'color': 'red'}" [labelWidthPercentage]="0">
        <input type="text" [name]="'Phone'" [(ngModel)]="phoneNumber">
      </fx-field>
    </form>
  `
})
export class InnerAppComponent implements OnInit {
  userName: string = "";
  userDisplayName: string = "";
  userMailAddress: string = "";
  labelPos!: LabelnputRelativeDisplayType;
  phoneNumber: number = 0;
  styleObj: any = undefined;

  ngOnInit() {
    setTimeout(() => {
      this.userName = 'ff';
      this.userDisplayName = 'userDisplayName';
      this.userMailAddress = 'fsdjkl@';
      this.labelPos = LabelnputRelativeDisplayType.LABEL_ON_RIGHT;
      this.phoneNumber = 987456321;
      this.styleObj = {
        'color': 'red'
      }

    }, 5);
  }

}
