import {Directive, EventEmitter, Input, Optional, Output, SkipSelf} from '@angular/core';
import {FormGroup, FormGroupDirective} from '@angular/forms';

@Directive({
  selector: `[formGroupName]`,
})
export class FormGroupNameDirective {

  @Input() formGroupName: string;

  @Input() formGroup: FormGroup;

  @Output() formControlValueChange = new EventEmitter();

  constructor(@Optional() @SkipSelf() private parent: FormGroupDirective) {
  }

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(v => this.formControlValueChange.emit(v));
    if (this.parent)
      this.parent.form.addControl(this.formGroupName, this.formGroup);
  }
}
