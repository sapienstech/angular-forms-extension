import {Component} from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <hf-form-group>

      <hf-form-field>
        <input hfFormControl required>
      </hf-form-field>

    </hf-form-group>
  `
})
export class AppComponent {
}
