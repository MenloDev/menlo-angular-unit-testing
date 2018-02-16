import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../weather-service/weather.service";
import CurrentWeather from "../weather-service/current-weather.model";

@Component({
  selector: 'menlo-current-weather',
  templateUrl: './menlo-current-weather.component.html',
  styleUrls: ['./menlo-current-weather.component.css']
})
export class MenloCurrentWeatherComponent implements OnInit {

  public currentWeatherModel: CurrentWeather;

  constructor(private weatherService: WeatherService){}

  ngOnInit() {
    this.weatherService.getCurrentMenloWeather().then((currentWeather:CurrentWeather) => {
      this.currentWeatherModel = currentWeather;
      console.log("WE HAVE WEATHER!")
    })
  }

}
