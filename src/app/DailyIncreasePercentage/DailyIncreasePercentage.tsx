import React, { FC } from 'react';
import LineChart from '../LineChart/LineChart';
import { Timeseries } from '../Timeseries';
import calculateDailyIncreasePercentage from './calculate-daily-increase-percentage';

interface Props {
  data: Timeseries;
  countryColors: Record<string, string>;
}

const getChartOptions = (): Chart.ChartOptions => ({
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          callback: (value) =>
            `${(parseFloat(value.toString()) * 100).toLocaleString('en-gb')}%`,
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      title: (item) =>
        item[0].label.substring(0, item[0].label.lastIndexOf(', ')),
      label: (item, data) =>
        `${data.datasets[item.datasetIndex].label}: ${(
          parseFloat(item.value) * 100
        ).toLocaleString('en-gb')}%`,
    },
  },
});

const DailyIncrease: FC<Props> = ({ data, countryColors }) => {
  return (
    <>
      <div>Daily increase %</div>
      <LineChart
        data={calculateDailyIncreasePercentage(data)}
        countryColors={countryColors}
        chartOptions={getChartOptions()}
      />
    </>
  );
};

export default DailyIncrease;
