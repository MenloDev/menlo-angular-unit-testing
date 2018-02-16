import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../weather-service/weather.service";

@Component({
  selector: 'menlo-current-weather',
  templateUrl: './menlo-current-weather.component.html',
  styleUrls: ['./menlo-current-weather.component.css']
})
export class MenloCurrentWeatherComponent implements OnInit {

  constructor(private weatherService: WeatherService){}

  ngOnInit() {
    this.weatherService.getCurrentMenloWeather().then((weatherData) => {
      console.log("Weather Data: ", weatherData)
    })
  }

}
