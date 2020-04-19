import React, { FC } from 'react';
import BarChart from '../../charts/BarChart/BarChart';
import LineChart from '../../charts/LineChart/LineChart';
import { Timeseries } from '../../types/Timeseries';
import calculateDailyPercentageIncrease from './calculate-daily-percentage-increase';

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

const DailyPercentageIncrease: FC<Props> = ({ data, countryColors }) => {
  const Chart = Object.keys(data.countries).length > 1 ? LineChart : BarChart;

  return (
    <>
      <Chart
        data={calculateDailyPercentageIncrease(data)}
        countryColors={countryColors}
        chartOptions={getChartOptions()}
      />
    </>
  );
};

export default DailyPercentageIncrease;
