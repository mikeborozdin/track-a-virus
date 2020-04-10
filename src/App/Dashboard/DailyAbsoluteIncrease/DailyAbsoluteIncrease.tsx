import React, { FC } from 'react';
import BarChart from '../charts/BarChart/BarChart';
import LineChart from '../charts/LineChart/LineChart';
import { Timeseries } from '../types/Timeseries';
import calculateDailyAbsoluteIncrease from './calculate-daily-absolute-increase';

interface Props {
  data: Timeseries;
  countryColors: Record<string, string>;
}

const DailyIncrease: FC<Props> = ({ data, countryColors }) => {
  const Chart = Object.keys(data.countries).length > 1 ? LineChart : BarChart;

  return (
    <>
      <div>Daily increase</div>
      <Chart
        data={calculateDailyAbsoluteIncrease(data)}
        countryColors={countryColors}
      />
    </>
  );
};

export default DailyIncrease;
