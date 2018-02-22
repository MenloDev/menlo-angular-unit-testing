import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MenloCurrentWeatherComponent} from "./menlo-current-weather/menlo-current-weather.component";
import {FahrenheitPipe} from "./weather-service/fahrenheit.pipe";

let TestDouble = require('testdouble');

describe('AppComponent', () => {

  let fixture;

  beforeEach(
    async(() => {

      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          TestDouble.constructor(MenloCurrentWeatherComponent),
          TestDouble.constructor(FahrenheitPipe)
        ],
        providers: []
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render a menlo-current-weather component', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('menlo-current-weather')).toBeTruthy();
  }));

});
