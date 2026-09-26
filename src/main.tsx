import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// The app no longer ships a service worker or offline caching — it's online-only.
// Clean up any service worker + cache left behind by earlier versions of the app
// so returning visitors and installed PWAs stop serving stale cached content.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}
if ('caches' in window) {
  caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
