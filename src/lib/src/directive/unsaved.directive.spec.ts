import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsExtensionModule} from '../forms-extension.module';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {FxForm} from './fx-form.directive';
import {ValidSubmitDirective} from './valid-submit.directive';
import {UnsavedDirective} from './unsaved.directive';

describe('ValidSubmitDirective', () => {

  describe('a form with a submit button', () => {
    @Component({
      template: `
        <form (validSubmit)="save()" (unsaved)="unsaved($event)">
          <input [(ngModel)]="value" [name]="'input'" required [minlength]="3">
          <button #submit>Submit</button>
        </form>`
    })
    class TestComponent {
      @ViewChild(NgModel) ngModel: NgModel;

      @ViewChild(NgForm) ngForm: NgForm;

      @ViewChild(FxForm) fxForm: FxForm;

      @ViewChild('submit') button: ElementRef;

      @ViewChild(UnsavedDirective) unsavedDirective: UnsavedDirective;

      markAsDirty() {
        this.ngForm.controls['input'].markAsDirty();
      }

      value = 'some valid value';

      unsaved() {

      }

      save() {

      }
    }

    let fixture: ComponentFixture<TestComponent>;
    let instance: TestComponent;
    let unsaved: jasmine.Spy;

    function mostRecentUnsavedCallArgument() {
      return unsaved.calls.mostRecent().args[0];
    };

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [FormsExtensionModule],
        declarations: [TestComponent]
      }).createComponent(TestComponent);
      instance = fixture.componentInstance;
    });

    beforeEach(async(() => fixture.detectChanges()));

    describe('when form value changes', () => {

      beforeEach(async(() => {
        unsaved = spyOn(instance.unsavedDirective.unsavedChange, 'emit');
        instance.value = 'something else';
        instance.markAsDirty();
        fixture.detectChanges();
      }));

      it('should emit (unsaved)="true" when form is dirty', async(() => {
        expect(unsaved).toHaveBeenCalledTimes(1);
        expect(mostRecentUnsavedCallArgument()).toBeTruthy();
      }));

      describe('after submission', () => {
        beforeEach(async(() => {
          instance.button.nativeElement.click();
          fixture.detectChanges();
        }));

        it('should emit (unsaved)="false" after submit button was pressed', async(() => {
          expect(unsaved).toHaveBeenCalledTimes(2);
          expect(mostRecentUnsavedCallArgument()).toBeFalsy();
        }));

        it('should emit (unsaved)="true" after another change', async(() => {
          instance.value = 'something else altogether';
          instance.markAsDirty();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(unsaved).toHaveBeenCalledTimes(3);
            expect(mostRecentUnsavedCallArgument()).toBeTruthy();
          });
        }));
      });
    });
  });

  describe('a form with NO submit button', () => {

  });
});
