import { FahrenheitPipe } from './fahrenheit.pipe';

describe('FahrenheitPipe', () => {

  it('create an instance', () => {
    const pipe = new FahrenheitPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert from celsius to fahrenheit', () => {
    const pipe = new FahrenheitPipe();

    let testCases = [
      {fahrenheit: 32, celsius: 0},
      {fahrenheit: 110, celsius: 43.3422},
      {fahrenheit: 72, celsius: 22.121},
      {fahrenheit: 64, celsius: 18},
      {fahrenheit: -15, celsius: -26.02},
      {fahrenheit: -1, celsius: -18.111111}
    ];

    for(let testCase of testCases){
      expect(pipe.transform(testCase.celsius)).toEqual(testCase.fahrenheit);
    }

  });

});
