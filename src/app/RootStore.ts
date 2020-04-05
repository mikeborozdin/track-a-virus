import { observable, runInAction, action } from 'mobx';
import randomcolor from 'randomcolor';
import DataStore from './DataStore';
import { Timeseries } from './Timeseries';

export default class RootStore {
  @observable
  public finishedProcessing = false;

  @observable
  public countries: string[] = null;

  @observable
  public countryColors: Record<string, string> = {};

  @observable
  public data: Timeseries;

  @observable
  public dataForSelectedCountries: Timeseries = null;

  @action.bound
  public async init() {
    const dataStore = new DataStore();
    const data = await dataStore.getData();

    runInAction(() => {
      this.data = data;

      const countries = Object.keys(this.data.countries);
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
        dates: [...this.data.dates],
        countries: {},
      };

      for (const country of countriesToCompare) {
        dataForSelectedCountries.countries[country] = [
          ...this.data.countries[country],
        ];
      }

      this.dataForSelectedCountries = dataForSelectedCountries;
    } else {
      this.dataForSelectedCountries = null;
    }
  }
}

export interface AllStores {
  rootStore: RootStore;
}
