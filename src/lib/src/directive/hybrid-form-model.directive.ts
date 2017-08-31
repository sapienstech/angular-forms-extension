import {Directive, OnDestroy, OnInit, Self} from '@angular/core';
import {FormControl, NgModel} from '@angular/forms';
import {HybridForm} from './hybrid-form.directive';
import {AbstractHybridFormDirective} from './abstract-hybrid-form.directive';

@Directive({selector: `[ngModel]`})
export class HybridFormModelDirective extends AbstractHybridFormDirective implements OnInit, OnDestroy {

  constructor(@Self() protected self: NgModel,
              protected parent: HybridForm) {
    super();
  }

  get valid() {
    return this.control.valid;
  }

  get pristine() {
    return this.control.pristine;
  }

  get groupSubmitted() {
    return this.parent.submitted;
  }

  get errors() {
    return this.control.errors;
  }

  get name() {
    return this.self.name;
  }

  protected get control() {
    return this.self.control;
  }
}
