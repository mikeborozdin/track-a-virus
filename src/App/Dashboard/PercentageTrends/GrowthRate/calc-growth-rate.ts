import { Timeseries } from '../../types/Timeseries';
import calculateVolumesToDifferences from '../../shared-calculations/calculate-volumes-to-differences';
import average from '../../shared-calculations/average';

const MOVING_AVG_LENGTH = 7;

const calcCountryMovingAvgDiff = (data: Timeseries) => {
  const result: Record<string, number> = {};

  for (const countryName in data.countries) {
    const dailyDifferences = calculateVolumesToDifferences(
      data.countries[countryName]
    );

    const previousMovingAvg = average(
      dailyDifferences.slice(
        dailyDifferences.length - MOVING_AVG_LENGTH * 2,
        dailyDifferences.length - MOVING_AVG_LENGTH
      )
    );

    const currentMovingAvg = average(
      dailyDifferences.slice(dailyDifferences.length - MOVING_AVG_LENGTH)
    );

    result[countryName] = currentMovingAvg / previousMovingAvg - 1;
  }

  return result;
};

export default calcCountryMovingAvgDiff;
