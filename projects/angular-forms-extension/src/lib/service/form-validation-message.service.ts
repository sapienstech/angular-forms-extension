import {Injectable} from '@angular/core';

@Injectable()
export class FormValidationMessageService {

  private errorMessages: { [key: string]: string } = {
    required: '{{fieldName}} is required',
    minlength: '{{fieldName}} must be at least {{requiredLength}} characters long',
    maxlength: '{{fieldName}} must be no more than {{requiredLength}} characters long',
    email: '{{fieldName}} must be valid',
  };

  private fieldsNames: { [key: string]: string }={};

  /**
   * Set custom error messages that override the default ones
   * @param errorMessages An object {key: message}
   */
  setErrorMessages(errorMessages: { [key: string]: string } | undefined) {
    this.errorMessages = Object.assign(this.errorMessages, errorMessages);
  }

  getErrorMessage(fieldName: string, validatorKey: string, params: any): string {
    let errorMessage = this.errorMessages[validatorKey];

    if (params && errorMessage)
      Object.keys(params).forEach(param =>
        errorMessage = errorMessage.replace('{{' + param + '}}', params[param]));

    return errorMessage.replace('{{fieldName}}', fieldName ? fieldName : "");
  }
}
