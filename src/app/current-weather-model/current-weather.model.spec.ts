import CurrentWeather from './current-weather.model';

describe('Current Weather Model', () => {

  beforeEach(() => {});

  it('fromJson should build a CurrentWeatherModel with correctly assigned properties from the JSON object', () => {

    const expectedWeatherStateName = 'Showers';
    const expectedWeatherStateAbbr = 's';
    const expectedMinTemp = -3.5219999999999998;
    const expectedMaxTemp = 5.2275000000000009;
    const expectedTheTemp = 1.6899999999999999;
    const expectedWindSpeed = 8.5681496927177285;
    const expectedWindDirection = 'NNW';

    const weatherJson = {
      'consolidated_weather': [
        {
          'weather_state_name': expectedWeatherStateName,
          'weather_state_abbr': expectedWeatherStateAbbr,
          'wind_direction_compass': expectedWindDirection,
          'min_temp': expectedMinTemp,
          'max_temp': expectedMaxTemp,
          'the_temp': expectedTheTemp,
          'wind_speed': expectedWindSpeed,
          'wind_direction': 336.35076544904433
        },
        {
          'weather_state_name': 'Heavy Cloud',
          'weather_state_abbr': 'hc',
          'wind_direction_compass': 'SW',
          'min_temp': -7.8079999999999998,
          'max_temp': 0.42749999999999999,
          'the_temp': -0.5149999999999999,
          'wind_speed': 8.1895541140857411,
          'wind_direction': 233.07536762315618,
          'air_pressure': 1014.7850000000001
        },
      ],
      'time': '2018-02-16T09:36:23.181680-05:00',
      'sun_rise': '2018-02-16T07:27:09.387180-05:00',
      'sun_set': '2018-02-16T18:05:54.522702-05:00'
    };

    const currentWeatherModel = CurrentWeather.fromJson(weatherJson);

    expect(currentWeatherModel.stateName).toEqual(expectedWeatherStateName, 'State Name is not correct!');
    expect(currentWeatherModel.stateAbbreviation).toEqual(expectedWeatherStateAbbr, 'State Abbreviation is not correct!');
    expect(currentWeatherModel.lowTemp).toEqual(expectedMinTemp, 'Low Temp is not correct!');
    expect(currentWeatherModel.highTemp).toEqual(expectedMaxTemp, 'High Temp is not correct!');
    expect(currentWeatherModel.currentTemp).toEqual(expectedTheTemp, 'Current Temp is not correct!');
    expect(currentWeatherModel.windSpeed).toEqual(expectedWindSpeed, 'Wind Speed is not correct!');
    expect(currentWeatherModel.windDirection).toEqual(expectedWindDirection, 'Wind Direction is not correct!');

  });

  it('fromJson should return an empty CurrentWeatherModel if the consolidated_weather array is empty in the JSON object', () => {

    const weatherJson = {
      'consolidated_weather': [],
      'time': '2018-02-16T09:36:23.181680-05:00',
      'sun_rise': '2018-02-16T07:27:09.387180-05:00',
      'sun_set': '2018-02-16T18:05:54.522702-05:00'
    };

    const currentWeatherModel = CurrentWeather.fromJson(weatherJson);

    expect(currentWeatherModel.stateName).toBeUndefined('State Name should be undefined');
    expect(currentWeatherModel.stateAbbreviation).toBeUndefined('State Abbreviation should be undefined');
    expect(currentWeatherModel.lowTemp).toBeUndefined('Low Temp should be undefined');
    expect(currentWeatherModel.highTemp).toBeUndefined('High Temp should be undefined');
    expect(currentWeatherModel.currentTemp).toBeUndefined('Current Temp should be undefined');
    expect(currentWeatherModel.windSpeed).toBeUndefined('Wind Speed should be undefined');
    expect(currentWeatherModel.windDirection).toBeUndefined('Wind Direction should be undefined');

  });

  it('fromJson should return an empty CurrentWeatherModel if given an empty JSON object', () => {

    const currentWeatherModel = CurrentWeather.fromJson({});

    expect(currentWeatherModel.stateName).toBeUndefined('State Name should be undefined');
    expect(currentWeatherModel.stateAbbreviation).toBeUndefined('State Abbreviation should be undefined');
    expect(currentWeatherModel.lowTemp).toBeUndefined('Low Temp should be undefined');
    expect(currentWeatherModel.highTemp).toBeUndefined('High Temp should be undefined');
    expect(currentWeatherModel.currentTemp).toBeUndefined('Current Temp should be undefined');
    expect(currentWeatherModel.windSpeed).toBeUndefined('Wind Speed should be undefined');
    expect(currentWeatherModel.windDirection).toBeUndefined('Wind Direction should be undefined');

  });

});
