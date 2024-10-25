import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppExtensionsSDK from '@pipedrive/app-extensions-sdk';
await new AppExtensionsSDK().initialize( { size: { height: 580, width: 800 } });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
