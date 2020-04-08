import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './App.css';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';

const App: FC = () => {
  return (
    <Router>
      <Header />
      <div className={styles.content}>
        <Switch>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
