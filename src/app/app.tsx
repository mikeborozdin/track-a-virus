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
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

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
    <>
      <div className={styles.header}>
        <div className={styles.banner}>
          <div className={styles.logo}>
            <a href='/'>
              <img src={icon} />
              Track a Virus
            </a>
          </div>
          <div>
            <a href='/'>Covid-19 Dashboard</a>
          </div>
        </div>

        <a
          href='#'
          onClick={() => setToggleMenu(!toggleMenu)}
          className={styles.menuButton}
        >
          &#9776;
        </a>

        <ul className={`${styles.menu} ${!toggleMenu ? styles.hidden : ''}`}>
          <li>
            <a href='/' className={styles.menuItem}>
              Home
            </a>
          </li>
          <li>
            <a href='/all-posts/' className={styles.menuItem}>
              All posts
            </a>
          </li>
          <li>
            <a href='/talks/' className={styles.menuItem}>
              Talks
            </a>
          </li>
          <li>
            <a href='/about/' className={styles.menuItem}>
              About me
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`
        ${styles.content}
        ${styles['col1-320px']}
        ${styles['col2-768px']}
        ${styles['col3-1024px']}
      `}
      >
        {rootStore.allCases && rootStore.allDeaths && (
          <>
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
    </>
  );
};

export default inject(({ rootStore }: AllStores) => ({
  rootStore,
}))(observer(App));
