import React, { FC } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './App.css';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';
import About from './static-pages/About/About';
import Data from './static-pages/Data/Data';
import Roadmap from './static-pages/Roadmap/Roadmap';
import Cookies from './static-pages/Cookies/Cookies';

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
