import {HybridForm} from './hybrid-form.directive';

describe('HybridFormModelDirective', () => {

  it('should target the host [NgModel]', () => {

  });

  it('should allow access to the host [NgModel] name', () => {

  });

  it('should allow access to the host [NgModel] validity', () => {

  });

  it('should allow access to the host [NgModel] pristineness', () => {

  });

  it('should allow access to the host [NgModel] errors', () => {

  });

  describe('when the model has changed', () => {
    describe('when the changed model is valid', () => {
      it('should emit that the model has changed and is valid (ngModelValidChange)', () => {
      });

      it(`should debounce for ${HybridForm.defaultValidValueChangeDebounce} before emitting (ngModelValidChange)`, () => {
      });

      it('should emit that that debounce time for a valid model change has started (formControlValidValueDebounceStarted)', () => {

      });
    });
    describe('when the changed model is invalid', () => {
      it('should NOT emit that the model has changed and is valid (ngModelValidChange)', () => {
      });
    });
  });
});
