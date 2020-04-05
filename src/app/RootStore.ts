import { observable, runInAction, action } from 'mobx';
import randomcolor from 'randomcolor';
import { Timeseries } from './Timeseries';
import getCases, { getDeaths } from './data/get-data';

export default class RootStore {
  @observable
  public countries: string[] = null;

  @observable
  public countryColors: Record<string, string> = {};

  @observable
  public allCases: Timeseries;

  @observable
  public allDeaths: Timeseries;

  @observable
  public aggregatedGlobalCases: Timeseries;

  @observable
  public selectedCountriesCases: Timeseries = null;

  @observable
  public selectedCountriesDeaths: Timeseries = null;

  @action.bound
  public async init() {
    const cases = await getCases();
    const deaths = await getDeaths();

    runInAction(() => {
      this.allCases = cases;
      this.allDeaths = deaths;
      this.aggregatedGlobalCases = this.getAggregatedGlobalCases(cases);

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
      this.selectedCountriesCases = this.filterCountries(
        this.allCases,
        countriesToCompare
      );

      this.selectedCountriesDeaths = this.filterCountries(
        this.allDeaths,
        countriesToCompare
      );
    } else {
      this.selectedCountriesCases = null;
      this.selectedCountriesDeaths = null;
    }
  }

  private filterCountries(data: Timeseries, countries: string[]) {
    const dataForSelectedCountries: Timeseries = {
      dates: [...data.dates],
      countries: {},
    };

    for (const country of countries) {
      dataForSelectedCountries.countries[country] = [
        ...data.countries[country],
      ];
    }

    return dataForSelectedCountries;
  }

  @action
  private getAggregatedGlobalCases(allCases: Timeseries) {
    const global: Timeseries = {
      dates: [...allCases.dates],
      countries: { global: [] },
    };

    global.countries.global = global.dates.map((_date, dateIndex) =>
      Object.values(allCases.countries).reduce(
        (totalOnDate, currentCountry) =>
          totalOnDate + currentCountry[dateIndex],
        0
      )
    );

    return global;
  }
}

export interface AllStores {
  rootStore: RootStore;
}
