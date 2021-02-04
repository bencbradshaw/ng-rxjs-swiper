import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PageIndicatorComponent } from './page-indicator/page-indicator.component';
import { PulseArrowComponent } from './pulse-arrow/pulse-arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PageIndicatorComponent,
    PulseArrowComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
