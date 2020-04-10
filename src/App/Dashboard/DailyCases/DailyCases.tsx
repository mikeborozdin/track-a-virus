import React, { FC } from 'react';
import LineChart from '../charts/BarChart/LineChart/LineChart';
import { Timeseries } from '../types/Timeseries';

interface Props {
  data: Timeseries;
  countryColors: Record<string, string>;
}

const DailyCases: FC<Props> = ({ data, countryColors }) => {
  return (
    <>
      <div>Number of cases</div>
      <LineChart data={data} countryColors={countryColors} />
    </>
  );
};

export default DailyCases;
