import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsExtensionModule} from '../forms-extension.module';
import {By} from '@angular/platform-browser';
import {NgForm} from '@angular/forms';
import {AsyncValidatorFxFieldTestComponent, TestAsyncValidator} from '../directive/fx-form.test.helper';
import {AbstractFxDirective} from '../directive/abstract-fx-form.directive';
import {LabelnputRelativeDisplayType} from './field.component';

describe('FieldComponent', () => {

  describe('sync validation', () => {

    @Component({
      template: `
        <form (validSubmit)="save()">
          <fx-field [label]="usernameLabel"
                    [icon]="iconClassName"
                    [labelRelativePos]="labelPos"
                    [labelWidthPercentage]="30"
                    [labelStyles]="styleObj"
                    [inputStyles]="styleObj"
                    [errorMsgStyles]="errMsgStyleObj">
            <input [(ngModel)]="username" name="username" required/>
          </fx-field>
          <button #submit>Submit</button>
        </form>
      `
    })
    class TestComponent {
      username = '';
      usernameLabel = 'User Name';
      iconClassName = 'icon-class';
      labelPos = LabelnputRelativeDisplayType.LABEL_ON_RIGHT;
      styleObj = {'color': 'black'};
      errMsgStyleObj = {'color': 'red'};

      @ViewChild('submit') button!: ElementRef;

      @ViewChild(NgForm) ngForm!: NgForm;

      save() {
      }

      markAsDirty() {
        this.ngForm.controls['username'].markAsDirty();
      }
    }

    let fixture: ComponentFixture<TestComponent>,
        instance: TestComponent,
        iconClassName:string = 'icon-class',
        labelPos = LabelnputRelativeDisplayType.LABEL_ON_RIGHT.toString();

    beforeEach(() => {
      fixture = TestBed
        .configureTestingModule({imports: [FormsExtensionModule.forRoot()], declarations: [TestComponent]})
        .createComponent(TestComponent);
      instance = fixture.componentInstance;
    });

    beforeEach(async(() => fixture.detectChanges()));

    it('should render a label with width', async(() => {
      expect(fixture.debugElement.query(By.css('.fx-field__label')).styles['width']).toBe('30%');
    }));

    it('should render a input with width', async(() => {
      expect(fixture.debugElement.query(By.css('.fx-field--inputAndError')).styles['width']).toBe('70%');
    }));

    it('should render display as flex for the control', async(() => {
      expect(fixture.debugElement.query(By.css('.fx-field'))
        .classes[labelPos]).toBe(true);
    }));

    it('should render a icon for the control', async(() => {
      expect(fixture.debugElement.queryAll(By.css('.' + iconClassName))[0]).not.toBeNull();
    }));

    it('should render the form control', async(() => {
      expect(fixture.debugElement.query(By.css('.fx-field__control'))).toBeTruthy();
    }));

    it('should add a required style when control is required', async(() => {
      expect(fixture.debugElement.query(By.css('.fx-field--required'))).toBeTruthy();
    }));

    it('should NOT an invalid style when control even though the field is invalid when pristine', async(() => {
      expect(fixture.debugElement.query(By.css('.fx-field--invalid'))).toBeFalsy();
    }));

    it('should add a label style', async(() => {
      expect(fixture.debugElement.query(By.css('.fx-field__label')).styles['color']).toBe(instance.styleObj.color);
    }));

    it('should add a input style', async(() => {
      expect(fixture.debugElement.query(By.css('.fx-field--inputAndError')).styles['color']).toBe(instance.styleObj.color);
    }));

    it('should add a error message style', async(() => {
     expect(fixture.debugElement.query(By.css('.fx-field__label')).styles['color']).toBe(instance.styleObj.color);
    }));

    describe('after submission', () => {
      beforeEach(async(() => {
        instance.button.nativeElement.click();
        fixture.detectChanges();
      }));

      expectInvalidStyles();
    });

    describe('when field is dirty', () => {
      beforeEach(async(() => {
        instance.markAsDirty();
        fixture.detectChanges();
      }));

      expectInvalidStyles();
    });

    function expectInvalidStyles() {
      it('should add an invalid style', async(() =>
        expect(fixture.debugElement.query(By.css('.fx-field--invalid'))).toBeTruthy()));

      it('should list the errors of the invalid fields', async(() =>
        expect(fixture.debugElement.query(By.css('.fx-field__error')).nativeElement.innerHTML)
          .toBe('User Name is required')));

      it('should not add pending validation style', async(() =>
        expect(fixture.debugElement.query(By.css('.fx-field--pending-validation'))).toBeFalsy()));
    }

  });

  describe('async validation when pending validation', () => {
    let fixture: ComponentFixture<AsyncValidatorFxFieldTestComponent>;
    let instance: AsyncValidatorFxFieldTestComponent;
    beforeEach(async(() => {
      fixture = TestBed
        .configureTestingModule({
          imports: [FormsExtensionModule.forRoot()],
          declarations: [AsyncValidatorFxFieldTestComponent, TestAsyncValidator]
        })
        .createComponent(AsyncValidatorFxFieldTestComponent);
      instance = fixture.componentInstance;
    }));

    it('styles should be pending validation while status is PENDING and with no invalid style', fakeAsync(() => {
      const notValidChange = 'notValid';
      const initialDelay = 10;

      instance.delay = initialDelay;
      fixture.detectChanges();
      tick(1);

      instance.ngModel.update.emit(notValidChange);
      instance.ngModel.control.markAsDirty();
      fixture.detectChanges();
      tick(1);

      expect(fixture.debugElement.query(By.css('.fx-field--invalid'))).toBeFalsy();
      expect(fixture.debugElement.query(By.css('.fx-field--pending-validation'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.fx-field__error'))).toBeFalsy();

      for (let i = 0; i < AbstractFxDirective.defaultValidValueChangeDebounce; i++) {
        fixture.detectChanges();
        tick(1);
      }
      expect(fixture.debugElement.query(By.css('.fx-field--invalid'))).toBeTruthy();

      expect(fixture.debugElement.query(By.css('.fx-field__error')).nativeElement.innerHTML)
        .toBe('User Name is required');

      expect(fixture.debugElement.query(By.css('.fx-field--pending-validation'))).toBeFalsy();
    }));
  });
});

