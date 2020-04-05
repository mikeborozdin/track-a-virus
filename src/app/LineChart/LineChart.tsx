import React, { FC, useEffect, useRef, useState } from 'react';
// import { inject, observer } from 'mobx-react';
// import {
//   LineChart,
//   Line,
//   YAxis,
//   XAxis,
//   Legend,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';
import Chart from 'chart.js';
import { Timeseries } from '../Timeseries';

interface Props {
  data: Timeseries;
  countryColors: Record<string, string>;
}

const getCountryDataForChartJs = (
  data: Timeseries,
  countryColors: Record<string, string>
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

const LineChart: FC<Props> = ({ data, countryColors }) => {
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

  return <canvas ref={chartRef} />;
};

export default LineChart;

// interface RechartsDataItem {
//   date: string;
//   countries: Record<string, number>;
// }

// const getCountryDataForRecharts = (data: Timeseries) => {
//   const rechartsData: RechartsDataItem[] = [];

//   for (let dateIndex = 0; dateIndex < data.dates.length; dateIndex++) {
//     const currentDate: RechartsDataItem = {
//       date: data.dates[dateIndex],
//       countries: {},
//     };

//     for (const country in data.countries) {
//       currentDate.countries[country] = data.countries[country][dateIndex];
//     }

//     rechartsData.push(currentDate);
//   }

//   return rechartsData;
// };

// const CountryComparison: FC<Props> = ({
//   countryComparisonStore,
//   countries,
// }) => {
//   console.log('CountryComparison()');
//   const data = countryComparisonStore.process(countries);
//   const [chart, setChart] = useState<Chart>(null);
//   // useEffect(() => countryComparisonStore.process(countries), [countries]);
//   const chartRef = useRef(null);
//   // const data = countryComparisonStore.data;
//   useEffect(() => {
//     if (chartRef.current && !countryComparisonStore.isProcessing) {
//       if (!chart) {
//         const ctx = chartRef.current.getContext('2d');
//         setChart(
//           new Chart(ctx, {
//             type: 'line',
//             data: {
//               labels: data.dates,
//               datasets: getCountryDataForChartJs(
//                 data,
//                 countryComparisonStore.countryColours
//               ),
//             },
//           })
//         );
//       } else {
//         chart.data = {
//           labels: data.dates,
//           datasets: getCountryDataForChartJs(
//             data,
//             countryComparisonStore.countryColours
//           ),
//         };
//         chart.update();
//       }
//     }
//   }, [countries]);
//   return (
//     <div>
//       Country comparison
//       {!countryComparisonStore.isProcessing && data && (
//         <>
//           <canvas ref={chartRef} />
//           <>
//             <ResponsiveContainer width='100%' maxHeight='100%' height={500}>
//               <LineChart data={getCountryDataForRecharts(data)}>
//                 <YAxis />
//                 <XAxis dataKey='date' />
//                 <CartesianGrid strokeDasharray='5 5' />
//                 <Legend
//                   formatter={(value) => value.replace('countries.', '')}
//                 />
//                 <Tooltip
//                   formatter={(value, name) => [
//                     value,
//                     name.replace('countries.', ''),
//                   ]}
//                 />
//                 {Object.keys(data.countries).map((c) => (
//                   <Line
//                     dataKey={`countries.${c}`}
//                     key={c}
//                     stroke={countryComparisonStore.countryColours[c]}
//                   />
//                 ))}
//               </LineChart>
//             </ResponsiveContainer>
//           </>
//         </>
//       )}
//     </div>
//   );
// };

// export default inject(({ rootStore }: AllStores) => ({
//   countryComparisonStore: rootStore.countryComparisonStore,
// }))(/*observer(*/ CountryComparison /*)*/);
