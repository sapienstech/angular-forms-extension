import {HybridForm} from './hybrid-form.directive';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HybridFormsModule} from '../hybrid-forms.module';
import {Component, ViewChild} from '@angular/core';
import {HybridFormModelDirective} from './hybrid-form-model.directive';
import {NgModel} from '@angular/forms';

describe('HybridFormModelDirective', () => {

  @Component({
    template: `
      <form>
        <input [(ngModel)]="value" [name]="'input'" required>
      </form>`
  })
  class TestComponent {
    @ViewChild(HybridFormModelDirective) hybridFormModel: HybridFormModelDirective;
    @ViewChild(NgModel) ngModel: NgModel;
    value;
  }

  let fixture: ComponentFixture<TestComponent>;
  let instance: TestComponent;
  let hybridFormModel: HybridFormModelDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({imports: [HybridFormsModule], declarations: [TestComponent]})
      .createComponent(TestComponent);
    instance = fixture.componentInstance;
    hybridFormModel = instance.hybridFormModel;
  });

  beforeEach(async(() => fixture.detectChanges()));

  it('should target the host [ngModel]', () =>
    expect(hybridFormModel).toBeTruthy()
  );

  it('should allow access to the host [ngModel] name', () =>
    expect(hybridFormModel.name).toBe('input')
  );

  [true, false].forEach(valid =>
    it(`should ${valid ? '' : 'NOT'} be valid when [ngModel] is ${valid ? '' : 'NOT'}`, async(() => {
      instance.value = valid ? 'filling in a required field' : '';
      fixture.detectChanges();
      fixture.whenStable().then(() => expect(hybridFormModel.valid).toBe(valid));
    })));

  [true, false].forEach(pristine =>
    it(`should ${pristine ? '' : 'NOT'} be pristine when [ngModel] is ${pristine ? '' : 'NOT'}`, () => {
      instance.value = !pristine ? 'no longer pristine!' : instance.value;
      fixture.detectChanges();
      fixture.whenStable().then(() => expect(hybridFormModel.pristine).toBe(pristine));
    }));

  it('should allow access to the host [ngModel] errors', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() =>
      expect(hybridFormModel.errors).toBe(instance.ngModel.control.errors));
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
