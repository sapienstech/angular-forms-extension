import {AbstractControl} from '@angular/forms';
import {EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import {SubscriberService} from '../service/subscriber.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/filter";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

export abstract class AbstractFxDirective implements OnInit, OnDestroy {

  static readonly defaultValidValueChangeDebounce = 400;

  static readonly VALID = "VALID";

  @Input() ngModelValidChangeDebounce = AbstractFxDirective.defaultValidValueChangeDebounce;

  @Output() ngModelValidChange = new EventEmitter();

  constructor(protected subscriber: SubscriberService) {
  }

  ngOnInit() {

    this.subscriber.subscribe(this.observable.switchMap(v => {
        return this.control.statusChanges.filter(status => status === AbstractFxDirective.VALID).map(() => v);
      }).debounceTime(this.ngModelValidChangeDebounce),
      v => this.isViewToModelChange(v) ? this.ngModelValidChange.emit(v) : null);
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  private isViewToModelChange(eventValue){
    return eventValue === this.control.value;
  }

  protected abstract get control(): AbstractControl;

  protected abstract get observable(): Observable<any>;
}
