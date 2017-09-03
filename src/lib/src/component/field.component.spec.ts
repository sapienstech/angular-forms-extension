import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsExtensionModule} from '../forms-extension.module';
import {By} from '@angular/platform-browser';
import {NgForm} from '@angular/forms';

describe('FieldComponent', () => {

  @Component({
    template: `
      <form (validSubmit)="save()">
        <fx-field label="User Name"><input [(ngModel)]="username" name="username" required/></fx-field>
        <button #submit>Submit</button>
      </form>
    `
  })
  class TestComponent {
    username = '';

    @ViewChild('submit') button: ElementRef;

    @ViewChild(NgForm) ngForm: NgForm;

    save() {
    }

    markAsDirty() {
      this.ngForm.controls['username'].markAsDirty();
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let instance: TestComponent;

  beforeEach(() => {
    fixture = TestBed
      .configureTestingModule({imports: [FormsExtensionModule], declarations: [TestComponent]})
      .createComponent(TestComponent);
    instance = fixture.componentInstance;
  });

  beforeEach(async(() => fixture.detectChanges()));

  it('should render a label for the control', async(() => {
    expect(fixture.debugElement.query(By.css('.fx-field__label')).nativeElement.innerHTML).toBe('User Name');
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

  it('should add an invalid style after submitting', async(() => {
    instance.button.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() =>
      expect(fixture.debugElement.query(By.css('.fx-field--invalid'))).toBeTruthy());
  }));

  it('should add an invalid style when field is dirty', async(() => {
    instance.markAsDirty();
    fixture.detectChanges();
    fixture.whenStable().then(() =>
      expect(fixture.debugElement.query(By.css('.fx-field--invalid'))).toBeTruthy());
  }));

  describe('error messages', () => {
  });
});
