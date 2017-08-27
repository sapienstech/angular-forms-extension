import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HybridFormsModule} from 'quickstart-lib';

import {AppComponent, InnerAppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [BrowserModule, HybridFormsModule, ReactiveFormsModule],
  declarations: [AppComponent, InnerAppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
