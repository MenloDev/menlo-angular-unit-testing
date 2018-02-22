import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fahrenheit'})
export class FahrenheitPipe implements PipeTransform {

  transform(celsius: number): number {
    return Math.round(celsius * 1.8 + 32);
  }

}
