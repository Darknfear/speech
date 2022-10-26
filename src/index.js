import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeechProvider } from '@speechly/react-client';
import App from './app/App';
import env from './config/env';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SpeechProvider
      appId='dd0a3b42-eaa6-4bd3-8e3e-7bfbf340e377'
      logSegments
      debug
      vad={{ enabled: true }}
    >
      <App />
    </SpeechProvider>
  </React.StrictMode>
);
