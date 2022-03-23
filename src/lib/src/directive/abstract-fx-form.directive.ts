import {debounceTime, filter, map, switchMap, take} from 'rxjs/operators';
import {AbstractControl} from '@angular/forms';
import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';


import {SubscriberService} from '../service/subscriber.service';
import {Observable} from 'rxjs';

@Directive()
export abstract class AbstractFxDirective implements OnInit, OnDestroy {

  static readonly defaultValidValueChangeDebounce = 400;

  static readonly VALID = 'VALID';

  @Input() ngModelValidChangeDebounce = AbstractFxDirective.defaultValidValueChangeDebounce;

  @Output() ngModelValidChange = new EventEmitter();

  constructor(protected subscriber: SubscriberService) {
  }

  ngOnInit() {
    this.control.valueChanges // before ngOnInit and all of the other init lifecycles, asyncValidator is not populated in the control
      .pipe(take(1))          // we need to register only once in order to know if there is an asyncValidator
      .subscribe(() => {
        if (this.control.asyncValidator) {
          this.operateWithAsyncValidator();
        } else {
          this.operateWithSyncValidator();
        }
      });
  }

  // for sync validator
  // valueChange --> statusChange --> update
  private operateWithSyncValidator() {
    this.observable
      .pipe(
        debounceTime(this.ngModelValidChangeDebounce),
        filter(() => this.control.valid),
      ).subscribe(() => this.ngModelValidChange.emit(this.control.value));
  }


  // for async validator
  // valueChange --> statusChange(pending) --> update --> statusChange
  protected operateWithAsyncValidator() {
    this.subscriber.subscribe(
      this.observable.pipe(
        switchMap(v => {
          return this.control.statusChanges.pipe(
            filter(status => status === AbstractFxDirective.VALID),
            map(() => v)
          );
        }),
        debounceTime(this.ngModelValidChangeDebounce),
        filter((v) => this.isViewToModelChange(v))),
      v => this.ngModelValidChange.emit(v));
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  private isViewToModelChange(eventValue) {
    return eventValue === this.control.value;
  }

  protected abstract get control(): AbstractControl;

  protected abstract get observable(): Observable<any>;
}
