import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControlNameDirective} from './directive/form-control.directive';
import {FormGroupPipe} from './pipe/form-group.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FormControlNameDirective, FormGroupPipe],
  exports: [FormControlNameDirective, FormGroupPipe]
})
export class HybridFormsModule {
}
