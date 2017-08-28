import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControlNameDirective} from './directive/form-control-name.directive';
import {FormControlComponent} from './component/form-control.component';
import {FormGroupComponent} from './component/form-group.component';
import {FormGroupNameDirective} from './directive/form-group-name.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidSubmitDirective} from './directive/valid-submit.directive';
import {UnsavedDirective} from './directive/unsaved.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    UnsavedDirective,
    ValidSubmitDirective,
    FormControlNameDirective,
    FormControlComponent,
    FormGroupComponent,
    FormGroupNameDirective],
  exports: [
    UnsavedDirective,
    ValidSubmitDirective,
    FormControlNameDirective,
    FormControlComponent,
    FormGroupComponent,
    FormGroupNameDirective]
})
export class HybridFormsModule {
}
