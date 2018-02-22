import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import CurrentWeather from "../current-weather-model/current-weather.model";

@Injectable()
export class WeatherService {

  constructor(private httpClient: HttpClient) {}

  getCurrentMenloWeather(){
    return new Promise((resolve) => {
      this.httpClient.get("https://crossorigin.me/https://www.metaweather.com/api/location/2391585/")
        .subscribe(jsonResponse => {
          resolve(CurrentWeather.fromJson(jsonResponse));
      })
    });
  }

}
