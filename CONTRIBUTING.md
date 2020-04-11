# Contributing

## Roadmap

We have a lot of ambitions, that's why we've put effort in [the project roadmap](https://github.com/mikeborozdin/track-a-virus/projects/1).

So if you want to help with features or bug fixes, it'll be great if you start with something that is already on top of the roadmap.

But... it's an open source project - and we welcome all contributions. So if you feel that you prefer to work on a small bug fix or a feature, which is not on top of the list, your contribution is still more than appreciated.

Just fork the repository and submit a PR. We'll review your code - and hopefully merge it in no time.

## Architecture & code

A few key points about the architecture:

- The main component is `Dashboard`
- It starts data load by calling `DashboardStore.init()`
- Once the data is loaded it'll be available on `DashboardStore.allCase` and `DashboardStore.allDeaths`
  - Please, see the section below about the data structure
- When a user wants to compare specific countries, we populate populate `DashboardStore.selectedCountryCases` and `DashboardStore.selectedCountryDeaths`
- Those variables are passed to specific components that show comparison between different countries

### Data structure

All the data, whether it's all global data - `DashboardStore.allCases` or a projected for specific countries `DashboardStore.selectedCountryCases` are of the `Timeseries` type which can be visualised in this way:

```ts
const sample: Timeseries = {
  dates: [new Date(2020, 4, 10), new Date(2020, 4, 9)],
  countries: {
    'Country A': [100, 120],
    'Country B': [200, 240],
  },
};
```

**All global data is also represented as a country in the same variable. The 'country name is `DashboardStore.WORLD_NAME`**.

### Developing a new dashboard component

Imagine you want to add a new dashboard component that, for example, shows [a growth rate](https://github.com/mikeborozdin/track-a-virus/issues/19) for selected countries. So all you need to do is the following:

- Create a new component and place it in its own folder in the `./src/Dashboard` directory. Say, `./src/Dashboard/GrowthRate/GrowthRate.tsx`.
- Add it to `Dashboard`, specifically to the `renderDataForSelectedCountries()` function
  - Something like this: `<GrowthRate data={data} countryColors={countryColors} />`
  - `renderDataForSelectedCountries()` will display the component for both cases and deaths
  - And it will pass a variable `data` - an instance of `Timeseries` to your component
  - That variable will include the daily data for the selected countries
  - You may not need the `countryColors` prop if you're splitting data by countries
  - It'll be either cases or deaths, depending on the the arguments `renderDataForSelectedCountries()` is called with
- Now it's time to implement the `GrowthRate` component itself

  - And then it is entirely up to you how you write your component!
  - The pattern so far is to have a helper function that processes input data
  - In this case with the growth rate you may want to transform a number of daily cases/deaths into first absolute increases and then percentages
  - It is likely that your component will end up looking like `<DailyIncrease>`:

  ```tsx
  import React, { FC } from 'react';
  import BarChart from '../charts/BarChart/BarChart';
  import LineChart from '../charts/LineChart/LineChart';
  import { Timeseries } from '../types/Timeseries';
  import calculateDailyAbsoluteIncrease from './calculate-daily-absolute-increase';
  import CountryColors from '../types/CountryColors';

  interface Props {
    data: Timeseries;
    countryColors: CountryColors;
  }

  const GrowthRate: FC<Props> = ({ data, countryColors }) => {
    const Chart = Object.keys(data.countries).length > 1 ? LineChart : BarChart;

    return (
      <>
        <div>Daily increase</div>
        <Chart data={calculateGrowthRate(data)} countryColors={countryColors} />
      </>
    );
  };

  export default GrowthRate;
  ```

- And then all you need is to implement that `calculateGrowthRate()` function.
  - Check with existing functions like `./src/DailyAbsoluteIncrease/calculate-daily-absolute-increase.ts`
  - Or `./src/App/Dashboard/DailyPercentageIncrease/calculate-daily-percentage-increase.ts`

### Unit testing

We use Jest and Enzyme for unit testing. When it comes to testing components we prefer to test it from the user perspective, i.e. what happens when a user presses on a certain about or what is shown when the data is loaded or not. It's possible to do that with shallow rendering. And it doesn't carry risk that of full rendering when children have side-effects.

In order to test components that rely on `useEffect` we use the [jest-react-hooks-shallow-library](https://github.com/mikeborozdin/jest-react-hooks-shallow).
