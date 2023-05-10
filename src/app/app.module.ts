import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsExtensionModule} from 'quickstart-lib';

import {AppComponent, InnerAppComponent} from './app.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsExtensionModule.forRoot(), FormsModule],
  declarations: [AppComponent, InnerAppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
