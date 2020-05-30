import { shallow } from 'enzyme';
import React from 'react';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import calcMortality from './calc-mortality';
import Mortality from './Mortality';
import CountryValueBarChart from '../charts/CountryValueBarChart/CountryValueBarChart';

jest.mock('./calc-mortality', () => jest.fn());

const calcMortalityMock = calcMortality as jest.Mock;
const MOCK_MORTALITY = 0.05;
calcMortalityMock.mockReturnValue(MOCK_MORTALITY);

const COUNTRY_COLORS: CountryColors = {
  countryA: 'red',
  countryB: 'green',
};

describe('Mortality', () => {
  test('Shows bar chart with correct attributes', () => {
    const cases: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [100] },
    };

    const deaths: Timeseries = {
      dates: [new Date()],
      countries: { countryB: [5] },
    };

    const component = shallow(
      <Mortality cases={cases} deaths={deaths} countryColors={COUNTRY_COLORS} />
    );

    expect(calcMortalityMock).toHaveBeenCalledWith(cases, deaths);

    const bar = component.find(CountryValueBarChart);

    expect(bar).toHaveLength(1);
    expect(bar.prop('data')).toBe(MOCK_MORTALITY);
    expect(bar.prop('countryColors')).toBe(COUNTRY_COLORS);
  });
});
