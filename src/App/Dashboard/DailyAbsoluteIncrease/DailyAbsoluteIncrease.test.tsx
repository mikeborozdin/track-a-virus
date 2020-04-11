import { shallow } from 'enzyme';
import React from 'react';
import DailyAbsoluteIncrease from './DailyAbsoluteIncrease';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import BarChart from '../charts/BarChart/BarChart';
import LineChart from '../charts/LineChart/LineChart';
import calculateAbsoluteDailyIncrease from './calculate-daily-absolute-increase';

jest.mock('./calculate-daily-absolute-increase', () => jest.fn());

const calculateAbsoluteDailyIncreaseMock = calculateAbsoluteDailyIncrease as jest.Mock;
const MOCK_DAILY_INCREASE = {};
calculateAbsoluteDailyIncreaseMock.mockReturnValue(MOCK_DAILY_INCREASE);

const COUNTRY_COLORS: CountryColors = {
  countryA: 'red',
  countryB: 'green',
};

describe('DailyAbsoluteIncrease', () => {
  test('Shows bar chart with correct attributes if data just for one country', () => {
    const dataForOneCountry: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [1] },
    };

    const component = shallow(
      <DailyAbsoluteIncrease
        data={dataForOneCountry}
        countryColors={COUNTRY_COLORS}
      />
    );

    expect(calculateAbsoluteDailyIncreaseMock).toHaveBeenCalledWith(
      dataForOneCountry
    );

    const barChart = component.find(BarChart);

    expect(barChart).toHaveLength(1);
    expect(barChart.prop('data')).toBe(MOCK_DAILY_INCREASE);
    expect(barChart.prop('countryColors')).toBe(COUNTRY_COLORS);
  });

  test('Shows line chart with correct attributes if data for more than one country', () => {
    const dataForTwoCountries: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [1], countryB: [1] },
    };

    const component = shallow(
      <DailyAbsoluteIncrease
        data={dataForTwoCountries}
        countryColors={COUNTRY_COLORS}
      />
    );

    const lineChart = component.find(LineChart);

    expect(lineChart).toHaveLength(1);
    expect(lineChart.prop('data')).toBe(MOCK_DAILY_INCREASE);
    expect(lineChart.prop('countryColors')).toBe(COUNTRY_COLORS);
  });
});
