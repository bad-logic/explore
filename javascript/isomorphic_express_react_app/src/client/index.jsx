import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';


console.log("Browser packed file loaded");

ReactDOM.render(
 <App />,
  document.getElementById('react-content')
);
