import React, { FC } from 'react';
import CountryColors from '../../types/CountryColors';
import { Timeseries } from '../../types/Timeseries';
import calcCountryMovingAvgDiff from './calc-growth-rate';
import CountryValueBarChart from '../../charts/CountryValueBarChart/CountryValueBarChart';

interface Props {
  data: Timeseries;
  countryColors: CountryColors;
}

const GrowthRate: FC<Props> = ({ data, countryColors }) => {
  const growthRateByCountry = calcCountryMovingAvgDiff(data);

  return (
    <>
      <CountryValueBarChart
        data={growthRateByCountry}
        countryColors={countryColors}
      />
    </>
  );
};

export default GrowthRate;
