import React, { FC } from 'react';
import LineChart from '../charts/LineChart/LineChart';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import commonStyles from '../styles/common-dashboard-styles.css';
import DashboardComponent from '../WithFullScreen/DashboardComponent';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
}

const CumulativeData: FC<Props> = ({ data, countryColors }) => (
  <DashboardComponent title='Number of cases'>
    <div className={commonStyles['no-toggle-buttons-spacer']}></div>
    <LineChart data={data} countryColors={countryColors} />
  </DashboardComponent>
);

export default CumulativeData;
