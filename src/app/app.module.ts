import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { WeatherService } from "./weather-service/weather.service";
import { MenloCurrentWeatherComponent } from './menlo-current-weather/menlo-current-weather.component';


@NgModule({
  declarations: [
    AppComponent,
    MenloCurrentWeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    WeatherService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
