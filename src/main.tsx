import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Silently activate new deploys: with registerType 'autoUpdate' the new service
// worker takes over immediately, but without this the already-open tab keeps
// running the stale cached bundle until it's closed and reopened.
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
