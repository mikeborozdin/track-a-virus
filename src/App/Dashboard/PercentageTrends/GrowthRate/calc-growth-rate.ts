import { Timeseries } from '../../types/Timeseries';
import calculateVolumesToDifferences from '../../shared-calculations/calculate-volumes-to-differences';
import average from '../../shared-calculations/average';

const calcCountryMovingAvgDiff = (data: Timeseries, periodLength: number) => {
  const result: Record<string, number> = {};

  for (const countryName in data.countries) {
    const dailyDifferences = calculateVolumesToDifferences(
      data.countries[countryName]
    );

    const previousMovingAvg = average(
      dailyDifferences.slice(
        dailyDifferences.length - periodLength * 2,
        dailyDifferences.length - periodLength
      )
    );

    const currentMovingAvg = average(
      dailyDifferences.slice(dailyDifferences.length - periodLength)
    );

    result[countryName] = currentMovingAvg / previousMovingAvg - 1;
  }

  return result;
};

export default calcCountryMovingAvgDiff;
