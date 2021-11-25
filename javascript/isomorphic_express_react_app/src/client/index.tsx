import React from 'react';
import ReactDOM from 'react-dom';
import Client from './entrypoint.client';
import { Provider } from 'react-redux';
import initializeReduxStore from './store';

console.log('Browser packed file loaded');

declare global {
  interface Window {
    MyReduxStore: any;
  }
}

const initialState = window.MyReduxStore || {};
const store = initializeReduxStore(initialState);

console.log('Data to hydrate with', initialState, store);

// ReactDOM.render(<App />, document.getElementById("react-content"));

// ReactDOM.hydrate(<Client />, document.documentElement);

ReactDOM.hydrate(
  <Provider store={store}>
    <Client />
  </Provider>,
  document.getElementById('react-content')
);
