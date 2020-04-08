import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import DailyCases from './DailyCases/DailyCases';
import styles from './Dashboard.css';
import DailyIncrease from './DailyIncrease/DailyIncrease';
import DailyIncreasePercentage from './DailyIncreasePercentage/DailyIncreasePercentage';
import DashboardStore from './stores/DashboardStore';
import { observer, inject } from 'mobx-react';
import Select from 'react-select';
import { AllStores } from '../../stores/RootStore';
import WorldSnapshot from './WorldSnapshot/WorldSnapshot';

interface Props {
  dashboardStore?: DashboardStore;
}

const getCountrySelectOptions = (countries: string[]) =>
  countries.map((c) => ({ value: c, label: c }));

interface SelectOption {
  value: string;
  label: string;
}

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
        cases={dashboardStore.allCases.countries[dashboardStore.WORLD_NAME]}
        deaths={dashboardStore.allDeaths.countries[dashboardStore.WORLD_NAME]}
      />
    </div>
    <div className={styles['span-all-col']}>
      <div>
        <h1 className={styles.inline}>Detailed data</h1> (updated on{' '}
        {dashboardStore.dateUpdated})
      </div>
      <label htmlFor='countrySelector'>
        Select a country or a few to dive in & compare
      </label>
      <Select
        inputId='countrySelector'
        options={getCountrySelectOptions(dashboardStore.countries)}
        isMulti
        value={countriesToCompare}
        onChange={(selected) => {
          setCountriesToCompare(selected as SelectOption[]);
        }}
        placeholder="Select countries to compare. Type 'World' for the worldwide data"
      />
    </div>
    {dashboardStore.selectedCountriesCases && (
      <>
        <div className={styles['span-all-col']}>
          <h1>Confirmed cases</h1>
        </div>
        <div>
          <DailyCases
            data={dashboardStore.selectedCountriesCases}
            countryColors={dashboardStore.countryColors}
          />
        </div>
        <div>
          <DailyIncrease
            data={dashboardStore.selectedCountriesCases}
            countryColors={dashboardStore.countryColors}
          />
        </div>
        <div>
          <DailyIncreasePercentage
            data={dashboardStore.selectedCountriesCases}
            countryColors={dashboardStore.countryColors}
          />
        </div>
      </>
    )}

    {dashboardStore.selectedCountriesDeaths && (
      <>
        <div className={styles['span-all-col']}>
          <h1>Confirmed deaths</h1>
        </div>
        <div>
          <DailyCases
            data={dashboardStore.selectedCountriesDeaths}
            countryColors={dashboardStore.countryColors}
          />
        </div>
        <div>
          <DailyIncrease
            data={dashboardStore.selectedCountriesDeaths}
            countryColors={dashboardStore.countryColors}
          />
        </div>
        <div>
          <DailyIncreasePercentage
            data={dashboardStore.selectedCountriesDeaths}
            countryColors={dashboardStore.countryColors}
          />
        </div>
      </>
    )}
  </>
);

const App: React.FC<Props> = ({ dashboardStore }) => {
  const [countriesToCompare, setCountriesToCompare] = useState<SelectOption[]>([
    {
      value: dashboardStore.WORLD_NAME,
      label: dashboardStore.WORLD_NAME,
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
        className={`
        ${styles['col1-320px']}
        ${styles['col2-768px']}
        ${styles['col3-1024px']}
      `}
      >
        {dashboardStore.allCases &&
          dashboardStore.allDeaths &&
          renderDashboard(
            dashboardStore,
            countriesToCompare,
            setCountriesToCompare
          )}
        {(dashboardStore.allCases === null ||
          dashboardStore.allDeaths === null) && (
          <div>
            <h1>Loading</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default inject(({ rootStore }: AllStores) => ({
  dashboardStore: rootStore.dashboardStore,
}))(observer(App));
