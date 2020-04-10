import { Timeseries } from '../types/Timeseries';

const calculateDailyIncrease = (originalData: Timeseries) => {
  const dailyIncrease: Timeseries = {
    dates: [...originalData.dates],
    countries: {},
  };

  for (const countryName in originalData.countries) {
    dailyIncrease.countries[countryName] = originalData.countries[
      countryName
    ].map((currentVolume, index, originalCountryData) => {
      if (index === 0) {
        return currentVolume;
      } else {
        return currentVolume - originalCountryData[index - 1];
      }
    });
  }

  return dailyIncrease;
};

export default calculateDailyIncrease;
