import React, { useEffect, useState } from 'react';
import DailyCases from './DailyCases/DailyCases';
import styles from './app.css';
import DailyIncrease from './DailyIncrease/DailyIncrease';
import DailyIncreasePercentage from './DailyIncreasePercentage/DailyIncreasePercentage';
import RootStore, { AllStores } from './RootStore';
import { observer, inject } from 'mobx-react';
import Select from 'react-select';
import icon from './icon.png';

interface Props {
  rootStore?: RootStore;
}

const getCountrySelectOptions = (countries: string[]) =>
  countries.map((c) => ({ value: c, label: c }));

interface SelectOption {
  value: string;
  label: string;
}

const App: React.FC<Props> = ({ rootStore }) => {
  const [countriesToCompare, setCountriesToCompare] = useState<SelectOption[]>([
    {
      value: 'World',
      label: 'World',
    },
  ]);

  useEffect(() => {
    rootStore.init();
  }, []);

  useEffect(() => {
    rootStore.allCases &&
      rootStore.allDeaths &&
      rootStore.setCountriesToCompare(countriesToCompare?.map((c) => c.value));
  }, [countriesToCompare, rootStore.allCases, rootStore.allDeaths]);

  return (
    <div
      className={`
        ${styles['col1-320px']}
        ${styles['col2-768px']}
        ${styles['col3-1024px']}
      `}
    >
      {rootStore.allCases && rootStore.allDeaths && (
        <>
          <div className={`${styles['span-all-col']} ${styles['logo']}`}>
            <h1>
              <img src={icon} />
              Track a Virus: Covid-19 Dashboard
            </h1>
            <p>(data updated on {rootStore.dateUpdated.toDateString()})</p>
          </div>

          {/* <div className={styles['span-all-col']}>
            <h1>Worldwide - confirmed cases</h1>
          </div>
          <div>
            <DailyCases
              data={rootStore.aggregatedGlobalCases}
              countryColors={{ global: 'red' }}
            />
          </div>
          <div>
            <DailyIncrease
              data={rootStore.aggregatedGlobalCases}
              countryColors={{ global: 'red' }}
            />
          </div>
          <div>
            <DailyIncreasePercentage
              data={rootStore.aggregatedGlobalCases}
              countryColors={{ global: 'red' }}
            />
          </div>

          <div className={styles['span-all-col']}>
            <h1>Worldwide - confirmed deaths</h1>
          </div>
          <div>
            <DailyCases
              data={rootStore.aggregatedGlobalDeaths}
              countryColors={{ global: 'red' }}
            />
          </div>
          <div>
            <DailyIncrease
              data={rootStore.aggregatedGlobalDeaths}
              countryColors={{ global: 'red' }}
            />
          </div>
          <div>
            <DailyIncreasePercentage
              data={rootStore.aggregatedGlobalDeaths}
              countryColors={{ global: 'red' }}
            />
          </div> */}

          <div className={styles['span-all-col']}>
            <label htmlFor='countrySelector'>
              Select a country or a few to dive in & compare
            </label>
            <Select
              inputId='countrySelector'
              options={getCountrySelectOptions(rootStore.countries)}
              isMulti
              value={countriesToCompare}
              onChange={(selected) => {
                setCountriesToCompare(selected as SelectOption[]);
              }}
              placeholder="Select countries to compare. Type 'World' for the worldwide data"
            />
          </div>
          {rootStore.selectedCountriesCases && (
            <>
              <div className={styles['span-all-col']}>
                <h1>Confirmed cases</h1>
              </div>
              <div>
                <DailyCases
                  data={rootStore.selectedCountriesCases}
                  countryColors={rootStore.countryColors}
                />
              </div>
              <div>
                <DailyIncrease
                  data={rootStore.selectedCountriesCases}
                  countryColors={rootStore.countryColors}
                />
              </div>
              <div>
                <DailyIncreasePercentage
                  data={rootStore.selectedCountriesCases}
                  countryColors={rootStore.countryColors}
                />
              </div>
            </>
          )}

          {rootStore.selectedCountriesDeaths && (
            <>
              <div className={styles['span-all-col']}>
                <h1>Confirmed deaths</h1>
              </div>
              <div>
                <DailyCases
                  data={rootStore.selectedCountriesDeaths}
                  countryColors={rootStore.countryColors}
                />
              </div>
              <div>
                <DailyIncrease
                  data={rootStore.selectedCountriesDeaths}
                  countryColors={rootStore.countryColors}
                />
              </div>
              <div>
                <DailyIncreasePercentage
                  data={rootStore.selectedCountriesDeaths}
                  countryColors={rootStore.countryColors}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default inject(({ rootStore }: AllStores) => ({
  rootStore,
}))(observer(App));
