import {Directive, EventEmitter, Input, OnInit, Optional, Output, Self, SkipSelf} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {addControl, defaultValidValueChangeDebounce} from './shared';
import {Subject} from 'rxjs/Subject';

@Directive({selector: `form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]`})
export class HybridForm implements OnInit {

  @Input() ngFormValidChangeDebounce = defaultValidValueChangeDebounce;

  @Output() ngFormValidChange = new EventEmitter();

  formControlValidValueDebounceStarted = new Subject();

  constructor(@Self() private self: NgForm,
              @Optional() @SkipSelf() private parent: HybridForm) {
    if(parent)
      parent.addFormGroup(self);
  }

  ngOnInit() {
    addControl(
      this.form,
      this.ngFormValidChange,
      this.formControlValidValueDebounceStarted,
      this.ngFormValidChangeDebounce);
  }

  reset(onlySelf?: boolean) {
    this.form.reset(null, {onlySelf: onlySelf});
  }

  get submitted() {
    return this.parent && this.parent.submitted || this.self.submitted;
  }

  private get form(): FormGroup {
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
