import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MenloCurrentWeatherComponent} from './menlo-current-weather.component';
import {WeatherService} from "../weather-service/weather.service";
import CurrentWeather from "../weather-service/current-weather.model";

let TestDouble = require('testdouble');

describe('MenloCurrentWeatherComponent', () => {
  let MockWeatherServiceConstructor = TestDouble.constructor(WeatherService);
  let mockWeatherService;
  let expectedCurrentWeatherModel;

  let component: MenloCurrentWeatherComponent;
  let fixture: ComponentFixture<MenloCurrentWeatherComponent>;


  beforeEach(async(() => {

    expectedCurrentWeatherModel = new CurrentWeather();
    mockWeatherService = new MockWeatherServiceConstructor();
    TestDouble.when(mockWeatherService.getCurrentMenloWeather()).thenResolve(expectedCurrentWeatherModel);

    TestBed.configureTestingModule({
      declarations: [MenloCurrentWeatherComponent],
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
    expectedCurrentWeatherModel.windDirection = "NNW";

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.currentWeatherModel).toEqual(expectedCurrentWeatherModel)
    });

  }));

  describe('MenloCurrentWeatherComponent - HTML', () => {

    it('should display an icon that represents the current weather state', async(() => {
      expectedCurrentWeatherModel.stateAbbreviation = "sn";

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const DOM = fixture.debugElement.nativeElement;

        expect(DOM.querySelector('div.card > img.card-img-top').getAttribute('src'))
          .toEqual(`https://www.metaweather.com/static/img/weather/${expectedCurrentWeatherModel.stateAbbreviation}.svg`)
      });
    }));

    it('should display text that represents the current weather in the card title', async(() => {
      expectedCurrentWeatherModel.stateName = "Sunny";

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const DOM = fixture.debugElement.nativeElement;

        expect(DOM.querySelector('div.card > div.card-body > h5.card-title').innerText)
          .toEqual(expectedCurrentWeatherModel.stateName)
      });
    }));

    it('should display an unordered list below that card title with items: current temp, high temp, and low temp', async(() => {
      expectedCurrentWeatherModel.currentTemp = 70.1;
      expectedCurrentWeatherModel.highTemp = 81.3;
      expectedCurrentWeatherModel.lowTemp = 67.4;

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const DOM = fixture.debugElement.nativeElement;

        let unorderedListItems = DOM.querySelectorAll('div.card > div.card-body > ul.list-group.list-group-flush > li.list-group-item');

        expect(unorderedListItems.length).toEqual(3);

        checkTemperatureListItems(expectedCurrentWeatherModel.currentTemp, 'Current', unorderedListItems[0]);
        checkTemperatureListItems(expectedCurrentWeatherModel.highTemp, 'High', unorderedListItems[1]);
        checkTemperatureListItems(expectedCurrentWeatherModel.lowTemp, 'Low', unorderedListItems[2]);

      });
    }));

    function checkTemperatureListItems(expectedTemperature: number, expectedLabel: String, listItem: any) {
      expect(listItem.innerText).toEqual(`${expectedLabel}: ${expectedTemperature}`);
      expect(listItem.querySelector('strong').innerText).toEqual(`${expectedLabel}:`);
    }

  });

});
