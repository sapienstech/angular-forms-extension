import {
  ChangeDetectorRef, Directive, EventEmitter, Input, OnInit, Optional, Output, Self,
  SkipSelf
} from '@angular/core';
import {FormGroup, FormGroupDirective} from '@angular/forms';
import {addControl, defaultValidValueChangeDebounce} from './shared';
import {Subject} from 'rxjs/Subject';

@Directive({selector: `[formGroupName],[formGroup]`})
export class FormGroupNameDirective implements OnInit {

  @Input() formGroupName: string;

  @Input() validValueChangeDebounce = defaultValidValueChangeDebounce;

  @Output() formControlValueChange = new EventEmitter();

  @Output() formControlValidValueChange = new EventEmitter();

  formControlValidValueDebounceStarted = new Subject();

  formGroup: FormGroup = new FormGroup({});

  constructor(@Optional() @Self() private self: FormGroupDirective,
              @Optional() @SkipSelf() private formGroupDirective: FormGroupDirective,
              @Optional() @SkipSelf() private formGroupNameDirective: FormGroupNameDirective, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if(!this.formGroupName) this.formGroup = this.self.form;
    this.cd.detach();

    addControl(this.formGroupNameDirective,
      this.formGroupDirective,
      this.formGroupName,
      this.formGroup,
      this.formControlValueChange,
      this.formControlValidValueChange,
      this.formControlValidValueDebounceStarted,
      this.validValueChangeDebounce);
    this.cd.reattach();

    this.cd.markForCheck();
  }
}
