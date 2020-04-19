import React, { FC, useEffect, useRef, useState } from 'react';
import Chart, { ChartOptions } from 'chart.js';
import CountryColors from '../../types/CountryColors';

interface Props {
  data: Record<string, number>;
  countryColors: CountryColors;
  chartOptions?: ChartOptions;
}

const getCountryDataForChartJs = (
  data: Record<string, number>,
  countryColors: CountryColors
) => {
  const chartDatasets = [];

  for (const country in data) {
    chartDatasets.push({
      label: country,
      backgroundColor: countryColors[country],
      data: [data[country]],
    });
  }

  return {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Growth rate %',
        backgroundColor: Object.keys(data).map((c) => countryColors[c]),
        data: Object.values(data),
      },
    ],
  };
};

const getChartOptions = (data: Record<string, number>): Chart.ChartOptions => {
  const values = Object.values(data);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const roundToNext = 0.1;

  const minTick = Math.floor(min / roundToNext) * roundToNext;
  const maxTick = Math.ceil(max / roundToNext) * roundToNext;

  return {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: (value) =>
              `${(parseFloat(value.toString()) * 100).toLocaleString(
                'en-gb'
              )}%`,
            min: minTick,
            max: maxTick,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: (item, data) =>
          `${data.datasets[item.datasetIndex].label}: ${(
            parseFloat(item.value) * 100
          ).toLocaleString('en-gb')}%`,
      },
    },
  };
};

const CountryValueBarChart: FC<Props> = ({
  data,
  countryColors,
  chartOptions,
}) => {
  const [chart, setChart] = useState<Chart>(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (!chart) {
        const ctx = chartRef.current.getContext('2d');
        setChart(
          new Chart(ctx, {
            type: 'bar',
            data: getCountryDataForChartJs(data, countryColors),
            options: { ...getChartOptions(data), ...chartOptions },
          })
        );
      } else {
        chart.data = getCountryDataForChartJs(data, countryColors);
        chart.options = getChartOptions(data);
        chart.update();
      }
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default CountryValueBarChart;
