import {FormValidationMessageService} from './form-validation-message.service';

describe('FormValidationMessageService', () => {
  let service: FormValidationMessageService;
  beforeEach(() => service = new FormValidationMessageService())
  const field = 'Email';

  describe('default messages', () => {
    it(`should say 'is required' when required`, () =>
      expect(service.getErrorMessage(field, 'required', {required: true}))
        .toBe(`${field} is required`));

    it(`should say 'must be at least {{requiredLength}} characters long' when minlength is set`, () =>
      expect(service.getErrorMessage(field, 'minlength', {
        actualLength: 1,
        requiredLength: 5
      })).toBe(`${field} must be at least 5 characters long`));

    it(`should say 'no more than {{requiredLength}} characters long' when maxlength is set`, () =>
      expect(service.getErrorMessage(field, 'maxlength', {
        actualLength: 1,
        requiredLength: 10
      })).toBe(`${field} must be no more than 10 characters long`));

    it(`should say 'Email must be valid' when email field`, () =>
      expect(service.getErrorMessage(field, 'email', {email: true}))
        .toBe(`${field} must be valid`));
  });

  describe('adding messages', () => {
    beforeEach(() => service.setErrorMessages({startsWith: 'has to start with {{beginning}}'}));

    it('should show "Email has to start with somethingood"', () =>
      expect(service.getErrorMessage(field, 'startsWith', {beginning: 'somethinggood'}))
        .toBe(`${field} has to start with somethinggood`));

    it('should NOT get rid of the default messages', () =>
      expect(service.getErrorMessage(field, 'required', {required: true}))
        .toBe(`${field} is required`));
  });

  describe('overriding messages', () => {
    beforeEach(() => service.setErrorMessages({required: "can't be blank"}));

    it('should should override the message for required', () =>
      expect(service.getErrorMessage(field, 'required', {required: true}))
        .toBe(`${field} can't be blank`));
  });
});
