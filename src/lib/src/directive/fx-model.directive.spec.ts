import {FxForm} from './fx-form.directive';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormExtensionsModule} from '../form-extensions.module';
import {Component, ViewChild} from '@angular/core';
import {FxModelDirective} from './fx-model.directive';
import {NgForm, NgModel} from '@angular/forms';

describe('HybridFormModelDirective', () => {

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
    fixture = TestBed.configureTestingModule({imports: [FormExtensionsModule], declarations: [TestComponent]})
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

      it('should emit that the model has changed and is valid (ngModelValidChange)', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => expect(ngModelValidChange).toHaveBeenCalledWith(instance.value));
      }));

      it(`should debounce for ${FxForm.defaultValidValueChangeDebounce}ms before emitting (ngModelValidChange)`, fakeAsync(() => {
        fixture.detectChanges();
        tick(FxForm.defaultValidValueChangeDebounce - 1);
        instance.value = 'another valid change';
        fixture.detectChanges();
        tick(FxForm.defaultValidValueChangeDebounce - 1);
        expect(ngModelValidChange).not.toHaveBeenCalledWith(instance.value);
        tick(1);
        expect(ngModelValidChange).toHaveBeenCalledWith(instance.value);
        expect(ngModelValidChange).toHaveBeenCalledTimes(1);
      }));

      it('should emit that that debounce time for a valid model change has started (formControlValidValueDebounceStarted)', fakeAsync(() => {
        const ngModelValidValueDebounceStarted = spyOn(hybridFormModel.ngModelValidValueDebounceStarted, 'next');
        fixture.detectChanges();
        tick(1);
        expect(ngModelValidValueDebounceStarted).toHaveBeenCalled();
        tick(FxForm.defaultValidValueChangeDebounce);
      }));
    });

    describe('when the changed model is invalid', () => {
      let ngModelValidChange: jasmine.Spy;
      let ngModelValidValueDebounceStarted: jasmine.Spy;

      beforeEach(async(() => {
        ngModelValidValueDebounceStarted = spyOn(hybridFormModel.ngModelValidValueDebounceStarted, 'next');
        ngModelValidChange = spyOn(hybridFormModel.ngModelValidChange, 'emit');
        instance.value = 'sh'; // invalid - it's too short as [minLength]=3
        fixture.detectChanges();
      }));

      it('should NOT emit that the model has changed and is valid (ngModelValidChange)', async(() => {
        expect(ngModelValidChange).not.toHaveBeenCalledWith(instance.value);
      }));

      it('should NOT emit that that debounce time for a valid model change has started (formControlValidValueDebounceStarted)', async(() => {
        expect(ngModelValidValueDebounceStarted).not.toHaveBeenCalled();
      }));
    });
  });

  describe('clearing out the subscriptions', () => {

    beforeEach(async(() => fixture.destroy()));

    it('should clear the all form subscriptions when the component is destroyed', async(() => {
      hybridFormModel['subscriptions'].forEach(s => expect(s.closed).toBeTruthy());
    }))
  })
});
