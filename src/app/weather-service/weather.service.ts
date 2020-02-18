import { Injectable } from '@angular/core';
import CurrentWeather from '../current-weather-model/current-weather.model';

@Injectable()
export class WeatherService {

  constructor() {}

  getCurrentMenloWeather() {

  const currentWeatherData =   {
      'consolidated_weather': [
      {
        'weather_state_name': 'Showers',
        'weather_state_abbr': 's',
        'wind_direction_compass': 'NNW',
        'min_temp': -3.5219999999999998,
        'max_temp': 5.2275000000000009,
        'the_temp': 1.6899999999999999,
        'wind_speed': 8.5681496927177285,
        'wind_direction': 336.35076544904433
      }
    ]
    };

    return new Promise((resolve) => {
          resolve(CurrentWeather.fromJson(currentWeatherData));
      });
  }
}
