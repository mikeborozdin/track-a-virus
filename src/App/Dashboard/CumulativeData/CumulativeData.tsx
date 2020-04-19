import React, { FC } from 'react';
import LineChart from '../charts/LineChart/LineChart';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import commonStyles from '../styles/common-dashboard-styles.css';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
}

const CumulativeData: FC<Props> = ({ data, countryColors }) => (
  <>
    <h2 className={commonStyles['component-title']}>Number of cases</h2>
    <div className={commonStyles['no-toggle-buttons-spacer']}></div>
    <LineChart data={data} countryColors={countryColors} />
  </>
);

export default CumulativeData;
