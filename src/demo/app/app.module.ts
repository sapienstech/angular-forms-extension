import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HybridFormsModule} from 'quickstart-lib';

import {AppComponent} from './app.component';

@NgModule({
  imports: [BrowserModule, HybridFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
