import { Timeseries } from '../../types/Timeseries';
import calculateDailyIncreaseMovingAverage from './calculate-daily-increase-moving-average';
import calculateVolumesToDifferences from '../../shared-calculations/calculate-volumes-to-differences';
import { ma } from 'moving-averages';

jest.mock('../../shared-calculations/calculate-volumes-to-differences', () =>
  jest.fn()
);
jest.mock('moving-averages', () => ({ ma: jest.fn() }));

const calculateVolumesToDifferencesMock = calculateVolumesToDifferences as jest.Mock<
  number[]
>;
const maMock = ma as jest.Mock<number[]>;

const DAILY_DIFFS = [1, 2, 3];
calculateVolumesToDifferencesMock.mockReturnValue(DAILY_DIFFS);

const EXPECTED_RESULT = [10, 20, 40];
maMock.mockReturnValue(EXPECTED_RESULT);

describe('calculate-daily-increase-moving-average', () => {
  test('calculates moving averages as first getting daily differences and then applying a moving average onto them', () => {
    const dailyCases: Timeseries = {
      dates: [new Date(), new Date(), new Date()],
      countries: {
        someCountry: [5, 15, 30],
      },
    };

    const movingAverageLength = 3;

    const movingAverages = calculateDailyIncreaseMovingAverage(
      dailyCases,
      movingAverageLength
    );

    expect(calculateVolumesToDifferencesMock).toHaveBeenCalledWith(
      dailyCases.countries.someCountry
    );
    expect(maMock).toHaveBeenCalledWith(DAILY_DIFFS, movingAverageLength);

    expect(movingAverages.countries.someCountry).toMatchObject(EXPECTED_RESULT);
  });
});
