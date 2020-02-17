***Open this file in a markdown editor to see formatting***

**This one should be popular – not a lot of help on this topic on the internet. It took me (RBEL) quite a while to figure out the best way.**

***Example Code is on dev@menloinnovations GitHub account menlo-angular-unit-testing***
***As part of Orange/Green dotting, please make sure code snip-its match the example project (“...” in snip-its indicate that there is additional code in the example that is not needed for current context; this helps reduce snip-it sizes)

#Testing Angular Pipes in HTML Templates
##By Rob Bell, Senior Developer at Menlo Innovations

Most applications fetch data from an API and then present it to users on the screen. Usually the data we receive
is not in the best format to present to end users. Angular solves this problem with Pipes. Pipes allow you to format 
or transform your data directly in your HTML template. For example, displaying a date in a human readable form or UPPERCASEING a string.
They also offer a way to keep UI or display logic separate from business logic.

*<More explanation about pipes and why to use them?>*

Unit testing the pipes themselves is straightforward but testing their usage in the template can be tricky. 
This article will demonstrate one way to unit test a pipe as well as test that it is being used in a template.

In our example project, the temperature data we get from the weather API is in Celsius. This works great 
for most of the world, but our users in the United States will be more accustomed to seeing the temperature 
in Fahrenheit. This is where a pipe comes in handy. Let’s take a look at the fahrenheit.pipe.ts:

```fahrenheit.pipe.ts:```

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fahrenheit'})
export class FahrenheitPipe implements PipeTransform {
    transform(celsius: number): number {
        return Math.round(celsius * 1.8 + 32);
    }
}
```

Our pipe inherits the transform function from PipeTransform, which takes in the Celsius value, makes the conversion to Fahrenheit, 
and then rounds the result to a whole number. The @Pipe({name: 'fahrenheit'}) class decorator not only tells 
Angular that this class is a pipe, but also declares the name we 
will use to access this pipe in our HTML template. Outside of the @Pipe class decorator, pipes are 
simply a typescript class, so we will not need any special setup. Let’s take a quick look at our 
Fahrenheit pipe’s test:

```fahrenheit.pipe.spec.ts:```

```typescript
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

    for(let testCase of testCases) {
        expect(pipe.transform(testCase.celsius)).toEqual(testCase.fahrenheit);
    }
});
```

Our pipe needs to be included in our app.module.ts for our components to be able to use it.
If you use the Angular CLI ng generate command to create your pipes, it does this for you automatically!

```app.module.ts```

```typescript
declarations: [
    …
    FahrenheitPipe
],
```
Now we can look at how we actually use our pipe. In our menlo-current-weather.component.html we display the current, 
high, and low temperatures as list items The temperatures come from the currentWeatherModel object that originally came from 
the API call.

```menlo-current-weather.component.html:```
```html
<ul class="list-group list-group-flush">
    <li class="list-group-item">
        <strong>Current:</strong> {{currentWeatherModel.currentTemp | fahrenheit}}
    </li>
    <li class="list-group-item">
        <strong>High:</strong> {{currentWeatherModel.highTemp | fahrenheit}}
    </li>
    <li class="list-group-item">
        <strong>Low:</strong> {{currentWeatherModel.lowTemp | fahrenheit}}
    </li>
</ul>
```
As you can see above, using the pipe is as simple as using the ‘|‘ (pipe) operator after our value that we want to 
transform, then referring to our pipe by its name. And user will be see the temperature in Fahrenheit instead 
of Celsius.

Now comes the interesting part. How do we test that we are using our pipe in our component’s unit test? 
We could do the Fahrenheit-to-Celsius conversion ourselves in our test to get our expected value, but this is 
not the best idea. If our pipe’s functionality changes (for example, we want to show the temperature up to 2 
decimal points) then our components tests will fail. This coupling between our pipe and our component’s test 
would become increasingly difficult to maintain as our project increases in size. Fortunately, there is a better 
way; we can mock our pipe in our component’s test and configure it to return a specific response based on what is 
passed to the pipe’s transform function.

First, we need to configure our beforeEach to register our mock pipe with the TestingModule:

```menlo-current-weather.component.spec.ts:```
```typescript
let MockFahrenheitPipe = TestDouble.constructor(FahrenheitPipe);

beforeEach(async(() => {
...
    TestBed.configureTestingModule({
        declarations: [
            MenloCurrentWeatherComponent,
            MockFahrenheitPipe
        ],
        providers: [
            { provide: WeatherService, useValue: new MockWeatherService() }
        ]
    }).compileComponents();
}));
```

In our test, we are going to have to tell our mock pipe what to return and when. Using Test Double, we can make it 
so that when ’70.1’ (the current temperature we told our the MockWeatherService to return), is passed to the 
transform function of our mock pipe, it will return ‘56’. Obviously, 70.1 degrees Celsius is not ‘56’ degrees 
Fahrenheit, but that is not the focus of our test here. By asserting that the list item that is rendered by the 
HTML has a value of ‘56’ instead of ’70.1’, we can confirm that we are using our pipe where we intended, and that 
it is being passed the correct value.

```typescript
it('should display the current temperature', async(() => {
    expectedCurrentWeatherModel.currentTemp = 70.1;
    let expectedCurrentTemp = '56';

    TestDouble
        .when(MockFahrenheitPipe.prototype.transform(expectedCurrentWeatherModel.currentTemp))
        .thenReturn(expectedCurrentTemp);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
        fixture.detectChanges();

        const DOM = fixture.debugElement.nativeElement;

        let unorderedListItems = DOM.querySelectorAll('div.card > div.card-body > ul.list-group.list-group-flush > li.list-group-item');

        let currentTempListItem = unorderedListItems[0];

        expect(currentTempListItem.innerText).toEqual(`Current: ${expectedCurrentTemp}`);
        expect(currentTempListItem.querySelector('strong').innerText).toEqual(`Current:`);

	});
}));
```


CONCLUSION 

We often don't see developers writing front end unit tests even though using a pipe adds logic to the front end. 
Our example shows how to use the Test Double mocking framework and a little bit of setup makes it easy for developers 
to write front end unit tests.

<!---
pipes are awesome! they allow clear separation of presentation from logic for inclusion in templates.

Pipes are a feature of Angular that allow you to format or transform your data directly in your HTML template. 
Sometimes our data is not always in the best format to present to end users.

Pipes offer a simple and convenient way to perform on-the-fly data transformations and keep UI logic separate 
from business logic but testing them can be tricky.

--->
