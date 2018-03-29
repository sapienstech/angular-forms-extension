import {AbstractControl} from '@angular/forms';
import {EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import {SubscriberService} from '../service/subscriber.service';
import {Observable} from 'rxjs/Observable';

export abstract class AbstractFxDirective implements OnInit, OnDestroy {

  static readonly defaultValidValueChangeDebounce = 400;

  @Input() ngModelValidChangeDebounce = AbstractFxDirective.defaultValidValueChangeDebounce;

  @Output() ngModelValidChange = new EventEmitter();

  ngModelValidValueDebounceStarted = new Subject();

  constructor(protected subscriber: SubscriberService) {
  }

  ngOnInit() {
    this.subscriber.subscribe(this.observable,
      v => this.control.valid ? this.ngModelValidValueDebounceStarted.next(v) : null);

    this.subscriber.subscribe(this.control.statusChanges.debounceTime(this.ngModelValidChangeDebounce),
      v => this.control.valid && !this.control.pristine ? this.ngModelValidChange.emit(this.control.value) : null);
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  protected abstract get control(): AbstractControl;

  protected abstract get observable(): Observable<any>;
}
