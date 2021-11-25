import React from 'react';
import ReactDOM from 'react-dom';
import Client from './entrypoint.client';

console.log('Browser packed file loaded');

// ReactDOM.render(<App />, document.getElementById("react-content"));

// ReactDOM.hydrate(<Client />, document.documentElement);

ReactDOM.hydrate(<Client />, document.getElementById('react-content'));
