import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsExtensionModule} from '../forms-extension.module';
import {Component} from '@angular/core';

describe('FxFormDirective', () => {

  @Component({
    template: `
      <form>
        <input [(ngModel)]="value" [name]="'input'" required [minlength]="3">
        <inner1></inner1>
        <inner2></inner2>
      </form>`
  })
  class TestComponent {
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

  let fixture: ComponentFixture<TestComponent>;
  let instance: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({imports: [FormsExtensionModule], declarations: [TestComponent]})
      .createComponent(TestComponent);
    instance = fixture.componentInstance;
  });

  beforeEach(async(() => fixture.detectChanges()));

});
