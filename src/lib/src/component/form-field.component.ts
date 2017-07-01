import {AfterContentInit, Component, EventEmitter, Input, Output, SimpleChange} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {FormControlDirective} from '../directive/form-control.directive';

@Component({
  selector: 'hf-form-field',
  template: `
    <label>
      {{label}}
      <ng-content></ng-content>
    </label>
  `
})
export class FormFieldComponent<T> implements AfterContentInit, ControlValueAccessor {

  @Input() name: string;

  @Input() label: string;

  @Input() value: T;

  @Output() valueChange = new EventEmitter<T>();


  private static readonly TARGET_SELECTOR = 'hfField';

  private _directive: FormControlDirective;


  get directive(): FormControlDirective {
    return this._directive;
  }

  set directive(value: FormControlDirective) {
    this._directive = value;
    this._directive.ngOnChanges({form: new SimpleChange(null, '', true)});
  }

  private get valueAccessor(): ControlValueAccessor {
    return this._directive.valueAccessor;
  }

  private onChange = _ => _;

  private onTouched = _ => _;


  ngAfterContentInit(): void {
    this.assertControlValueAccessor(this.valueAccessor);

    this.valueAccessor.registerOnChange(this.onChange);
    this.valueAccessor.registerOnTouched(this.onTouched);
    this.valueAccessor.writeValue(this.value);
  }

  writeValue(obj: any): void {
    this.valueAccessor.writeValue(obj);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = _ => {
      fn(_);
      this.valueChange.emit();
    };
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.valueAccessor.setDisabledState(isDisabled);
  }


  private assertControlValueAccessor(target: ControlValueAccessor | any) {
    if (!target)
      throw new Error(`Form Entry "${this.name}" does not contain any component marked with #${FormFieldComponent.TARGET_SELECTOR}`);

    if (!FormFieldComponent.isControlValueAccessor(target))
      throw new Error(`Form Entry "${this.name}" contains a component that does not implement ControlValueAccessor: ${target}`);
  }

  private static isControlValueAccessor(target: ControlValueAccessor | any): target is ControlValueAccessor {
    return target.registerOnChange
      && target.registerOnTouched
      && target.setDisabledState
      && target.writeValue;
  }
}
