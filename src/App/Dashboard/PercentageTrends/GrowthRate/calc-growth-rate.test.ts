import calcGrowthRate from './calc-growth-rate';
import { Timeseries } from '../../types/Timeseries';

describe('calc-growth-rate', () => {
  test('calculates growth rate period on period for every country as growth rate of averages', () => {
    const dailyCases: Timeseries = {
      dates: [new Date(), new Date(), new Date()],
      countries: {
        someCountry: [10, 20, 25, 30],
      },
    };

    const periodLength = 2;

    const growthRate = calcGrowthRate(dailyCases, periodLength);

    expect(growthRate.someCountry).toBe(-0.5);
  });
});
