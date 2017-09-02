import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormExtensionsModule} from 'quickstart-lib';

import {AppComponent, InnerAppComponent} from './app.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormExtensionsModule, FormsModule,],
  declarations: [AppComponent, InnerAppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
