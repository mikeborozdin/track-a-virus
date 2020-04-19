import { ma } from 'moving-averages';
import { Timeseries } from '../../types/Timeseries';
import calculateVolumesToDifferences from '../../shared-calculations/calculate-volumes-to-differences';

const calculateDailyIncreaseMovingAverage = (
  originalData: Timeseries,
  movingAverageLength: number
) => {
  const result: Timeseries = {
    dates: [...originalData.dates],
    countries: {},
  };

  for (const countryName in originalData.countries) {
    const dailyIncreases = calculateVolumesToDifferences(
      originalData.countries[countryName]
    );

    const movingAverages = ma(dailyIncreases, movingAverageLength);

    result.countries[countryName] = movingAverages;
  }

  return result;
};

export default calculateDailyIncreaseMovingAverage;
