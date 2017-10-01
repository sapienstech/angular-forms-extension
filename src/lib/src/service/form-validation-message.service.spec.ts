import {FormValidationMessageService} from './form-validation-message.service';

describe('FormValidationMessageService', () => {
  let service: FormValidationMessageService;
  beforeEach(() => service = new FormValidationMessageService());


  [true, false].forEach(appendFieldNameToMessage => {
    describe(`when 'appendFieldNameToMessage' set to ${appendFieldNameToMessage}`, () => {

      const field='Email';
      let fieldInMessage:string;

      beforeEach(() => {
        service.appendFieldNameToMessage = appendFieldNameToMessage;
        appendFieldNameToMessage ? fieldInMessage = `${field} ` : fieldInMessage = "";
      });

      describe('default messages', () => {
        it(`should say 'is required' when required`, () =>
          expect(service.getErrorMessage(field, 'required', {required: true}))
            .toBe(`${fieldInMessage}is required`));

        it(`should say 'must be at least {{requiredLength}} characters long' when minlength is set`, () =>
          expect(service.getErrorMessage(field, 'minlength', {
            actualLength: 1,
            requiredLength: 5
          })).toBe(`${fieldInMessage}must be at least 5 characters long`));

        it(`should say 'no more than {{requiredLength}} characters long' when maxlength is set`, () =>
          expect(service.getErrorMessage(field, 'maxlength', {
            actualLength: 1,
            requiredLength: 10
          })).toBe(`${fieldInMessage}must be no more than 10 characters long`));

        it(`should say 'Email must be valid' when email field`, () =>
          expect(service.getErrorMessage(field, 'email', {email: true}))
            .toBe(`${fieldInMessage}must be valid`));
      });

      describe('adding messages', () => {
        beforeEach(() => service.setErrorMessages({startsWith: 'has to start with {{beginning}}'}));

        it('should show "Email has to start with somethingood"', () =>
          expect(service.getErrorMessage(field, 'startsWith', {beginning: 'somethinggood'}))
            .toBe(`${fieldInMessage}has to start with somethinggood`));

        it('should NOT get rid of the default messages', () =>
          expect(service.getErrorMessage(field, 'required', {required: true}))
            .toBe(`${fieldInMessage}is required`));
      });

      describe('overriding messages', () => {
        beforeEach(() => service.setErrorMessages({required: "can't be blank"}));

        it('should should override the message for required', () =>
          expect(service.getErrorMessage(field, 'required', {required: true}))
            .toBe(`${fieldInMessage}can't be blank`));
      });
    });

  });
});
