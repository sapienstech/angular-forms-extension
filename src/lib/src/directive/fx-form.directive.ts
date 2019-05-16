import {Directive, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Renderer2, Self, SkipSelf} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {AbstractFxDirective} from './abstract-fx-form.directive';
import {SubscriberService} from '../service/subscriber.service';
import {Observable} from 'rxjs';

@Directive({
    selector: `form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]`,
    providers: [SubscriberService],
    inputs: AbstractFxDirective.INPUTS,
    outputs: AbstractFxDirective.OUTPUTS
  }
)
export class FxForm extends AbstractFxDirective implements OnInit {

  private unique = 0;

  constructor(protected subscriber: SubscriberService,
              private el: ElementRef,
              private renderer: Renderer2,
              @Self() protected self: NgForm,
              @Optional() @SkipSelf() protected parent: FxForm) {
    super(subscriber);
    if (parent) {
      parent.addFormGroup(self);
    }
  }

  @Input()
  set ngFormValidChangeDebounce(value) {
    this.ngModelValidChangeDebounce = value;
  }

  @Output()
  get ngFormValidChange(): EventEmitter<any> {
    return this.ngModelValidChange;
  }

  set ngFormValidChange(value) {
    this.ngModelValidChange = value;
  }

  get ngFormValidChangeDebounce() {
    return this.ngModelValidChangeDebounce;
  }

  get submitted() {
    return !!(this.parent && this.parent.submitted || this.self.submitted);
  }

  ngOnInit() {
    super.ngOnInit();
    this.renderer.setAttribute(this.el.nativeElement, 'novalidate', 'novalidate');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  reset(onlySelf?: boolean) {
    this.control.reset(null, {onlySelf: onlySelf});
  }

  protected get control(): FormGroup {
    return this.self.form;
  }

  private get sequence(): string {
    return this.unique++ as any;
  }

  private addFormGroup(formGroup: NgForm) {
    this.self.form.addControl(formGroup.name || this.sequence, formGroup.form);
  }

  protected get observable(): Observable<any> {
    return this.control.valueChanges;
  }
}
