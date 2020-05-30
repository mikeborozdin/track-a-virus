import calcMortality from './calc-mortality';
import { Timeseries } from '../types/Timeseries';

describe('calc-mortality', () => {
  test('calculates mortality rate period on period for every country', () => {
    const cases: Timeseries = {
      dates: [new Date()],
      countries: {
        someCountry: [100],
      },
    };

    const deaths: Timeseries = {
      dates: [new Date()],
      countries: {
        someCountry: [5],
      },
    };

    const mortality = calcMortality(cases, deaths);

    expect(mortality.someCountry).toBe(0.05);
  });
});
