import { action, observable } from 'mobx';
import Papa from 'papaparse';
import { Timeseries } from './Timeseries';

export default class DataStore {
  private COUNTRY_DATA_URL =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

  @observable
  public data: Timeseries;

  @action.bound
  public async getData() {
    const promise: Promise<void> = new Promise<void>((resolve) => {
      Papa.parse(this.COUNTRY_DATA_URL, {
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

          this.data = timeseries;

          resolve();
        },
      });
    });

    return promise;
  }
}
