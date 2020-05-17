import { shallow } from 'enzyme';
import React from 'react';
import DailyData from './CumulativeData';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import LineChart from '../charts/LineChart/LineChart';

const title = 'SOME TITLE';

describe('CumulativeData', () => {
  test('Shows line chart with correct attributes', () => {
    const data: Timeseries = {
      dates: [new Date()],
      countries: { someCountry: [1] },
    };

    const countryColors: CountryColors = {
      someCountry: '#000',
    };

    const component = shallow(
      <DailyData title={title} data={data} countryColors={countryColors} />
    );

    const lineChart = component.find(LineChart);

    expect(lineChart).toHaveLength(1);
    expect(lineChart.prop('data')).toBe(data);
    expect(lineChart.prop('countryColors')).toBe(countryColors);
  });
});
