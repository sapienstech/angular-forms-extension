import {Directive, EventEmitter, Input, Optional, Output, SkipSelf} from '@angular/core';
import {FormControl, FormGroupDirective} from '@angular/forms';
import {FormGroupNameDirective} from './form-group.directive';

@Directive({
  selector: `[formControlName]`,
})
export class FormControlNameDirective {

  @Input() formControlName;

  @Input() formControlValue;

  @Output() formControlValueChange = new EventEmitter();

  formControl = new FormControl();

  constructor(@SkipSelf() private root: FormGroupDirective, @Optional() @SkipSelf() private parent: FormGroupNameDirective) {
  }

  ngOnInit() {
    let parentFormGroup = this.parent ? this.parent.formGroup : this.root.form;
    this.formControl.setValue(this.formControlValue);
    this.formControl.valueChanges.subscribe(v => this.formControlValueChange.emit(v));
    parentFormGroup.addControl(this.formControlName, this.formControl);
  }
}
