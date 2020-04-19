import React, { FC } from 'react';
import LineChart from '../../charts/LineChart/LineChart';
import { Timeseries } from '../../types/Timeseries';
import calculateDailyIncreaseMovingAverage from './calculate-daily-increase-moving-average';
import CountryColors from '../../types/CountryColors';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
}

export const MOVING_AVERAGE_LENGTH = 3;

const DailyIncreaseMovingAverage: FC<Props> = ({ data, countryColors }) => {
  return (
    <>
      <div>Daily increase - {MOVING_AVERAGE_LENGTH} day moving average</div>
      <LineChart
        data={calculateDailyIncreaseMovingAverage(data, MOVING_AVERAGE_LENGTH)}
        countryColors={countryColors}
      />
    </>
  );
};

export default DailyIncreaseMovingAverage;
