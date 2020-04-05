import Papa from 'papaparse';
import { Timeseries } from '../Timeseries';
import parseDate from './parse-date';

const NON_US_CASES_DATA_URL =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

const NON_US_DEATHS_DATA_URL =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const US_CASES_DATA_URL =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv';

const US_COUNTRY_NAME = 'United States';

const processNonUsData = (results: Papa.ParseResult) => {
  const rawData = results.data;
  const datesStartsFromIndex = 4;
  const dates = Object.keys(rawData[0])
    .slice(datesStartsFromIndex)
    .map(parseDate);

  const timeseries: Timeseries = {
    dates,
    countries: {},
  };

  for (let countryIndex = 0; countryIndex < rawData.length; countryIndex++) {
    const rawCountryData = rawData[countryIndex];
    const countryName = rawCountryData['Country/Region'];

    if (timeseries.countries[countryName]) {
      timeseries.countries[countryName] = Object.keys(rawCountryData)
        .slice(datesStartsFromIndex)
        .map(
          (date: string, index: number) =>
            parseInt(rawCountryData[date]) +
            timeseries.countries[countryName][index]
        );
    } else {
      timeseries.countries[countryName] = Object.keys(rawCountryData)
        .slice(datesStartsFromIndex)
        .map((date: string) => parseInt(rawCountryData[date]));
    }
  }

  return timeseries;
};

const getNonUsData = async (): Promise<Timeseries> => {
  return new Promise<Timeseries>((resolve) => {
    Papa.parse(NON_US_CASES_DATA_URL, {
      download: true,
      header: true,
      complete: (results: Papa.ParseResult) => {
        resolve(processNonUsData(results));
      },
    });
  });
};

const getNonUsDeaths = async (): Promise<Timeseries> => {
  return new Promise<Timeseries>((resolve) => {
    Papa.parse(NON_US_DEATHS_DATA_URL, {
      download: true,
      header: true,
      complete: (results: Papa.ParseResult) => {
        resolve(processNonUsData(results));
      },
    });
  });
};

const processUsData = (results: Papa.ParseResult) => {
  const rawData = results.data;
  const datesStartsFromIndex = 11;

  let usValues: number[] = [];

  for (let i = 0; i < rawData.length - 1; i++) {
    const rawStateData = rawData[i];

    if (i === 0) {
      usValues = Object.keys(rawStateData)
        .slice(datesStartsFromIndex)
        .map((date: string) => parseInt(rawStateData[date]));
    } else {
      usValues = Object.keys(rawStateData)
        .slice(datesStartsFromIndex)
        .map(
          (date: string, index: number) =>
            parseInt(rawStateData[date]) + usValues[index]
        );
    }
  }

  return usValues;
};

const getUsData = (): Promise<number[]> => {
  return new Promise((resolve) => {
    Papa.parse(US_CASES_DATA_URL, {
      download: true,
      header: true,
      complete: (results: Papa.ParseResult) => {
        resolve(processUsData(results));
      },
    });
  });
};

const getData = async () => {
  const timeseries = await getNonUsData();

  timeseries.countries[US_COUNTRY_NAME] = await getUsData();

  return timeseries;
};

export const getDeaths = async () => {
  const timeseries = await getNonUsDeaths();

  return timeseries;
};

export default getData;
