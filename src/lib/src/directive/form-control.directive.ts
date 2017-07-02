import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroupDirective} from '@angular/forms';

@Directive({
  selector: `[formControlName]`,
})
export class FormControlNameDirective {

  @Input() formControlName;

  @Input() formControlValue;

  @Output() formControlValueChange = new EventEmitter();

  formControl = new FormControl();

  constructor(private formGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.formControl.setValue(this.formControlValue);
    this.formControl.valueChanges.subscribe(v => this.formControlValueChange.emit(v));
    this.formGroup.form.addControl(this.formControlName, this.formControl);
  }
}
