import {NgModule} from '@angular/core';
import {FormGroupComponent} from './component/form-group.component';
import {FormControlDirective} from './directive/form-control.directive';
import {DefaultValueAccessor} from './directive/default-value-accessor.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormGroupComponent, FormControlDirective, DefaultValueAccessor],
  exports: [FormGroupComponent, FormControlDirective, DefaultValueAccessor]
})
export class HybridFormsModule {
}
