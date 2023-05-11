import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent, InnerAppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {FormsExtensionModule} from 'angular-forms-extension';

@NgModule({
  imports: [BrowserModule, FormsExtensionModule.forRoot(), FormsModule],
  declarations: [AppComponent, InnerAppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
