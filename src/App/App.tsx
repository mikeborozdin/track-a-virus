import React, { FC } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './App.css';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';
import About from './About/About';
import Data from './Data/Data';
import Roadmap from './Roadmap/Roadmap';
import Cookies from './Cookies/Cookies';

const App: FC = () => {
  return (
    <Router>
      <Header />
      <div className={styles.content}>
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/data'>
            <Data />
          </Route>
          <Route path='/roadmap'>
            <Roadmap />
          </Route>
          <Route path='/cookies'>
            <Cookies />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
