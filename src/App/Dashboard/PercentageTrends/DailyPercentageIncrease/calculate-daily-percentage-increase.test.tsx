import { Timeseries } from '../../types/Timeseries';
import calculateDailyPercentageIncrease from './calculate-daily-percentage-increase';

describe('calculate-daily-percentage-increase', () => {
  test('returns daily percentage increases', () => {
    const dailyCases: Timeseries = {
      dates: [new Date(), new Date(), new Date()],
      countries: {
        someCountry: [5, 15, 30],
      },
    };

    const { someCountry: dailyIncreases } = calculateDailyPercentageIncrease(
      dailyCases
    ).countries;

    expect(dailyIncreases[0]).toBe(1);
    expect(dailyIncreases[1].toFixed(2)).toBe('0.67');
    expect(dailyIncreases[2]).toBe(0.5);
  });
});
