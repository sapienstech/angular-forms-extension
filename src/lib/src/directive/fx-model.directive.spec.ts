import {FxForm} from './fx-form.directive';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsExtensionModule} from '../forms-extension.module';
import {Component, ViewChild} from '@angular/core';
import {FxModelDirective} from './fx-model.directive';
import {NgForm, NgModel} from '@angular/forms';
import {AsyncValidatorFormComponent, TestAsyncValidator} from './fx-form.test.helper';
import {AbstractFxDirective} from './abstract-fx-form.directive';
import {By} from '@angular/platform-browser';
// import {detectChanges} from '@angular/core/src/render3';

describe('fx-model-directive', () => {

  describe('async validators', () => {
    let fixture: ComponentFixture<AsyncValidatorFormComponent>;
    let instance: AsyncValidatorFormComponent;
    let modelValidChange: jasmine.Spy;
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [FormsExtensionModule],
        declarations: [AsyncValidatorFormComponent, TestAsyncValidator]
      })
        .createComponent(AsyncValidatorFormComponent);
      instance = fixture.componentInstance;
    });

    beforeEach(async(() => {
      fixture.detectChanges();
      modelValidChange = spyOn(instance.fxModel.ngModelValidChange, 'emit');
    }));

    describe('value is not valid', () => {
      beforeEach(async(() => {
        instance.value = '!' + instance.validValue;
        fixture.detectChanges();
      }));
      describe('programmatically change value to invalid', () => {
        beforeEach(async(() => {
          instance.value = 'Really Not Valid' + instance.validValue;
          fixture.detectChanges();
        }));
        describe('programmatically change value to valid', () => {
          beforeEach(async(() => {
            instance.value = instance.validValue;
            fixture.detectChanges();
          }));
          it('should NOT emit valid value change', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => expect(modelValidChange).not.toHaveBeenCalled());
          });
        });
      });
    });
    describe('value was changed to valid value', () => {
      it('async validator should emit valid value change', async(() => {
        // instance.ngModel.update.emit(instance.validValue);
        sendInputValue(fixture, 'input', instance.validValue);

        fixture.detectChanges();
        fixture.whenStable().then(() => expect(modelValidChange).toHaveBeenCalledTimes(1));
      }));
    });

    describe('value was changed to NOT valid value', () => {
      it('async validator should NOT emit valid value change', async(() => {
        // instance.ngModel.update.emit('blabla');
        sendInputValue(fixture, 'input', 'blabla');

        fixture.detectChanges();
        fixture.whenStable().then(() => expect(modelValidChange).not.toHaveBeenCalled());
      }));
    });

    describe('value was changed to NOT valid value from UI and and while validating changed programmatically to valid value', () => {
      it('async validator should NOT emit valid value change', fakeAsync(() => {
        const initialDelay = 10;

        instance.delay = initialDelay;

        changeToInvalidValueFromUI();

        changeToValidValueProgrammatically(initialDelay);

        waitForDebounceToEnd();

        expect(modelValidChange).not.toHaveBeenCalled();
      }));

      function waitForDebounceToEnd() {
        for (let i = 0; i < AbstractFxDirective.defaultValidValueChangeDebounce; i++) {
          fixture.detectChanges();
          tick(1);
        }
      }

      function changeToValidValueProgrammatically(timeToWaitAfterChange) {
        instance.delay = 1;
        fixture.detectChanges();
        tick(1);

        instance.value = instance.validValue;

        fixture.detectChanges();
        tick(timeToWaitAfterChange);
      }

      function changeToInvalidValueFromUI() {
        fixture.detectChanges();
        tick(1);

        // instance.ngModel.update.emit('notValid');
        sendInputValue(fixture, 'input', 'notValid');

        fixture.detectChanges();
        tick(1);
      }
    });


  });

  describe('sync validators', () => {
    @Component({
      template: `
        <form>
          <input [(ngModel)]="value" [name]="'input'" required [minlength]="3">
        </form>`
    })
    class TestComponent {
      @ViewChild(FxModelDirective) hybridFormModel: FxModelDirective;

      @ViewChild(NgModel) ngModel: NgModel;

      @ViewChild(NgForm) ngForm: NgForm;

      value;

      markAsDirty() {
        this.ngForm.controls.input.markAsDirty();
      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let instance: TestComponent;
    let hybridFormModel: FxModelDirective;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [FormsExtensionModule],
        declarations: [TestComponent]
      })
        .createComponent(TestComponent);
      instance = fixture.componentInstance;
      hybridFormModel = instance.hybridFormModel;
    });

    beforeEach(async(() => fixture.detectChanges()));

    it('should target the host [ngModel]', async(() =>
      expect(hybridFormModel).toBeTruthy()
    ));

    it('should allow access to the host [ngModel] name', async(() =>
      expect(hybridFormModel.name).toBe('input')
    ));

    [true, false].forEach(valid =>
      it(`should ${valid ? '' : 'NOT'} be valid when [ngModel] is ${valid ? '' : 'NOT'}`, async(() => {
        instance.value = valid ? 'filling in a required field' : '';
        fixture.detectChanges();
        fixture.whenStable().then(() => expect(hybridFormModel.valid).toBe(valid));
      })));

    [true, false].forEach(pristine =>
      it(`should ${pristine ? '' : 'NOT'} be pristine when [ngModel] is ${pristine ? '' : 'NOT'}`, async(() => {
        if (!pristine) {
          instance.markAsDirty();
        }
        fixture.detectChanges();
        fixture.whenStable().then(() => expect(hybridFormModel.pristine).toBe(pristine));
      })));

    it('should allow access to the host [ngModel] errors', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() =>
        expect(hybridFormModel.errors).toBe(instance.ngModel.control.errors));
    }));

    [true, false].forEach(submitted =>
      it(`should ${submitted ? '' : 'NOT'} be submitted when parent [ngForm] is ${submitted ? '' : 'NOT'}`, async(() => {
        if (submitted) {
          instance.ngForm.onSubmit(new Event('click'));
        }
        fixture.detectChanges();
        fixture.whenStable().then(() => expect(hybridFormModel.groupSubmitted).toBe(submitted));
      })));

    describe('when the model has changed', () => {

      describe('when the changed model is valid', () => {
        let ngModelValidChange: jasmine.Spy;

        beforeEach(() => {
          ngModelValidChange = spyOn(hybridFormModel.ngModelValidChange, 'emit');
          instance.value = 'a valid change';
        });

        describe('when the change was made programmatically (model->view)', () => {

          it('should NOT emit that the model has changed and is valid (ngModelValidChange)', async(() => {
            fixture.detectChanges();
            fixture.whenStable().then(() => expect(ngModelValidChange).not.toHaveBeenCalled());
          }));
        });

        describe('when the change was made view->model', () => {

          it('should emit that the model has changed and is valid (ngModelValidChange)', async(() => {

            const change = 'a new valid change';
            sendInputValue(fixture, 'input', change);
            fixture.detectChanges();
            fixture.whenStable().then(() => expect(ngModelValidChange).toHaveBeenCalledWith(instance.value));
          }));

          it(`should debounce for ${FxForm.defaultValidValueChangeDebounce}ms before emitting (ngModelValidChange)`, fakeAsync(() => {
            const valueChangeToEmit = 'another valid change 2';
            // instance.ngModel.update.emit('another valid change');
            sendInputValue(fixture, 'input', 'another valid change');

            fixture.detectChanges();
            tick(FxForm.defaultValidValueChangeDebounce - 1);
            instance.value = 'another valid change 1';
            sendInputValue(fixture, 'input', valueChangeToEmit);
            fixture.detectChanges();
            tick(FxForm.defaultValidValueChangeDebounce - 1);
            expect(ngModelValidChange).not.toHaveBeenCalled();
            tick(1);
            expect(ngModelValidChange).toHaveBeenCalledWith(valueChangeToEmit);
            expect(ngModelValidChange).toHaveBeenCalledTimes(1);
          }));
        });
      });

      describe('when the changed model is invalid', () => {
        let ngModelValidChange: jasmine.Spy;

        beforeEach(async(() => {
          ngModelValidChange = spyOn(hybridFormModel.ngModelValidChange, 'emit');
          instance.value = 'sh'; // invalid - it's too short as [minLength]=3
          fixture.detectChanges();
        }));

        it('should NOT emit that the model has changed and is valid (ngModelValidChange)', async(() => {
          expect(ngModelValidChange).not.toHaveBeenCalledWith(instance.value);
        }));
      });

    });

    describe('clearing out the subscriptions', () => {

      beforeEach(async(() => fixture.destroy()));

      it('should clear the all form subscriptions when the component is destroyed', async(() => {
        hybridFormModel.subscriber['subscriptions'].forEach(s => expect(s.closed).toBeTruthy());
      }));
    });
  });

});

function sendInputValue(fixture, cssElement, change) {
  const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  inputElement.value = change;
  inputElement.dispatchEvent(new Event('input'));
}

