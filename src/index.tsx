import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from 'mobx-react';
import RootStore from './stores/RootStore';

ReactDOM.render(
  <Provider rootStore={new RootStore()}>
    <App />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
