export default class CurrentWeather {

  public stateName: string;
  public stateAbbreviation: string;

  public lowTemp: number;
  public highTemp: number;
  public currentTemp: number;

  public windDirection: string;
  public windSpeed: number;

  public static fromJson(json: Object) {

    const currentWeather = new CurrentWeather();

    if (json['consolidated_weather']) {
      const consolidatedWeather = json['consolidated_weather'];

      if (consolidatedWeather.length > 0) {
        const currentWeatherJson = consolidatedWeather[0];

        currentWeather.stateName = currentWeatherJson['weather_state_name'];
        currentWeather.stateAbbreviation = currentWeatherJson['weather_state_abbr'];

        currentWeather.lowTemp = currentWeatherJson['min_temp'];
        currentWeather.highTemp = currentWeatherJson['max_temp'];
        currentWeather.currentTemp = currentWeatherJson['the_temp'];

        currentWeather.windDirection = currentWeatherJson['wind_direction_compass'];
        currentWeather.windSpeed = currentWeatherJson['wind_speed'];
      }
    }

    return currentWeather;
  }

}
