import React, { FC } from 'react';
import LineChart from '../LineChart/LineChart';
import { Timeseries } from '../Timeseries';

interface Props {
  data: Timeseries;
  countryColors: Record<string, string>;
}

const CountryComparison: FC<Props> = ({ data, countryColors }) => {
  return (
    <>
      <div>Number of daily cases</div>
      <LineChart data={data} countryColors={countryColors} />
    </>
  );
};

export default CountryComparison;
