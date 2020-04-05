import React, { FC } from 'react';
import LineChart from '../LineChart/LineChart';
import { Timeseries } from '../Timeseries';
import calculateDailyIncreasePercentage from './calculate-daily-increase-percentage';

interface Props {
  data: Timeseries;
  countryColors: Record<string, string>;
}

const DailyIncrease: FC<Props> = ({ data, countryColors }) => {
  return (
    <>
      <div>Daily increase %</div>
      <LineChart
        data={calculateDailyIncreasePercentage(data)}
        countryColors={countryColors}
      />
    </>
  );
};

export default DailyIncrease;
