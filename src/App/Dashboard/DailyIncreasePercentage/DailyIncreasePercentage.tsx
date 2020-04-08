import React, { FC } from 'react';
import LineChart from '../charts/BarChart/LineChart/LineChart';
import { Timeseries } from '../Timeseries';
import calculateDailyIncreasePercentage from './calculate-daily-increase-percentage';
import BarChart from '../charts/BarChart/BarChart';

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
  const Chart = Object.keys(data.countries).length > 1 ? LineChart : BarChart;

  return (
    <>
      <div>Daily increase %</div>
      <Chart
        data={calculateDailyIncreasePercentage(data)}
        countryColors={countryColors}
        chartOptions={getChartOptions()}
      />
    </>
  );
};

export default DailyIncrease;
