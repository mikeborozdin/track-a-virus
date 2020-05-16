import React, { FC, useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import commonStyles from '../styles/common-dashboard-styles.css';
import GrowthRate from './GrowthRate/GrowthRate';
import DailyPercentageIncrease from './DailyPercentageIncrease/DailyPercentageIncrease';
import DashboardComponent from '../WithFullScreen/DashboardComponent';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
}

type ChartType = 'growth-rate' | 'percentage-increase';

const getTitle = (chartType: ChartType) =>
  chartType === 'growth-rate'
    ? 'Growth rate (week on week)'
    : `Daily increase % (of existing cases)`;

const PercentageTrends: FC<Props> = ({ data, countryColors }) => {
  const [chartType, setChartType] = useState<ChartType>('growth-rate');

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
            value='growth-rate'
            aria-label='growth-rate'
            classes={{
              sizeSmall: commonStyles['small-toggle-button'],
              label: commonStyles['small-toggle-label'],
            }}
          >
            Growth rate
          </ToggleButton>
          <ToggleButton
            value='percentage-increase'
            aria-label='percentage-increase'
            classes={{
              sizeSmall: commonStyles['small-toggle-button'],
              label: commonStyles['small-toggle-label'],
            }}
          >
            Percentage Increase
          </ToggleButton>
        </ToggleButtonGroup>
      }
    >
      {chartType === 'growth-rate' && (
        <GrowthRate data={data} countryColors={countryColors} />
      )}
      {chartType === 'percentage-increase' && (
        <DailyPercentageIncrease data={data} countryColors={countryColors} />
      )}
    </DashboardComponent>
  );
};

export default PercentageTrends;
