import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HybridFormsModule} from 'quickstart-lib';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [BrowserModule, HybridFormsModule, ReactiveFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
