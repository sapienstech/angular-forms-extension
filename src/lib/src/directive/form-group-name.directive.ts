import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  SkipSelf
} from '@angular/core';
import {FormGroup, FormGroupDirective} from '@angular/forms';
import {addControl, addToParent, defaultValidValueChangeDebounce, id} from './shared';
import {Subject} from 'rxjs/Subject';

@Directive({selector: `[formGroup]`})
export class FormGroupNameDirective implements OnInit {

  @Input() validValueChangeDebounce = defaultValidValueChangeDebounce;

  @Output() formControlValueChange = new EventEmitter();

  @Output() formControlValidValueChange = new EventEmitter();

  formControlValidValueDebounceStarted = new Subject();

  private _formGroup = new FormGroup({});

  constructor(private cd: ChangeDetectorRef,
              @Self() private _self: FormGroupDirective,
              @Optional() @SkipSelf() private parent: FormGroupDirective) {
    _self.form = this.formGroup;
    if(parent)
      addToParent(parent.form, id(), _self.form);
  }

  @Input() set formGroup(formGroup: FormGroup) {
    debugger;
    this._self.form = this.formGroup
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  ngOnInit() {

    addControl(this.cd,
      this._self.form,
      this.formControlValueChange,
      this.formControlValidValueChange,
      this.formControlValidValueDebounceStarted,
      this.validValueChangeDebounce);
    console.log(this._self.form.value);
  }


  get self(): FormGroupDirective {
    return this._self;
  }
}
