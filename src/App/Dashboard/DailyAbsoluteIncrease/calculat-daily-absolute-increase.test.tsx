import { Timeseries } from '../types/Timeseries';
import calculateDailyAbsoluteIncrease from './calculate-absolute-daily-increase';

describe('calculate-daily-absolute-increase', () => {
  test('returns daily absolute increases', () => {
    const dailyCases: Timeseries = {
      dates: [new Date(), new Date(), new Date()],
      countries: {
        someCountry: [5, 15, 30],
      },
    };

    const { someCountry: dailyIncreases } = calculateDailyAbsoluteIncrease(
      dailyCases
    ).countries;

    expect(dailyIncreases[0]).toBe(5);
    expect(dailyIncreases[1]).toBe(10);
    expect(dailyIncreases[2]).toBe(15);
  });
});
