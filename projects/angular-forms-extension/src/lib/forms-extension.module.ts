import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FxModelDirective} from './directive/fx-model.directive';
import {FieldComponent} from './component/field.component';
import {FxForm} from './directive/fx-form.directive';
import {FormsModule} from '@angular/forms';
import {ValidSubmitDirective} from './directive/valid-submit.directive';
import {UnsavedDirective} from './directive/unsaved.directive';
import {FormValidationMessageService} from './service/form-validation-message.service';

@NgModule({
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

  static forRoot(errorMessages?: { [key: string]: string }): ModuleWithProviders<FormsExtensionModule> {

    const formValidationMessageService = new FormValidationMessageService();
    formValidationMessageService.setErrorMessages(errorMessages);

    return {
      ngModule: FormsExtensionModule,
      providers: [
        {provide: FormValidationMessageService, useValue: formValidationMessageService}
      ]
    };
  }
}
