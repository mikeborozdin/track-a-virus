import { observable, runInAction, action } from 'mobx';
import randomcolor from 'randomcolor';
import { Timeseries } from './Timeseries';
import getData from './data/get-data';

export default class RootStore {
  @observable
  public countries: string[] = null;

  @observable
  public countryColors: Record<string, string> = {};

  @observable
  public allCases: Timeseries;

  @observable
  public selectedCountriesCases: Timeseries = null;

  @action.bound
  public async init() {
    const data = await getData();

    runInAction(() => {
      this.allCases = data;

      const countries = Object.keys(this.allCases.countries);
      this.countries = countries;

      const colors = randomcolor({
        count: countries.length,
        luminosity: 'bright',
        hue: 'random',
      });

      const countryColors: Record<string, string> = {};

      for (let i = 0; i < countries.length; i++) {
        countryColors[countries[i]] = colors[i];
      }

      this.countryColors = countryColors;
    });
  }

  @action.bound
  public setCountriesToCompare(countriesToCompare?: string[]) {
    if (countriesToCompare) {
      const dataForSelectedCountries: Timeseries = {
        dates: [...this.allCases.dates],
        countries: {},
      };

      for (const country of countriesToCompare) {
        dataForSelectedCountries.countries[country] = [
          ...this.allCases.countries[country],
        ];
      }

      this.selectedCountriesCases = dataForSelectedCountries;
    } else {
      this.selectedCountriesCases = null;
    }
  }
}

export interface AllStores {
  rootStore: RootStore;
}
