import { shallow } from 'enzyme';
import React from 'react';
import { Timeseries } from '../../types/Timeseries';
import CountryColors from '../../types/CountryColors';
import calcGrowthRate from './calc-growth-rate';
import GrowthRate, { GROWTH_RATE_PERIOD } from './GrowthRate';
import CountryValueBarChart from '../../charts/CountryValueBarChart/CountryValueBarChart';

jest.mock('./calc-growth-rate', () => jest.fn());

const calcGrowthRateMock = calcGrowthRate as jest.Mock;
const MOCK_GROWTH_RATE = {};
calcGrowthRateMock.mockReturnValue(MOCK_GROWTH_RATE);

const COUNTRY_COLORS: CountryColors = {
  countryA: 'red',
  countryB: 'green',
};

describe('GrowthRate', () => {
  test('Shows bar chart with correct attributes', () => {
    const dataForOneCountry: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [1] },
    };

    const component = shallow(
      <GrowthRate data={dataForOneCountry} countryColors={COUNTRY_COLORS} />
    );

    expect(calcGrowthRateMock).toHaveBeenCalledWith(
      dataForOneCountry,
      GROWTH_RATE_PERIOD
    );

    const bar = component.find(CountryValueBarChart);

    expect(bar).toHaveLength(1);
    expect(bar.prop('data')).toBe(MOCK_GROWTH_RATE);
    expect(bar.prop('countryColors')).toBe(COUNTRY_COLORS);
  });
});
