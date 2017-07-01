import {Component} from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <hf-form-group>

        <input [(hfFormControl)]="value" required>

    </hf-form-group>
  `
})
export class AppComponent {
  value = 'roni';
}
