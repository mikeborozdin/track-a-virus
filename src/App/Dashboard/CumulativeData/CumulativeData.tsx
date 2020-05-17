import React, { FC } from 'react';
import LineChart from '../charts/LineChart/LineChart';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import DashboardComponent, {
  DashboardComponentContent,
} from '../WithFullScreen/DashboardComponent';

interface Props {
  title: string;
  data: Timeseries;
  countryColors: CountryColors;
}

const CumulativeData: FC<Props> = ({ title, data, countryColors }) => (
  <DashboardComponent title={title}>
    <DashboardComponentContent>
      <LineChart data={data} countryColors={countryColors} />
    </DashboardComponentContent>
  </DashboardComponent>
);

export default CumulativeData;
