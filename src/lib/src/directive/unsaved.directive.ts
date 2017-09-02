import {Directive, EventEmitter, HostListener, OnInit, Optional, Output, Self} from '@angular/core';
import {ValidSubmitDirective} from './valid-submit.directive';
import {NgForm} from '@angular/forms';
import {FxForm} from './fx-form.directive';

@Directive({
  selector: '[unsaved]'
})
export class UnsavedDirective implements OnInit {

  @Output('unsaved') unsavedChange = new EventEmitter();

  unsaved: boolean;

  submitted: boolean;

  constructor(@Self() private ngForm: NgForm,
              @Self() hybridForm: FxForm,
              @Self() @Optional() private hasSubmitButton: ValidSubmitDirective) {
    if(!hasSubmitButton) {
      hybridForm.ngModelValidChange.subscribe(c => {
        this.submitted = true;
        this.unsavedParameterChange();});
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.submitted = false;
      this.unsavedParameterChange();
    });
    this.form.statusChanges.subscribe(() => this.unsavedParameterChange());
  }

  @HostListener('submit', ['$event'])
  onSubmit() {
    this.submitted = true;
    this.unsavedParameterChange();
  }

  unsavedParameterChange() {
    const unsaved =
      this.form.dirty && (!this.submitted || !this.form.valid);

    if (unsaved != this.unsaved) {
      this.unsaved = unsaved;
      this.unsavedChange.emit(this.unsaved);
    }
  }

  private get form() {
    return this.ngForm.form;
  }
}
