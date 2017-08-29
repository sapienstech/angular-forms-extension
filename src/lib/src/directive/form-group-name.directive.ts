import {Directive, EventEmitter, Input, OnInit, Optional, Output, Self, SkipSelf} from '@angular/core';
import {NgForm} from '@angular/forms';
import {addControl, defaultValidValueChangeDebounce} from './shared';
import {Subject} from 'rxjs/Subject';

@Directive({selector: `form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]`})
export class FormGroupNameDirective implements OnInit {

  @Input() validValueChangeDebounce = defaultValidValueChangeDebounce;

  @Output() formControlValidValueChange = new EventEmitter();

  formControlValidValueDebounceStarted = new Subject();

  constructor(@Self() private self: NgForm,
              @Optional() @SkipSelf() private parent: FormGroupNameDirective) {
    if(parent)
      parent.addFormGroup(self);
  }

  ngOnInit() {
    addControl(
      this.self.form,
      this.formControlValidValueChange,
      this.formControlValidValueDebounceStarted,
      this.validValueChangeDebounce);
  }

  get form() {
    return this.self.form;
  }

  addFormGroup(formGroup: NgForm) {
    this.self.form.addControl(formGroup.name || this.sequence, formGroup.form);
  }

  get sequence(): string {
    return this.unique++ as any;
  }

  private unique = 0;
}
