import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldComponent} from './form-field.component';
import {FormControlDirective} from '../directive/form-control.directive';

@Component({
  selector: 'hf-form-group',
  template: `
    <div [formGroup]="group">
      <ng-content></ng-content>
    </div>
  `
})
export class FormGroupComponent implements AfterContentInit {

  @ContentChildren(FormFieldComponent, {descendants: false})
  private formControlDirectives: QueryList<FormControlDirective>;

  group: FormGroup = new FormGroup({});


  ngAfterContentInit(): void {
    this.addControls();
  }

  private addControls() {
    this.formControlDirectives.forEach(f => this.group.addControl(f.name, f.control));
  }
}
