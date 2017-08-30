import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HybridFormModelDirective} from './directive/hybrid-form-model.directive';
import {HybridFormFieldComponent} from './component/hybrid-form-field.component';
import {HybridForm} from './directive/hybrid-form.directive';
import {FormsModule} from '@angular/forms';
import {ValidSubmitDirective} from './directive/valid-submit.directive';
import {UnsavedDirective} from './directive/unsaved.directive';
import {ErrorMessageService} from './service/error-messages.service';

@NgModule({
  providers: [ErrorMessageService],
  imports: [CommonModule, FormsModule],
  declarations: [
    UnsavedDirective,
    ValidSubmitDirective,
    HybridFormModelDirective,
    HybridFormFieldComponent,
    HybridForm],
  exports: [
    FormsModule,
    UnsavedDirective,
    ValidSubmitDirective,
    HybridFormModelDirective,
    HybridFormFieldComponent,
    HybridForm]
})
export class HybridFormsModule {
}
