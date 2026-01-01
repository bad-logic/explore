import React from 'react';
import ReactDOM from 'react-dom';
import Client from './entrypoint.client';
import { Provider } from 'react-redux';
import initializeReduxStore from './store';
import { CUSTOM_BROWSER_OBJECTS } from '../server/utils/browser';

declare global {
  interface Window {
    [CUSTOM_BROWSER_OBJECTS.REDUX_STORE_STATE]: any;
  }
}

const initialState = window[CUSTOM_BROWSER_OBJECTS.REDUX_STORE_STATE] || {};
const store = initializeReduxStore(initialState);

// ReactDOM.render(<Client />, document.getElementById('react-content'));
// ReactDOM.hydrate(<Client />, document.getElementById('react-content'));

// ReactDOM.hydrate(<Client />, document.documentElement);

ReactDOM.hydrate(
  <Provider store={store}>
    <Client />
  </Provider>,
  document.getElementById('react-content')
);
