import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import CumulativeData from './CumulativeData/CumulativeData';
import styles from './Dashboard.css';
import DailyAbsoluteIncrease from './DailyAbsoluteIncrease/DailyAbsoluteIncrease';
import DashboardStore from './stores/DashboardStore';
import { observer, inject } from 'mobx-react';
import Select from 'react-select';
import { AllStores } from '../../stores/RootStore';
import WorldSnapshot from './WorldSnapshot/WorldSnapshot';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import { Timeseries } from './types/Timeseries';
import CountryColors from './types/CountryColors';
import PercentageTrends from './PercentageTrends/PercentageTrends';

interface Props {
  dashboardStore?: DashboardStore;
}

const getCountrySelectOptions = (countries: string[]) =>
  countries.map((c) => ({ value: c, label: c }));

interface SelectOption {
  value: string;
  label: string;
}

const renderDataForSelectedCountries = (
  title: string,
  data: Timeseries,
  countryColors: CountryColors
) => (
  <>
    <div className={styles['span-all-col']}>
      <h1>{title}</h1>
    </div>
    <div>
      <CumulativeData data={data} countryColors={countryColors} />
    </div>
    <div>
      <DailyAbsoluteIncrease data={data} countryColors={countryColors} />
    </div>
    <div>
      <PercentageTrends data={data} countryColors={countryColors} />
    </div>
  </>
);

const renderCountrySelector = (
  allCountries: string[],
  countriesToCompare: SelectOption[],
  setCountriesToCompare: Dispatch<SetStateAction<SelectOption[]>>
) => (
  <>
    <label htmlFor='countrySelector'>
      Select a country or a few to dive in &amp; compare
    </label>
    <Select
      inputId='countrySelector'
      options={getCountrySelectOptions(allCountries)}
      isMulti
      value={countriesToCompare}
      onChange={(selected) => {
        setCountriesToCompare(selected as SelectOption[]);
      }}
      placeholder="Select countries to compare. Type 'World' for the worldwide data"
      className={styles.select}
      classNamePrefix='select'
    />
  </>
);

const renderDashboard = (
  dashboardStore: DashboardStore,
  countriesToCompare: SelectOption[],
  setCountriesToCompare: Dispatch<SetStateAction<SelectOption[]>>
) => (
  <>
    <div className={styles['span-all-col']}>
      <div>
        <h1 className={styles.inline}>World snapshot data</h1> (updated on{' '}
        {dashboardStore.dateUpdated})
      </div>
      <WorldSnapshot
        cases={dashboardStore.allCases.countries[DashboardStore.WORLD_NAME]}
        deaths={dashboardStore.allDeaths.countries[DashboardStore.WORLD_NAME]}
      />
    </div>

    <div className={styles['span-all-col']}>
      <div>
        <h1 className={styles.inline}>Detailed data</h1> (updated on{' '}
        {dashboardStore.dateUpdated})
      </div>
      {renderCountrySelector(
        dashboardStore.countries,
        countriesToCompare,
        setCountriesToCompare
      )}
    </div>

    {dashboardStore.selectedCountriesCases &&
      renderDataForSelectedCountries(
        'Confirmed cases',
        dashboardStore.selectedCountriesCases,
        dashboardStore.countryColors
      )}

    {dashboardStore.selectedCountriesDeaths &&
      renderDataForSelectedCountries(
        'Confirmed deaths',
        dashboardStore.selectedCountriesDeaths,
        dashboardStore.countryColors
      )}
  </>
);

export const Dashboard: React.FC<Props> = ({ dashboardStore }) => {
  const [countriesToCompare, setCountriesToCompare] = useState<SelectOption[]>([
    {
      value: DashboardStore.WORLD_NAME,
      label: DashboardStore.WORLD_NAME,
    },
  ]);

  useEffect(() => {
    dashboardStore.init();
  }, []);

  useEffect(() => {
    dashboardStore.allCases &&
      dashboardStore.allDeaths &&
      dashboardStore.setCountriesToCompare(
        countriesToCompare?.map((c) => c.value)
      );
  }, [countriesToCompare, dashboardStore.allCases, dashboardStore.allDeaths]);

  return (
    <>
      <div
        className={`${styles['col1-320px']} ${styles['col2-768px']} ${styles['col3-1024px']}`}
      >
        {dashboardStore.isLoaded &&
          renderDashboard(
            dashboardStore,
            countriesToCompare,
            setCountriesToCompare
          )}
        {!dashboardStore.isLoaded && <LoadingSpinner />}
      </div>
    </>
  );
};

export default inject(({ rootStore }: AllStores) => ({
  dashboardStore: rootStore.dashboardStore,
}))(observer(Dashboard));
