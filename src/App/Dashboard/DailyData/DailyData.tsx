import React, { FC } from 'react';
import LineChart from '../charts/LineChart/LineChart';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
}

const DailyCases: FC<Props> = ({ data, countryColors }) => (
  <>
    <div>Number of cases</div>
    <LineChart data={data} countryColors={countryColors} />
  </>
);

export default DailyCases;
