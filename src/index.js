import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);

const setupSw = () => {
  if ("serviceWorker" in navigator) {
    if (process.env.NODE_ENV == 'development') {
      // on production, the SW is OneSignalSDKWorker.js
      navigator.serviceWorker.register(new URL(`${window.location.origin}/serviceWorker.js`), {
        scope: '/'
      }).then((registration) => {
        const sw = registration.waiting
          || registration.installing
          || registration.active
        console.log('local sw registered: ', sw)
      })
    }

    if (navigator.serviceWorker.controller) {
      console.log('sw alredy registered: ', navigator.serviceWorker.controller.scriptURL)
    }

    navigator.serviceWorker.oncontrollerchange = (e) => {
      console.log('controller changed')
      console.log(e)
    }
  }
}

setupSw()

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
