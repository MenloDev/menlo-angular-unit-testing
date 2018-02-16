import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenloCurrentWeatherComponent } from './menlo-current-weather.component';
import {WeatherService} from "../weather-service/weather.service";
import CurrentWeather from "../weather-service/current-weather.model";
let TestDouble = require('testdouble');

describe('MenloCurrentWeatherComponent', () => {
  let MockWeatherServiceConstructor = TestDouble.constructor(WeatherService);
  let mockWeatherService;

  let component: MenloCurrentWeatherComponent;
  let fixture: ComponentFixture<MenloCurrentWeatherComponent>;

  beforeEach(async(() => {

    mockWeatherService = new MockWeatherServiceConstructor();
    TestDouble.when(mockWeatherService.getCurrentMenloWeather()).thenResolve(new CurrentWeather());

    TestBed.configureTestingModule({
      declarations: [ MenloCurrentWeatherComponent ],
      providers: [
        {
          provide: WeatherService,
          useValue: mockWeatherService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenloCurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch the current weather from the WeatherService', async(() => {
    let expectedCurrentWeatherModel = new CurrentWeather();
    expectedCurrentWeatherModel.windDirection = "NNW";

    TestDouble.when(mockWeatherService.getCurrentMenloWeather()).thenResolve(expectedCurrentWeatherModel);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.currentWeatherModel).toEqual(expectedCurrentWeatherModel)
    });

  }));

  describe('MenloCurrentWeatherComponent - HTML', () => {

    fit('should display an icon that represents the current weather state - Test Case 1', async(() => {
      let expectedCurrentWeatherModel = new CurrentWeather();
      expectedCurrentWeatherModel.stateAbbreviation = "sn";

      TestDouble.when(mockWeatherService.getCurrentMenloWeather()).thenResolve(expectedCurrentWeatherModel);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const DOM = fixture.debugElement.nativeElement;

        console.log('DOM: ', DOM);

        expect(DOM.querySelector('div.card > img.card-img-top').getAttribute('src'))
          .toEqual(`https://www.metaweather.com/static/img/waether/${expectedCurrentWeatherModel.stateAbbreviation}.svg`)
      });
    }));

  });

});
