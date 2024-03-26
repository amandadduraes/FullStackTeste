import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ClienteProvider } from './ClienteContext';

ReactDOM.render(
  <React.StrictMode>
    <ClienteProvider>
      <App />
    </ClienteProvider>
  </React.StrictMode>,
  document.getElementById('root')
);