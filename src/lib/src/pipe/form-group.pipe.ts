import {Pipe, PipeTransform} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Pipe({
  name: 'formGroup'
})
export class FormGroupPipe implements PipeTransform {
  transform(): FormGroup {
    return new FormGroup({});
  }
}
