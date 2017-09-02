import {Directive, OnDestroy, OnInit, Self} from '@angular/core';
import {FormControl, NgModel} from '@angular/forms';
import {FxForm} from './fx-form.directive';
import {AbstractFxDirective} from './abstract-fx-form.directive';

@Directive({selector: `[ngModel]`})
export class FxModelDirective extends AbstractFxDirective implements OnInit, OnDestroy {

  constructor(@Self() protected self: NgModel,
              protected parent: FxForm) {
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
