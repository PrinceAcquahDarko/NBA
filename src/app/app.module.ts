import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';
import { HttpInterceptorModule } from './http.interceptor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpInterceptorModule,
    HttpClientModule,
    DetailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
