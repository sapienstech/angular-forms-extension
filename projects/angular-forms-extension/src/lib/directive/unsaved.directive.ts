import {Directive, EventEmitter, HostListener, OnDestroy, OnInit, Optional, Output, Self} from '@angular/core';
import {ValidSubmitDirective} from './valid-submit.directive';
import {NgForm} from '@angular/forms';
import {FxForm} from './fx-form.directive';
import {SubscriberService} from '../service/subscriber.service';

@Directive({
  selector: '[unsaved]',
  providers: [SubscriberService]
})
export class UnsavedDirective implements OnInit, OnDestroy {

  @Output('unsaved') unsavedChange = new EventEmitter();

  unsaved: boolean;

  submitted: boolean;

  constructor(private subscriber: SubscriberService,
              @Self() private ngForm: NgForm,
              @Self() hybridForm: FxForm,
              @Self() @Optional() private hasSubmitButton: ValidSubmitDirective) {
    if(!hasSubmitButton) {
      this.subscriber.subscribe(hybridForm.ngModelValidChange, () => {
        this.submitted = true;
        this.unsavedParameterChange();});
    }
  }

  ngOnInit(): void {
    this.subscriber.subscribe(this.form.valueChanges, () => {
      this.submitted = false;
      this.unsavedParameterChange();
    });

    this.subscriber.subscribe(this.form.statusChanges, () => this.unsavedParameterChange());
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
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
