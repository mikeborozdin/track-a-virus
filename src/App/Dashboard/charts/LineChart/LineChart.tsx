import React, { FC, useEffect, useRef, useState } from 'react';
import Chart, { ChartOptions } from 'chart.js';
import { Timeseries } from '../../types/Timeseries';
import CountryColors from '../../types/CountryColors';
import styles from '../chart.css';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
  chartOptions?: ChartOptions;
}

const getCountryDataForChartJs = (
  data: Timeseries,
  countryColors: CountryColors
) => {
  const chartDatasets = [];

  for (const country in data.countries) {
    chartDatasets.push({
      label: country,
      borderColor: countryColors[country],
      data: data.countries[country],
    });
  }

  return chartDatasets;
};

const getChartOptions = (): Chart.ChartOptions => ({
  responsive: true,
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
            parseInt(value.toString()).toLocaleString('en-gb'),
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      title: (item) =>
        item[0].label.substring(0, item[0].label.lastIndexOf(', ')),
      label: (item, data) =>
        `${data.datasets[item.datasetIndex].label}: ${parseInt(
          item.value
        ).toLocaleString('en-gb')}`,
    },
  },
});

const LineChart: FC<Props> = ({ data, countryColors, chartOptions }) => {
  const [chart, setChart] = useState<Chart>(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (!chart) {
        const ctx = chartRef.current.getContext('2d');
        setChart(
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: data.dates,
              datasets: getCountryDataForChartJs(data, countryColors),
            },
            options: { ...getChartOptions(), ...chartOptions },
          })
        );
      } else {
        chart.data = {
          labels: data.dates,
          datasets: getCountryDataForChartJs(data, countryColors),
        };
        chart.update();
      }
    }
  }, [data]);

  return (
    <div className={styles['chart-container']}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
