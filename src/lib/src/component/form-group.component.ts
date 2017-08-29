import {Component, ContentChild} from '@angular/core';
import {FormGroupNameDirective} from '../directive/form-group-name.directive';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'hf-form-group',
  template: `<ng-content></ng-content>`
})

export class FormGroupComponent {
}
