import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsExtensionModule} from '../forms-extension.module';
import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FxForm} from './fx-form.directive';
import {AsyncValidatorFormComponent, TestAsyncValidator} from "./fx-form.test.helper";

describe('FxFormDirective', () => {

  // region components
  @Component({
    selector: 'nested',
    template: `
      <form>
        <input [(ngModel)]="value" [name]="'nested-input'" required [minlength]="3">
      </form>`
  })
  class NestedFormComponent {
    @ViewChild(FxForm) fxForm: FxForm;
    value = 'nested-value';
  }
  @Component({
    selector: 'inner1',
    template: `
      <form>
        <input [(ngModel)]="value" [name]="'inner1-input'" required [minlength]="3">
        <nested></nested>
      </form>`
  })
  class InnerForm1Component {
    value = 'inner1-value';
    @ViewChild(NestedFormComponent) nested: NestedFormComponent;
  }

  @Component({
    selector: 'inner2',
    template: `
      <form>
        <input [(ngModel)]="value" [name]="'inner2-input'" required [minlength]="3">
      </form>`
  })
  class InnerForm2Component {
    value = 'inner2-value';
  }

  @Component({
    template: `
      <form>
        <input [(ngModel)]="value" [name]="'input'" required [minlength]="3">
        <inner1></inner1>
        <inner2></inner2>
      </form>`
  })
  class TestComponent {
    @ViewChild(NgForm) ngForm: NgForm;
    @ViewChild(FxForm) fxForm: FxForm;
    @ViewChild(InnerForm1Component) inner1: InnerForm1Component;
    @ViewChild(InnerForm2Component) inner2: InnerForm2Component;
    value = 'value';
  }

  //endregion

  describe('async validator', () => {
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
        const formValidChange = spyOn(instance.fxForm.ngFormValidChange, 'emit');
        instance.ngModel.update.emit(instance.validValue);
        fixture.detectChanges();
        fixture.whenStable().then(() => expect(formValidChange).toHaveBeenCalledTimes(1));
      }));
    });

    describe('value was changed to NOT valid value', () => {
      it('async validator should NOT emit valid value change', async(() => {
        const formValidChange = spyOn(instance.fxForm.ngFormValidChange, 'emit');
        instance.ngModel.update.emit("blabla");
        fixture.detectChanges();
        fixture.whenStable().then(() => expect(formValidChange).not.toHaveBeenCalled());
      }));
    });

  });

  describe('form building', () => {
  let fixture: ComponentFixture<TestComponent>;
  let instance: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FormsExtensionModule],
      declarations: [TestComponent, InnerForm1Component, InnerForm2Component, NestedFormComponent]
    })
      .createComponent(TestComponent);
    instance = fixture.componentInstance;
  });

  beforeEach(async(() => fixture.detectChanges()));

    it('should build a form from all the inner forms', async(() => {
      expect(JSON.stringify(instance.ngForm.form.value)).toBe(`
        {
          "0": {
            "0": {
              "nested-input": "nested-value"
            },
            "inner1-input": "inner1-value"
          },
          "1": {
            "inner2-input": "inner2-value"
          },
          "input": "value"
        }      
      `.replace(/(?:\r\n|\r|\n)/g, '').split(' ').join('').trim());
    }));

    it('should change the parent form validity when inner form changes', async(() => {
      instance.inner1.nested.value = ''; // value is required, thus now invalid
      fixture.detectChanges();
      fixture.whenStable().then(() => expect(instance.ngForm.valid).toBeFalsy());
    }));

    it('should emit (ngFormValidChange) when inner value changes value and valid', async(() => {
      const formValidChange = spyOn(instance.fxForm.ngFormValidChange, 'emit');
      instance.inner1.nested.value = 'a valid value'; // valid as it's longer than min 3
      fixture.detectChanges();
      fixture.whenStable().then(() => expect(formValidChange).toHaveBeenCalledTimes(1));
    }));

    it('should emit (ngFormValidChange) when a field in the parent value changes value and valid', async(() => {
      const formValidChange = spyOn(instance.fxForm.ngFormValidChange, 'emit');
      instance.value = 'a valid value'; // valid as it's longer than min 3
      fixture.detectChanges();
      fixture.whenStable().then(() => expect(formValidChange).toHaveBeenCalledTimes(1));
    }));

    it('should allow to reset the form', async(() => {
      const reset = spyOn(instance.ngForm.form, 'reset');
      instance.fxForm.reset();
      expect(reset).toHaveBeenCalledTimes(1);
    }));

    it('should mark inner form as submitted when parent is submitted', async(() => {
      instance.ngForm.onSubmit(null);
      expect(instance.inner1.nested.fxForm.submitted).toBeTruthy();
    }));
  });
});
