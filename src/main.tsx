import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Silently activate new deploys: with registerType 'autoUpdate' the new service
// worker takes over immediately, but without this the already-open tab keeps
// running the stale cached bundle until it's closed and reopened.
registerSW({
  immediate: true,
  onRegisteredSW(_url, registration) {
    if (!registration) return;
    // A backgrounded mobile PWA is usually resumed, not freshly navigated, so
    // the browser's automatic update check never fires on its own. Force one
    // whenever the app comes back into view.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        registration.update();
      }
    });
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
