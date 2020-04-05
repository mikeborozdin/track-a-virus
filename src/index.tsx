import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/app';
import { Provider } from 'mobx-react';
import RootStore from './app/RootStore';

ReactDOM.render(
  <Provider rootStore={new RootStore()}>
    <App />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
