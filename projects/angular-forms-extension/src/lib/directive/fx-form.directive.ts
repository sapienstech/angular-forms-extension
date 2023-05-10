import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Renderer2, Self, SkipSelf} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {AbstractFxDirective} from './abstract-fx-form.directive';
import {SubscriberService} from '../service/subscriber.service';
import {Observable} from 'rxjs';

@Directive({selector: `form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]`, providers: [SubscriberService]})
export class FxForm extends AbstractFxDirective implements OnInit, OnDestroy {

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

  get ngFormValidChangeDebounce() {
    return this.ngModelValidChangeDebounce;
  }

  @Output()
  get ngFormValidChange(): EventEmitter<any> {
    return this.ngModelValidChange;
  }

  set ngFormValidChange(value) {
    this.ngModelValidChange = value;
  }


  get submitted():any {
    return !!(this.parent && this.parent.submitted || this.self.submitted);
  }

  protected get control(): FormGroup {
    return this.self.form;
  }

  private get sequence(): string {
    return this.unique++ as any;
  }

  protected get observable(): Observable<any> {
    return this.control.valueChanges;
  }



  ngOnInit() {
    super.operateWithAsyncValidator();
    this.renderer.setAttribute(this.el.nativeElement, 'novalidate', 'novalidate');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  reset(onlySelf?: boolean) {
    this.control.reset(null, {onlySelf});
  }

  private addFormGroup(formGroup: NgForm) {
    this.self.form.addControl(<string>formGroup.name || this.sequence, formGroup.form);
  }
}
