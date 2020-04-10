import { observable, runInAction, action, computed } from 'mobx';
import { Timeseries } from '../types/Timeseries';
import { getCases, getDeaths, WORLD_NAME } from './data/get-data';
import getRandomCountryColors from './get-random-colors';
import CountryColors from '../types/CountryColors';

export default class DashboardStore {
  public WORLD_NAME = WORLD_NAME;

  @observable
  public countries: string[] = null;

  @observable
  public countryColors: CountryColors = {};

  @observable
  public allCases: Timeseries = null;

  @observable
  public allDeaths: Timeseries = null;

  @observable
  public selectedCountriesCases: Timeseries = null;

  @observable
  public selectedCountriesDeaths: Timeseries = null;

  @computed
  get dateUpdated() {
    return this.allCases.dates[
      this.allCases.dates.length - 1
    ].toLocaleDateString('en-gb', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  @action.bound
  public async init() {
    const cases = await getCases();
    const deaths = await getDeaths();

    runInAction(() => {
      this.allCases = cases;
      this.allDeaths = deaths;

      const countries = Object.keys(this.allCases.countries);
      this.countries = countries;
      this.countryColors = getRandomCountryColors(countries);
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
}
