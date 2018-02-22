import { WeatherService } from './weather.service';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import CurrentWeather from "../current-weather-model/current-weather.model";

let TestDouble = require('testdouble');

describe('WeatherService', () => {
  let weatherService;

  let MockHttpClientConstructor = TestDouble.constructor(HttpClient);
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = new MockHttpClientConstructor();
    weatherService = new WeatherService(mockHttpClient);
  });

  it('should be created', () => {
    expect(weatherService).toBeTruthy();
  });

  it('should call get on the HttpClient with the correct URL', () => {
    weatherService.getCurrentMenloWeather();

    TestDouble.verify(mockHttpClient.get("https://crossorigin.me/https://www.metaweather.com/api/location/2391585/"))
  });

  it('should subscribe to HttpClient.get() and resolve a promise when updated with the http response', (done: DoneFn) => {

    let weatherJson = {
      "consolidated_weather": [
        {
          "weather_state_name": "Showers",
          "weather_state_abbr": "s",
          "wind_direction_compass": "NNW",
          "min_temp": -3.5219999999999998,
          "max_temp": 5.2275000000000009,
          "the_temp": 1.6899999999999999,
          "wind_speed": 8.5681496927177285,
          "wind_direction": 336.35076544904433
        }
      ]
    };

    let expectedCurrentWeatherModel = CurrentWeather.fromJson(weatherJson);

    let MockObservableConstructor = TestDouble.constructor(Observable);
    let mockObservable = new MockObservableConstructor();

    TestDouble.when(mockObservable.subscribe()).thenCallback(weatherJson);
    TestDouble.when(mockHttpClient.get(TestDouble.matchers.anything())).thenReturn(mockObservable);

    weatherService.getCurrentMenloWeather().then((actualCurrentWeatherModel) => {
     expect(actualCurrentWeatherModel).toEqual(expectedCurrentWeatherModel);
     done()
    });

  });

});
