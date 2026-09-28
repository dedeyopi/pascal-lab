// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LabProvider } from './state/LabContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LabProvider>
      <App />
    </LabProvider>
  </React.StrictMode>
);