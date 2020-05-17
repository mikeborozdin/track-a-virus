import { shallow } from 'enzyme';
import React from 'react';
import DailyAbsoluteIncrease from './DailyAbsoluteIncrease';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import DailyIncrease from './DailyIncrease/DailyIncrease';
import DailyIncreaseMovingAverage from './DailyIncreaseMovingAverage/DailyIncreaseMovingAverage';

const COUNTRY_COLORS: CountryColors = {
  countryA: 'red',
  countryB: 'green',
};

const TITLE = 'some title';

describe('DailyAbsoluteIncrease', () => {
  test('Shows a chart type toggle with default options of [daily]', () => {
    const dataForOneCountry: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [1] },
    };

    const component = shallow(
      <DailyAbsoluteIncrease
        title={TITLE}
        data={dataForOneCountry}
        countryColors={COUNTRY_COLORS}
      />
    );

    const toggles = component.find(ToggleButtonGroup);
    expect(toggles.prop('value')).toBe('daily');

    expect(component.find(DailyIncrease)).toHaveLength(1);
  });

  test('Shows a moving average chart when changing the chart type to it', () => {
    const dataForOneCountry: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [1] },
    };

    const component = shallow(
      <DailyAbsoluteIncrease
        title={TITLE}
        data={dataForOneCountry}
        countryColors={COUNTRY_COLORS}
      />
    );

    const toggles = component.find(ToggleButtonGroup);
    expect(toggles.prop('value')).toBe('daily');
    expect(component.find(DailyIncrease)).toHaveLength(1);
    expect(component.find(DailyIncreaseMovingAverage)).toHaveLength(0);

    toggles.simulate('change', {}, 'moving-average');

    expect(component.find(DailyIncrease)).toHaveLength(0);
    expect(component.find(DailyIncreaseMovingAverage)).toHaveLength(1);
  });
});
