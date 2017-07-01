import {Directive, ElementRef, forwardRef, Inject, Optional, Renderer} from '@angular/core';
import {
  COMPOSITION_BUFFER_MODE,
  DefaultValueAccessor as AngularDefaultValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {FormControlDirective} from './form-control.directive';

@Directive({
  selector:
    `[${FormControlDirective.SELECTOR}]`,
  host: {
    '(input)': '_handleInput($event.target.value)',
    '(blur)': 'onTouched()',
    '(compositionstart)': '_compositionStart()',
    '(compositionend)': '_compositionEnd($event.target.value)'
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DefaultValueAccessor),
    multi: true
  }]
})
export class DefaultValueAccessor extends AngularDefaultValueAccessor {
  constructor(_renderer: Renderer, _elementRef: ElementRef,
              @Optional() @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean) {
    super(_renderer, _elementRef, _compositionMode);
  }
}
