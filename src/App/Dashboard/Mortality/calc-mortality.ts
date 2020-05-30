import { Timeseries } from '../types/Timeseries';

const calcMortality = (
  cases: Timeseries,
  deaths: Timeseries
): Record<string, number> => {
  const result: Record<string, number> = {};

  for (const countryName in cases.countries) {
    const totalCases =
      cases.countries[countryName][cases.countries[countryName].length - 1];
    const totalDeaths =
      deaths.countries[countryName][deaths.countries[countryName].length - 1];

    const mortality = totalDeaths / totalCases;

    result[countryName] = mortality;
  }

  return result;
};

export default calcMortality;
