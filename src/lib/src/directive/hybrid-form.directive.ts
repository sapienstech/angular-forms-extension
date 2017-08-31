import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  SkipSelf
} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {AbstractHybridFormDirective} from './abstract-hybrid-form.directive';

@Directive({selector: `form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]`})
export class HybridForm extends AbstractHybridFormDirective implements OnInit {

  @Input() ngModelValidChangeDebounce = AbstractHybridFormDirective.defaultValidValueChangeDebounce;

  @Output('ngFormValidChange') ngModelValidChange = new EventEmitter();

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              @Self() protected self: NgForm,
              @Optional() @SkipSelf() protected parent: HybridForm) {
    super();
    if(parent)
      parent.addFormGroup(self);
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
