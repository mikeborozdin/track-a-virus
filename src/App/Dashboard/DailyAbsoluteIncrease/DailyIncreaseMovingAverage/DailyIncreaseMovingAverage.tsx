import React, { FC } from 'react';
import LineChart from '../../charts/LineChart/LineChart';
import { Timeseries } from '../../types/Timeseries';
import calculateDailyChangeMovingAverage from './calculate-daily-change-moving-average';
import CountryColors from '../../types/CountryColors';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
}

const MOVING_AVERAGE_LENGTH = 3;

const DailyIncreaseMovingAverage: FC<Props> = ({ data, countryColors }) => {
  return (
    <>
      <div>Daily increase - {MOVING_AVERAGE_LENGTH} day moving average</div>
      <LineChart
        data={calculateDailyChangeMovingAverage(data, MOVING_AVERAGE_LENGTH)}
        countryColors={countryColors}
      />
    </>
  );
};

export default DailyIncreaseMovingAverage;
