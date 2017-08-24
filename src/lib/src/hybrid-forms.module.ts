import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControlNameDirective} from './directive/form-control-name.directive';
import {FormGroupPipe} from './pipe/form-group.pipe';
import {FormControlComponent} from './component/form-control.component';
import {FormGroupComponent} from './component/form-group.component';
import {FormGroupNameDirective} from './directive/form-group-name.directive';
import {FormComponent} from './component/form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    FormComponent,
    FormControlNameDirective,
    FormGroupPipe,
    FormControlComponent,
    FormGroupComponent,
    FormGroupNameDirective],
  exports: [
    FormComponent,
    FormControlNameDirective,
    FormGroupPipe,
    FormControlComponent,
    FormGroupComponent,
    FormGroupNameDirective]
})
export class HybridFormsModule {
}
