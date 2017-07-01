import {AfterContentInit, Component, ContentChild, EventEmitter, Input, Output, SimpleChange} from '@angular/core';
import {ControlValueAccessor, FormControl} from '@angular/forms';
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


  private _directive: FormControlDirective;

  get control(): FormControl {
    return this.directive.form;
  }

  get directive(): FormControlDirective {
    return this._directive;
  }

  @ContentChild(FormControlDirective)
  set directive(value: FormControlDirective) {
    this._directive = value;
  }

  private get valueAccessor(): ControlValueAccessor {
    return this.directive.valueAccessor;
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
    this.onChange = v => {
      fn(v);
      this.valueChange.emit(v);
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
      throw new Error(`Form Entry "${this.name}" does not contain any component marked with #${FormControlDirective.SELECTOR}`);

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
