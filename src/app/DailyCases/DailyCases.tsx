import React, { FC } from 'react';
import LineChart from '../LineChart/LineChart';
import { Timeseries } from '../Timeseries';

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
