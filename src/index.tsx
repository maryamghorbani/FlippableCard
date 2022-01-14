import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// import components
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
