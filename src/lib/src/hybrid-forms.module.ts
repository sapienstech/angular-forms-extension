import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControlNameDirective} from './directive/form-control.directive';
import {FormGroupPipe} from './pipe/form-group.pipe';
import {FormControlComponent} from './component/form-control.component';
import {FormGroupComponent} from './component/form-group.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FormControlNameDirective, FormGroupPipe, FormControlComponent, FormGroupComponent],
  exports: [FormControlNameDirective, FormGroupPipe, FormControlComponent, FormGroupComponent]
})
export class HybridFormsModule {
}
