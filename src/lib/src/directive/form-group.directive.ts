import {Directive, EventEmitter, Input, Optional, Output, SkipSelf} from '@angular/core';
import {FormGroup, FormGroupDirective} from '@angular/forms';

@Directive({
  selector: `[formGroupName]`,
})
export class FormGroupNameDirective {

  @Input() formGroupName: string;

  @Output() formControlValueChange = new EventEmitter();

  formGroup: FormGroup = new FormGroup({});

  constructor(@SkipSelf() private root: FormGroupDirective,
              @Optional() @SkipSelf() private parent: FormGroupNameDirective) {
  }

  ngOnInit() {
    let parentFormGroup = this.parent ? this.parent.formGroup : this.root.form;
    this.formGroup.valueChanges.subscribe(v => this.formControlValueChange.emit(v));
    parentFormGroup.addControl(this.formGroupName, this.formGroup);
  }
}
