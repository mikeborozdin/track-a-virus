import React, { FC } from 'react';
import CountryColors from '../types/CountryColors';
import { Timeseries } from '../types/Timeseries';
import calcMortality from './calc-mortality';
import CountryValueBarChart from '../charts/CountryValueBarChart/CountryValueBarChart';

interface Props {
  cases: Timeseries;
  deaths: Timeseries;
  countryColors: CountryColors;
}

const Mortality: FC<Props> = ({ cases, deaths, countryColors }) => {
  const mortalityByCountry = calcMortality(cases, deaths);

  return (
    <>
      <CountryValueBarChart
        data={mortalityByCountry}
        label='Mortality (of confirmed cases) %'
        countryColors={countryColors}
      />
    </>
  );
};

export default Mortality;
