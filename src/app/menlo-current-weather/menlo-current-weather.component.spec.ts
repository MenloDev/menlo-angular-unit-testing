import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenloCurrentWeatherComponent } from './menlo-current-weather.component';
import {WeatherService} from "../weather-service/weather.service";
let TestDouble = require('testdouble');

describe('MenloCurrentWeatherComponent', () => {
  let MockWeatherServiceConstructor = TestDouble.constructor(WeatherService);
  let mockWeatherService;

  let component: MenloCurrentWeatherComponent;
  let fixture: ComponentFixture<MenloCurrentWeatherComponent>;

  beforeEach(async(() => {

    mockWeatherService = new MockWeatherServiceConstructor();
    TestDouble.when(mockWeatherService.getCurrentMenloWeather()).thenResolve({});

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
