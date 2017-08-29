import {Component, ContentChild} from '@angular/core';
import {HybridForm} from '../directive/hybrid-form.directive';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'hf-form',
  template: `<ng-content></ng-content>`
})

export class HybridFormGroupComponent {
}
