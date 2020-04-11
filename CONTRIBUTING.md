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

If you want to develop a new dashboard component, most likely you can follow the existing patterns. For example, let's have a look at the `DailyAbsoluteIncrease` component.

When we render it, we just pass a data projection and country colors:

```jsx
<DailyAbsoluteIncrease data={data} countryColors={countryColors} />
```

In this, case `data` is an instance of `Timeseries` that only have countries chosen in the select box. So your component doesn't need to worry about it at all.

Then in the component implementation you can do whatever magic you want with that data. In the case of `DailyAbsoluteIncrease` we just call a helper function `calculateDailyAbsoluteIncrease()` that transforms the daily cases into the absolute increases for every single day.

### Unit testing

We use Jest and Enzyme for unit testing. When it comes to testing components we prefer to test it from the user perspective, i.e. what happens when a user presses on a certain about or what is shown when the data is loaded or not. It's possible to do that with shallow rendering. And it doesn't carry risk that of full rendering when children have side-effects.

In order to test components that rely on `useEffect` we use the [jest-react-hooks-shallow-library](https://github.com/mikeborozdin/jest-react-hooks-shallow).
