import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsExtensionModule} from '../forms-extension.module';
import {Component, ViewChild} from '@angular/core';
import {FxForm} from './fx-form.directive';

describe('FxFormDirective', () => {

  // region components
  @Component({
    template: `
      <form>
        <input [(ngModel)]="value" [name]="'input'" required [minlength]="3">
        <inner1></inner1>
        <inner2></inner2>
      </form>`
  })
  class TestComponent {
    @ViewChild(FxForm) fxForm: FxForm;
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
    value;
  }

  @Component({
    selector: 'nested',
    template: `
      <form>
        <input [(ngModel)]="value" [name]="'nested-input'" required [minlength]="3">
      </form>`
  })
  class NestedFormComponent {
    value;
  }

  @Component({
    selector: 'inner2',
    template: `
      <form>
        <input [(ngModel)]="value" [name]="'inner2-input'" required [minlength]="3">
      </form>`
  })
  class InnerForm2Component {
    value;
  }

  //endregion

  let fixture: ComponentFixture<TestComponent>;
  let instance: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({imports: [FormsExtensionModule], declarations: [TestComponent]})
      .createComponent(TestComponent);
    instance = fixture.componentInstance;
  });

  beforeEach(async(() => fixture.detectChanges()));

  describe('form building', () => {
    it('should build a form from all the inner forms', () => {
    });

    it('should change the parent form validity when inner form changes', () => {
    });

    it('should emit (ngFormValidChange) when inner value changes value and valid', () => {
    });

    it('should change the parent form validity when a field in the parent form changes', () => {
    });

    it('should emit (ngFormValidChange) when a field in the parent value changes value and valid', () => {
    });

    it('should allow to reset the form', () => {
    });

    it('should mark inner form as submitted when parent is submitted', () => {
    });
  });
});
