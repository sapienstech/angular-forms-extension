import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsExtensionModule} from '../forms-extension.module';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ValidSubmitDirective} from './valid-submit.directive';

describe('ValidSubmitDirective', () => {

  @Component({
    template: `
      <form (validSubmit)="save()">
        <input [(ngModel)]="value" [name]="'input'" required [minlength]="3">
        <button #submit>Submit</button>
      </form>`
  })
  class TestComponent {
    @ViewChild('submit') button: ElementRef;

    @ViewChild(ValidSubmitDirective) validSubmitDirective: ValidSubmitDirective;

    value = 'some valid value';

    save() {
    }

  }

  let fixture: ComponentFixture<TestComponent>;
  let instance: TestComponent;
  let validSubmit: jasmine.Spy;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FormsExtensionModule],
      declarations: [TestComponent]
    }).createComponent(TestComponent);
    instance = fixture.componentInstance;
  });

  beforeEach(async(() => fixture.detectChanges()));

  it('should not emit (validSubmit) when form is invalid', async(() => {
    validSubmit = spyOn(instance.validSubmitDirective.validSubmit, 'emit');
    instance.value = ''; // required field -> no longer valid
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      instance.button.nativeElement.click();
      expect(validSubmit).not.toHaveBeenCalled();
    });
  }));

  it('should not emit (validSubmit) when form is valid', async(() => {
    validSubmit = spyOn(instance.validSubmitDirective.validSubmit, 'emit');
    instance.value = 'some new valid value';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      instance.button.nativeElement.click();
      expect(validSubmit).toHaveBeenCalledTimes(1);
    });
  }));
});
