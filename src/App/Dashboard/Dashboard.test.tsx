import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './Dashboard';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import DashboardStore from './stores/DashboardStore';
import WorldSnapshot from './WorldSnapshot/WorldSnapshot';
import Select from 'react-select';
import CumulativeData from './CumulativeData/CumulativeData';
import DailyAbsoluteIncrease from './DailyAbsoluteIncrease/DailyAbsoluteIncrease';
import DailyPercentageIncrease from './DailyPercentageIncrease/DailyPercentageIncrease';

const mockStore = (overrides = {}) =>
  (({
    init: jest.fn(),
    setCountriesToCompare: jest.fn(),
    isLoaded: true,
    countries: ['a', 'b'],
    allCases: { countries: { [DashboardStore.WORLD_NAME]: [10, 20] } },
    allDeaths: {
      countries: { [DashboardStore.WORLD_NAME]: [1, 2] },
    },
    selectedCountriesCases: {
      countries: { [DashboardStore.WORLD_NAME]: [10, 20] },
    },
    selectedCountriesDeaths: {
      countries: { [DashboardStore.WORLD_NAME]: [1, 2] },
    },
    ...overrides,
  } as unknown) as DashboardStore);

describe('Dashboard', () => {
  test('Calls dashboard store init on showing the component', () => {
    const store = mockStore();

    shallow(<Dashboard dashboardStore={store} />);

    expect(store.init).toHaveBeenCalled();
  });

  test('Shows loading spinner if no data loaded', () => {
    const component = shallow(
      <Dashboard dashboardStore={mockStore({ isLoaded: false })} />
    );

    expect(component.find(LoadingSpinner)).toHaveLength(1);
  });

  test('Shows world snapshot if data loaded', () => {
    const component = shallow(<Dashboard dashboardStore={mockStore()} />);

    const worldSnapshot = component.find(WorldSnapshot);

    expect(worldSnapshot).toHaveLength(1);
    expect(worldSnapshot.prop('cases')).toMatchObject(
      mockStore().allCases.countries[DashboardStore.WORLD_NAME]
    );
    expect(worldSnapshot.prop('deaths')).toMatchObject(
      mockStore().allDeaths.countries[DashboardStore.WORLD_NAME]
    );
  });

  test('Shows select box with all countries and world selected by default if data loaded', () => {
    const component = shallow(<Dashboard dashboardStore={mockStore()} />);

    const selectBox = component.find(Select);

    expect(selectBox.prop('options')).toMatchObject(
      mockStore().countries.map((c) => ({ label: c, value: c }))
    );

    expect(selectBox.prop('value')).toHaveLength(1);
    expect(selectBox.prop('value')[0].value).toBe(DashboardStore.WORLD_NAME);
  });

  test('Shows data for selected countries if data loaded', () => {
    const store = mockStore();

    const component = shallow(<Dashboard dashboardStore={store} />);

    const dailyCases = component.find(CumulativeData);
    expect(dailyCases.at(0).prop('data')).toBe(store.selectedCountriesCases);
    expect(dailyCases.at(1).prop('data')).toBe(store.selectedCountriesDeaths);

    const dailyAbsoluteIncrease = component.find(DailyAbsoluteIncrease);
    expect(dailyAbsoluteIncrease.at(0).prop('data')).toBe(
      store.selectedCountriesCases
    );
    expect(dailyAbsoluteIncrease.at(1).prop('data')).toBe(
      store.selectedCountriesDeaths
    );

    const dailyPercentageIncrease = component.find(DailyPercentageIncrease);
    expect(dailyPercentageIncrease.at(0).prop('data')).toBe(
      store.selectedCountriesCases
    );
    expect(dailyPercentageIncrease.at(1).prop('data')).toBe(
      store.selectedCountriesDeaths
    );
  });

  test('Calls dashboard store when user selects different countries', () => {
    const store = mockStore();

    const component = shallow(<Dashboard dashboardStore={store} />);

    component.find(Select).simulate('change', [
      {
        value: 'Some other country',
        label: 'Some other country',
      },
    ]);

    expect(store.setCountriesToCompare).toHaveBeenCalledWith([
      'Some other country',
    ]);
  });
});
