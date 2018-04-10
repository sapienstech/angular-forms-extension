import {Directive, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {FormControl, NgModel} from '@angular/forms';
import {FxForm} from './fx-form.directive';
import {AbstractFxDirective} from './abstract-fx-form.directive';
import {SubscriberService} from '../service/subscriber.service';

@Directive({selector: `[ngModel]`, providers: [SubscriberService]})
export class FxModelDirective extends AbstractFxDirective implements OnInit, OnDestroy {

  constructor(protected subscriber: SubscriberService,
              @Self() protected self: NgModel,
              @Optional() protected parent: FxForm) {
    super(subscriber);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  get value() {
    return this.control.value;
  }

  get valid() {
    return this.control.valid;
  }

  get pristine() {
    return this.control.pristine;
  }

  get groupSubmitted() {
    return this.parent && this.parent.submitted;
  }

  get errors() {
    return this.control.errors;
  }

  get name() {
    return this.self.name;
  }

  protected get control(): FormControl {
    return this.self.control;
  }
}
