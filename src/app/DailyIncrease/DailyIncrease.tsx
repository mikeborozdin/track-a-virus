import React, { FC } from 'react';
import LineChart from '../LineChart/LineChart';
import { Timeseries } from '../Timeseries';
import calculateDailyIncrease from './calculate-daily-increase';
import BarChart from '../BarChart/BarChart';

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
        data={calculateDailyIncrease(data)}
        countryColors={countryColors}
      />
    </>
  );
};

export default DailyIncrease;
