import { shallow } from 'enzyme';
import React from 'react';
import PercentageTrends from './PercentageTrends';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import GrowthRate from './GrowthRate/GrowthRate';
import DailyPercentageIncrease from './DailyPercentageIncrease/DailyPercentageIncrease';

const COUNTRY_COLORS: CountryColors = {
  countryA: 'red',
  countryB: 'green',
};

describe('PercentageTrends', () => {
  test('Shows a chart type toggle with default options of [growth-rate]', () => {
    const dataForOneCountry: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [1] },
    };

    const component = shallow(
      <PercentageTrends
        data={dataForOneCountry}
        countryColors={COUNTRY_COLORS}
      />
    );

    const toggles = component.find(ToggleButtonGroup);
    expect(toggles.prop('value')).toBe('growth-rate');

    expect(component.find(GrowthRate)).toHaveLength(1);
  });

  test('Shows a daily percentage increase when changing the chart type to it', () => {
    const dataForOneCountry: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [1] },
    };

    const component = shallow(
      <PercentageTrends
        data={dataForOneCountry}
        countryColors={COUNTRY_COLORS}
      />
    );

    const toggles = component.find(ToggleButtonGroup);
    expect(toggles.prop('value')).toBe('growth-rate');
    expect(component.find(GrowthRate)).toHaveLength(1);
    expect(component.find(DailyPercentageIncrease)).toHaveLength(0);

    toggles.simulate('change', {}, 'percentage-increase');

    expect(component.find(GrowthRate)).toHaveLength(0);
    expect(component.find(DailyPercentageIncrease)).toHaveLength(1);
  });
});
