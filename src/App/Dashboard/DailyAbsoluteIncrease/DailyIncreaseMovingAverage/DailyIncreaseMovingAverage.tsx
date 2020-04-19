import React, { FC } from 'react';
import LineChart from '../../charts/LineChart/LineChart';
import { Timeseries } from '../../types/Timeseries';
import calculateDailyIncreaseMovingAverage from './calculate-daily-increase-moving-average';
import CountryColors from '../../types/CountryColors';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
  movingAvgLength: number;
}

const DailyIncreaseMovingAverage: FC<Props> = ({
  data,
  countryColors,
  movingAvgLength,
}) => {
  return (
    <>
      <LineChart
        data={calculateDailyIncreaseMovingAverage(data, movingAvgLength)}
        countryColors={countryColors}
      />
    </>
  );
};

export default DailyIncreaseMovingAverage;
