import React, { FC, useState } from 'react';
import BarChart from '../../charts/BarChart/BarChart';
import LineChart from '../../charts/LineChart/LineChart';
import { Timeseries } from '../../types/Timeseries';
import calculateDailyAbsoluteIncrease from './calculate-daily-absolute-increase';
import CountryColors from '../../types/CountryColors';
import styles from '../../charts/chart.css';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
}

const DailyIncrease: FC<Props> = ({ data, countryColors }) => {
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  const Chart = Object.keys(data.countries).length > 1 ? LineChart : BarChart;

  return (
    <div className={`${isFullScreen ? styles['full-screen'] : ''}`}>
      {/* <button onClick={() => setFullScreen(!isFullScreen)}>
        Toggle full screen
      </button> */}
      <Chart
        data={calculateDailyAbsoluteIncrease(data)}
        countryColors={countryColors}
      />
    </div>
  );
};

export default DailyIncrease;
