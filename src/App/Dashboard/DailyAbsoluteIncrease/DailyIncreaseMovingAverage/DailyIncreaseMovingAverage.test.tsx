import { shallow } from 'enzyme';
import React from 'react';
import DailyIncreaseMovingAverage, {
  MOVING_AVERAGE_LENGTH,
} from './DailyIncreaseMovingAverage';
import { Timeseries } from '../../types/Timeseries';
import CountryColors from '../../types/CountryColors';
import LineChart from '../../charts/LineChart/LineChart';
import calculateDailyIncreaseMovingAverage from './calculate-daily-increase-moving-average';

jest.mock('./calculate-daily-increase-moving-average', () => jest.fn());

const calculateDailyIncreaseMovingAverageMock = calculateDailyIncreaseMovingAverage as jest.Mock;
const MOCK_DAILY_INCREASE = {};
calculateDailyIncreaseMovingAverageMock.mockReturnValue(MOCK_DAILY_INCREASE);

const COUNTRY_COLORS: CountryColors = {
  countryA: 'red',
  countryB: 'green',
};

describe('DailyAbsoluteIncreaseMovingAverage', () => {
  test('Shows line chart with correct attributes', () => {
    const dataForOneCountry: Timeseries = {
      dates: [new Date()],
      countries: { countryA: [1] },
    };

    const component = shallow(
      <DailyIncreaseMovingAverage
        data={dataForOneCountry}
        countryColors={COUNTRY_COLORS}
      />
    );

    expect(calculateDailyIncreaseMovingAverageMock).toHaveBeenCalledWith(
      dataForOneCountry,
      MOVING_AVERAGE_LENGTH
    );

    const lineChart = component.find(LineChart);

    expect(lineChart).toHaveLength(1);
    expect(lineChart.prop('data')).toBe(MOCK_DAILY_INCREASE);
    expect(lineChart.prop('countryColors')).toBe(COUNTRY_COLORS);
  });
});
