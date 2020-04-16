import { Timeseries } from '../types/Timeseries';
import calculateVolumesToDifferences from '../shared-calculations/calculate-volumes-to-differences';

const calculateDailyAbsoluteIncrease = (originalData: Timeseries) => {
  const dailyIncrease: Timeseries = {
    dates: [...originalData.dates],
    countries: {},
  };

  for (const countryName in originalData.countries) {
    dailyIncrease.countries[countryName] = calculateVolumesToDifferences(
      originalData.countries[countryName]
    );
  }

  return dailyIncrease;
};

export default calculateDailyAbsoluteIncrease;
