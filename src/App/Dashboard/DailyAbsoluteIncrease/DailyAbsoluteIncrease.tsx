import React, { FC, useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import DailyIncrease from './DailyIncrease/DailyIncrease';
import DailyIncreaseMovingAverage from './DailyIncreaseMovingAverage/DailyIncreaseMovingAverage';
import commonStyles from '../styles/common-dashboard-styles.css';
import DashboardComponent from '../WithFullScreen/DashboardComponent';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
}

type ChartType = 'daily' | 'moving-average';

const MOVING_AVG_LENGTH = 7;

const getTitle = (chartType: ChartType) =>
  chartType === 'daily'
    ? 'Daily increase'
    : `Daily increase (${MOVING_AVG_LENGTH} day moving average)`;

const DailyAbsoluteIncrease: FC<Props> = ({ data, countryColors }) => {
  const [chartType, setChartType] = useState<ChartType>('daily');

  return (
    <DashboardComponent
      title={getTitle(chartType)}
      buttons={
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={(_e, value) => value && setChartType(value)}
          size='small'
          aria-label='chart type'
        >
          <ToggleButton
            value='daily'
            aria-label='daily'
            classes={{
              sizeSmall: commonStyles['small-toggle-button'],
              label: commonStyles['small-toggle-label'],
            }}
          >
            Daily
          </ToggleButton>
          <ToggleButton
            value='moving-average'
            aria-label='moving average'
            classes={{
              sizeSmall: commonStyles['small-toggle-button'],
              label: commonStyles['small-toggle-label'],
            }}
          >
            Moving Average
          </ToggleButton>
        </ToggleButtonGroup>
      }
    >
      {chartType === 'daily' && (
        <DailyIncrease data={data} countryColors={countryColors} />
      )}
      {chartType === 'moving-average' && (
        <DailyIncreaseMovingAverage
          data={data}
          countryColors={countryColors}
          movingAvgLength={MOVING_AVG_LENGTH}
        />
      )}
    </DashboardComponent>
  );
};

export default DailyAbsoluteIncrease;
