import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FxModelDirective} from './directive/fx-model.directive';
import {FieldComponent} from './component/field.component';
import {FxForm} from './directive/fx-form.directive';
import {FormsModule} from '@angular/forms';
import {ValidSubmitDirective} from './directive/valid-submit.directive';
import {UnsavedDirective} from './directive/unsaved.directive';
import {FormValidationMessageService} from "./service/form-validation-message.service";


export function formValidationMessageServiceFactory() {
  let formValidationMessageService = new FormValidationMessageService();
  //todo: support error message
  return formValidationMessageService;
}


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

  static forRoot(errorMessages?: { [key: string]: string }): ModuleWithProviders {
    return {
      ngModule: FormsExtensionModule,
      providers: [
        {provide: FormValidationMessageService, useFactory: formValidationMessageServiceFactory}
      ]
    };
  }
}
