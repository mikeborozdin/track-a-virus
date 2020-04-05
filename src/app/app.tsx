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
    <div className={styles.dashboard}>
      {rootStore.countries && (
        <>
          <div className={styles.countrySelector}>
            <Select
              options={getCountrySelectOptions(rootStore.countries)}
              isMulti
              value={countriesToCompare}
              onChange={(selected) => {
                setCountriesToCompare(selected as SelectOption[]);
              }}
            />
          </div>
          {rootStore.selectedCountriesCases && (
            <>
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
