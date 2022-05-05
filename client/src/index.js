import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const providerConfig = {
  domain: "dev-3yo43obv.us.auth0.com",
  clientId: "Zv6pt1IpvCTGTBD0I6evRHT2QmnbmXkP",
  redirectUri: window.location.origin,
};

ReactDOM.render(
  <Auth0Provider {...providerConfig}>
    <App />
  </Auth0Provider>,
  
  document.getElementById('root')
);

