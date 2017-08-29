import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HybridFormModelDirective} from './directive/hybrid-form-model.directive';
import {HybridFormFieldComponent} from './component/hybrid-form-field.component';
import {HybridFormGroupComponent} from './component/hybrid-form.component';
import {HybridForm} from './directive/hybrid-form.directive';
import {FormsModule} from '@angular/forms';
import {ValidSubmitDirective} from './directive/valid-submit.directive';
import {UnsavedDirective} from './directive/unsaved.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    UnsavedDirective,
    ValidSubmitDirective,
    HybridFormModelDirective,
    HybridFormFieldComponent,
    HybridFormGroupComponent,
    HybridForm],
  exports: [
    UnsavedDirective,
    ValidSubmitDirective,
    HybridFormModelDirective,
    HybridFormFieldComponent,
    HybridFormGroupComponent,
    HybridForm]
})
export class HybridFormsModule {
}
