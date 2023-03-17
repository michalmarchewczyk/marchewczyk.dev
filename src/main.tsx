import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MantineProvider } from '@mantine/core';
import './main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
      theme={{
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
