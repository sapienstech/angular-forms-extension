import {AbstractControl} from '@angular/forms';
import {EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

export abstract class AbstractHybridFormDirective implements OnInit, OnDestroy {

  static readonly defaultValidValueChangeDebounce = 400;

  private readonly subscriptions: Subscription[] = [];

  @Input() ngModelValidChangeDebounce = AbstractHybridFormDirective.defaultValidValueChangeDebounce;

  @Output() ngModelValidChange = new EventEmitter();

  ngModelValidValueDebounceStarted = new Subject();

  ngOnInit() {
    this.subscribe(this.control.valueChanges,
      v => this.control.valid ? this.ngModelValidValueDebounceStarted.next(v) : null);

    this.subscribe(this.control.valueChanges.debounceTime(this.ngModelValidChangeDebounce),
      v => this.control.valid ? this.ngModelValidChange.emit(v) : null);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  protected abstract get control(): AbstractControl;

  private subscribe<T>(observable: Observable<T>, fn: (t: T) => void) {
    const subscription = observable.subscribe(fn);
    this.subscriptions.push(subscription);
  }
}
