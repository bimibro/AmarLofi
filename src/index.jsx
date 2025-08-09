/*this is the react entry point for the app*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*it renders <App /> using the react rendering engine, Strict mode helps to catch potential problems within the code during development. for example it will 
display any functional errors on the app for developmental purposes.*/
ReactDOM.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);