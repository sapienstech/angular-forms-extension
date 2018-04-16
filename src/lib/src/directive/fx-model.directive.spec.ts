import {FxForm} from './fx-form.directive';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsExtensionModule} from '../forms-extension.module';
import {Component, ViewChild} from '@angular/core';
import {FxModelDirective} from './fx-model.directive';
import {NgForm, NgModel} from '@angular/forms';
import {AsyncValidatorFormComponent, TestAsyncValidator} from "./fx-form.test.helper";
import {AbstractFxDirective} from "./abstract-fx-form.directive";

describe('FxFormModelDirective', () => {

  describe('async validators', () => {
    let fixture: ComponentFixture<AsyncValidatorFormComponent>;
    let instance: AsyncValidatorFormComponent;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [FormsExtensionModule],
        declarations: [AsyncValidatorFormComponent, TestAsyncValidator]
      })
        .createComponent(AsyncValidatorFormComponent);
      instance = fixture.componentInstance;
    });

    beforeEach(async(() => fixture.detectChanges()));

    describe('value was changed to valid value', () => {
      it('async validator should emit valid value change', async(() => {
        const modelValidChange = spyOn(instance.fxModel.ngModelValidChange, 'emit');
        instance.ngModel.update.emit(instance.validValue);
        fixture.detectChanges();
        fixture.whenStable().then(() => expect(modelValidChange).toHaveBeenCalledTimes(1));
      }));
    });

    describe('value was changed to NOT valid value', () => {
      it('async validator should NOT emit valid value change', async(() => {
        const modelValidChange = spyOn(instance.fxModel.ngModelValidChange, 'emit');
        instance.ngModel.update.emit("blabla");
        fixture.detectChanges();
        fixture.whenStable().then(() => expect(modelValidChange).not.toHaveBeenCalled());
      }));
    });

    describe('value was changed to NOT valid value from UI and and while validating changed programmatically to valid value', () => {
      it('async validator should NOT emit valid value change', fakeAsync(() => {
        const modelValidChange = spyOn(instance.fxModel.ngModelValidChange, 'emit');
        let notValidChange = "notValid"
        let initialDelay = 10;

        instance.delay = initialDelay;
        fixture.detectChanges();
        tick(1);

        instance.ngModel.update.emit(notValidChange);

        fixture.detectChanges();
        tick(1);

        instance.delay = 1;
        fixture.detectChanges();
        tick(1);

        instance.value = instance.validValue;

        fixture.detectChanges();
        tick(initialDelay);

        fixture.detectChanges();
        tick( AbstractFxDirective.defaultValidValueChangeDebounce);
        expect(modelValidChange).not.toHaveBeenCalled();
      }));
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

      markAsDirty() {
        this.ngForm.controls['input'].markAsDirty();
      }

      value;
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
        if (!pristine) instance.markAsDirty();
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
        if (submitted) instance.ngForm.onSubmit(new Event('click'));
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
            instance.ngModel.update.emit('a valid change');
            fixture.detectChanges();
            fixture.whenStable().then(() => expect(ngModelValidChange).toHaveBeenCalledWith(instance.value));
          }));

          it(`should debounce for ${FxForm.defaultValidValueChangeDebounce}ms before emitting (ngModelValidChange)`, fakeAsync(() => {
            let valueChangeToEmit = 'another valid change 2';
            instance.ngModel.update.emit('another valid change');
            fixture.detectChanges();
            tick(FxForm.defaultValidValueChangeDebounce - 1);
            instance.value = 'another valid change 1';
            instance.ngModel.update.emit(valueChangeToEmit);
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
        hybridFormModel['subscriber'].subscriptions.forEach(s => expect(s.closed).toBeTruthy());
      }))
    })
  });
});
