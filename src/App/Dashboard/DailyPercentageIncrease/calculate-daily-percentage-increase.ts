import { Timeseries } from '../types/Timeseries';

const calculateDailyPercentageIncrease = (originalData: Timeseries) => {
  const dailyIncreasePercentage: Timeseries = {
    dates: [...originalData.dates],
    countries: {},
  };

  for (const countryName in originalData.countries) {
    dailyIncreasePercentage.countries[countryName] = originalData.countries[
      countryName
    ].map((currentVolume, index, originalCountryData) => {
      if (index === 0) {
        return currentVolume > 0 ? 1 : 0;
      } else {
        return (currentVolume - originalCountryData[index - 1]) / currentVolume;
      }
    });
  }

  return dailyIncreasePercentage;
};

export default calculateDailyPercentageIncrease;
