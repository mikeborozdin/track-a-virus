import DashboardStore from './DashboardStore';
import { getCases, getDeaths } from './data/get-data';
import getRandomCountryColors from './get-random-country-colors';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';

jest.mock('./data/get-data', () => ({
  getCases: jest.fn(),
  getDeaths: jest.fn(),
}));

const ALL_CASES: Timeseries = {
  dates: [new Date(), new Date()],
  countries: { a: [10, 20], b: [5, 10] },
};

const ALL_DEATHS: Timeseries = {
  dates: [new Date(), new Date()],
  countries: { a: [1, 2], b: [3, 4] },
};

const getCasesMock = getCases as jest.Mock<Promise<Timeseries>>;
const getDeathsMock = getDeaths as jest.Mock<Promise<Timeseries>>;

getCasesMock.mockResolvedValue(ALL_CASES);
getDeathsMock.mockResolvedValue(ALL_DEATHS);

jest.mock('./get-random-country-colors');
const getRandomCountryColorsMock = getRandomCountryColors as jest.Mock<
  CountryColors
>;

const RANDOM_COUNTRY_COLORS = { a: '#fff' };
getRandomCountryColorsMock.mockReturnValue(RANDOM_COUNTRY_COLORS);

describe('DashboardStore', () => {
  test('init populates data', async () => {
    const store = new DashboardStore();

    expect(store.allCases).toBeNull();
    expect(store.allDeaths).toBeNull();

    await store.init();

    expect(getCasesMock).toHaveBeenCalled();
    expect(getDeathsMock).toHaveBeenCalled();
    expect(getRandomCountryColorsMock).toHaveBeenCalled();

    expect(store.allCases).toMatchObject(ALL_CASES);
    expect(store.allDeaths).toMatchObject(ALL_DEATHS);
    expect(store.countries).toMatchObject(Object.keys(ALL_CASES.countries));
    expect(store.countryColors).toMatchObject(RANDOM_COUNTRY_COLORS);
  });

  test('isLoaded tells us when data is loaded', async () => {
    const store = new DashboardStore();

    expect(store.isLoaded).toBe(false);

    await store.init();

    expect(store.isLoaded).toBe(true);
  });

  test('setCountriesToCompare populates data for specific countries', async () => {
    const store = new DashboardStore();

    expect(store.selectedCountriesCases).toBeNull();
    expect(store.selectedCountriesDeaths).toBeNull();

    await store.init();

    store.setCountriesToCompare(['a']);

    expect(Object.keys(store.selectedCountriesCases.countries)).toMatchObject([
      'a',
    ]);
    expect(Object.keys(store.selectedCountriesDeaths.countries)).toMatchObject([
      'a',
    ]);
  });
});
