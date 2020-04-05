import React, { FC } from 'react';
import LineChart from '../LineChart/LineChart';
import { Timeseries } from '../Timeseries';
import calculateDailyIncrease from './calculate-daily-increase';

interface Props {
  data: Timeseries;
  countryColors: Record<string, string>;
}

const DailyIncrease: FC<Props> = ({ data, countryColors }) => {
  return (
    <>
      <div>Daily increase</div>
      <LineChart
        data={calculateDailyIncrease(data)}
        countryColors={countryColors}
      />
    </>
  );
};

export default DailyIncrease;
