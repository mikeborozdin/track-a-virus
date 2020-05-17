import React, { FC, useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Timeseries } from '../types/Timeseries';
import CountryColors from '../types/CountryColors';
import commonStyles from '../styles/common-dashboard-styles.css';
import GrowthRate from './GrowthRate/GrowthRate';
import DailyPercentageIncrease from './DailyPercentageIncrease/DailyPercentageIncrease';
import DashboardComponent, {
  DashboardComponentButtons,
  DashboardComponentContent,
} from '../DashboardComponent/DashboardComponent';

interface Props {
  title: string;
  data: Timeseries;
  countryColors: CountryColors;
}

type ChartType = 'growth-rate' | 'percentage-increase';

const getTitle = (titlePrefix: string, chartType: ChartType) =>
  chartType === 'growth-rate'
    ? `${titlePrefix}: growth rate (week on week)`
    : `${titlePrefix}: daily increase % (of existing cases)`;

const PercentageTrends: FC<Props> = ({ title, data, countryColors }) => {
  const [chartType, setChartType] = useState<ChartType>('growth-rate');

  return (
    <DashboardComponent title={getTitle(title, chartType)}>
      <DashboardComponentButtons>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={(_e, value) => {
            value && setChartType(value);
          }}
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
      </DashboardComponentButtons>

      <DashboardComponentContent>
        {chartType === 'growth-rate' && (
          <GrowthRate data={data} countryColors={countryColors} />
        )}
        {chartType === 'percentage-increase' && (
          <DailyPercentageIncrease data={data} countryColors={countryColors} />
        )}
      </DashboardComponentContent>
    </DashboardComponent>
  );
};

export default PercentageTrends;
