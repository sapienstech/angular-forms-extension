import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SubscriberService {
  readonly subscriptions: Subscription[] = [];

  subscribe<T>(observable: Observable<T>, fn: (t: T) => void) {
    const subscription = observable.subscribe(fn);
    this.subscriptions.push(subscription);
  }

  unsubscribe() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
