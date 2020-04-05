import React, { useEffect, useState } from 'react';
import DailyCases from './DailyCases/DailyCases';
import styles from './app.css';
import DailyIncrease from './DailyIncrease/DailyIncrease';
import DailyIncreasePercentage from './DailyIncreasePercentage/DailyIncreasePercentage';
import RootStore, { AllStores } from './RootStore';
import { observer, inject } from 'mobx-react';
import Select from 'react-select';

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
  const [countriesToCompare, setCountriesToCompare] = useState<SelectOption[]>(
    null
  );

  useEffect(() => {
    rootStore.init();
  }, []);

  useEffect(() => {
    rootStore.setCountriesToCompare(countriesToCompare?.map((c) => c.value));
  }, [countriesToCompare]);

  return (
    <div className={styles.col2}>
      {rootStore.countries && (
        <>
          <div className={styles.span2}>
            <h1>Covid-19 Dashboard</h1>
          </div>
          <div className={styles.span2}>
            <Select
              options={getCountrySelectOptions(rootStore.countries)}
              isMulti
              value={countriesToCompare}
              onChange={(selected) => {
                setCountriesToCompare(selected as SelectOption[]);
              }}
              placeholder='Select countries to compare'
            />
          </div>
          {rootStore.selectedCountriesCases && (
            <>
              <div className={styles.span2}>
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
              <div className={styles.span2}>
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
