import {Directive, ElementRef, Input, OnInit, Optional, Output, Renderer2, Self, SkipSelf} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AbstractFxDirective} from './abstract-fx-form.directive';

@Directive({selector: `form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]`})
export class FxForm extends AbstractFxDirective implements OnInit {

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              @Self() protected self: NgForm,
              @Optional() @SkipSelf() protected parent: FxForm) {
    super();
    if(parent)
      parent.addFormGroup(self);
  }

  @Input()
  set ngFormValidChangeDebounce(value) {
    this.ngModelValidChangeDebounce = value;
  }

  @Output()
  get ngFormValidChange() {
    return this.ngModelValidChange;
  }

  set ngFormValidChange(value) {
    this.ngModelValidChange = value;
  }

  get ngFormValidChangeDebounce() {
    return this.ngModelValidChangeDebounce;
  }

  ngOnInit() {
    super.ngOnInit();
    this.renderer.setAttribute(this.el.nativeElement, 'novalidate', 'novalidate');
  }

  reset(onlySelf?: boolean) {
    this.control.reset(null, {onlySelf: onlySelf});
  }

  get submitted() {
    return this.parent && this.parent.submitted || this.self.submitted;
  }

  protected get control() {
    return this.self.form;
  }

  private get sequence(): string {
    return this.unique++ as any;
  }

  private addFormGroup(formGroup: NgForm) {
    this.self.form.addControl(formGroup.name || this.sequence, formGroup.form);
  }

  private unique = 0;
}
