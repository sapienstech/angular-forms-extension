import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FxModelDirective} from './directive/fx-model.directive';
import {FieldComponent} from './component/field.component';
import {FxForm} from './directive/fx-form.directive';
import {FormsModule} from '@angular/forms';
import {ValidSubmitDirective} from './directive/valid-submit.directive';
import {UnsavedDirective} from './directive/unsaved.directive';
import {FormValidationMessageService} from './service/form-validation-message.service';

@NgModule({
  providers: [FormValidationMessageService],
  imports: [CommonModule, FormsModule],
  declarations: [
    UnsavedDirective,
    ValidSubmitDirective,
    FxModelDirective,
    FieldComponent,
    FxForm],
  exports: [
    FormsModule,
    UnsavedDirective,
    ValidSubmitDirective,
    FxModelDirective,
    FieldComponent,
    FxForm]
})
export class FormsExtensionModule {
}
