import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControlNameDirective} from './directive/form-control.directive';
import {FormGroupPipe} from './pipe/form-group.pipe';
import {FormControlComponent} from './component/form-control.component';
import {FormGroupComponent} from './component/form-group.component';
import {FormGroupNameDirective} from './directive/form-group.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FormControlNameDirective, FormGroupPipe, FormControlComponent, FormGroupComponent, FormGroupNameDirective],
  exports: [FormControlNameDirective, FormGroupPipe, FormControlComponent, FormGroupComponent, FormGroupNameDirective]
})
export class HybridFormsModule {
}
