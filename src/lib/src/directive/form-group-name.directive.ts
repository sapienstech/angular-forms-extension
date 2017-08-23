import {Directive, EventEmitter, Input, OnInit, Optional, Output, SkipSelf} from '@angular/core';
import {FormGroup, FormGroupDirective} from '@angular/forms';
import {addControl, defaultValidValueChangeDebounce} from './shared';
import {Subject} from 'rxjs/Subject';

@Directive({selector: `[formGroupName]`})
export class FormGroupNameDirective implements OnInit {

  @Input() formGroupName: string;

  @Input() validValueChangeDebounce = defaultValidValueChangeDebounce;

  @Output() formControlValueChange = new EventEmitter();

  @Output() formControlValidValueChange = new EventEmitter();

  formControlValidValueDebounceStarted = new Subject();

  formGroup: FormGroup = new FormGroup({});

  constructor(@SkipSelf() private formGroupDirective: FormGroupDirective,
              @Optional() @SkipSelf() private formGroupNameDirective: FormGroupNameDirective) {
  }

  ngOnInit() {
    addControl(this.formGroupNameDirective,
      this.formGroupDirective,
      this.formGroupName,
      this.formGroup,
      this.formControlValueChange,
      this.formControlValidValueChange,
      this.formControlValidValueDebounceStarted,
      this.validValueChangeDebounce);
  }
}
