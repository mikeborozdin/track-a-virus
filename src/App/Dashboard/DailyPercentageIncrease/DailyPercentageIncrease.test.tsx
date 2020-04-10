import { shallow } from 'enzyme';
import React from 'react';
import DailyPercentageIncrease from './DailyPercentageIncrease';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import BarChart from '../charts/BarChart/BarChart';
import LineChart from '../charts/LineChart/LineChart';
import calculateDailyPercentageIncrease from './calculate-daily-percentage-increase';

jest.mock('./calculate-daily-percentage-increase', () => jest.fn());

const calculateDailyPercentageIncreaseMock = calculateDailyPercentageIncrease as jest.Mock;
const MOCK_DAILY_INCREASE = {};
calculateDailyPercentageIncreaseMock.mockReturnValue(MOCK_DAILY_INCREASE);

const COUNTRY_COLORS: CountryColors = {
  countryA: 'red',
  countryB: 'green',
};

describe('DailyPercentageIncrease', () => {
  test('Shows bar chart with correct attributes if data just for one country', () => {
    const dataForOneCountry: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [1] },
    };

    const component = shallow(
      <DailyPercentageIncrease
        data={dataForOneCountry}
        countryColors={COUNTRY_COLORS}
      />
    );

    expect(calculateDailyPercentageIncreaseMock).toHaveBeenCalledWith(
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
      <DailyPercentageIncrease
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
