import { action, observable } from 'mobx';
import Papa from 'papaparse';
import { Timeseries } from './Timeseries';

export default class DataStore {
  private NON_US_DATA_URL =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

  private US_DATA_URL =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv';

  @observable
  public data: Timeseries;

  private async getUsData(): Promise<number[]> {
    return new Promise((resolve) => {
      Papa.parse(this.US_DATA_URL, {
        download: true,
        header: true,
        complete: (results: Papa.ParseResult) => {
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

          resolve(usValues);
        },
      });
    });
  }

  @action.bound
  public async getData() {
    const timeseries = await this.fetchAndProcessNonUsData();

    timeseries.countries['United States'] = await this.getUsData();

    this.data = timeseries;
  }

  private async fetchAndProcessNonUsData(): Promise<Timeseries> {
    return new Promise<Timeseries>((resolve) => {
      Papa.parse(this.NON_US_DATA_URL, {
        download: true,
        header: true,
        complete: (results: Papa.ParseResult) => {
          const rawData = results.data;
          const datesStartsFromIndex = 4;
          const dates = Object.keys(rawData[0]).slice(datesStartsFromIndex);

          const timeseries: Timeseries = {
            dates,
            countries: {},
          };

          for (
            let countryIndex = 0;
            countryIndex < rawData.length;
            countryIndex++
          ) {
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

          resolve(timeseries);
        },
      });
    });
  }
}
