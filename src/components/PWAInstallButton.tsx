import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed and running in standalone, hide
  if (isInstalled) {
    return (
      <div id="pwa-installed-pill" className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200/70 rounded-full text-xs font-medium">
        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
        <span>Concierge App Installed</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        id="pwa-install-button"
        onClick={install}
        className="flex items-center gap-2 rounded-full bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 active:scale-95 transition"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-ios-install-button"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-white/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-rose-900 hover:bg-rose-50 transition"
        >
          <Smartphone className="w-3.5 h-3.5 text-rose-600" />
          <span>Install App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 text-stone-900">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-semibold text-stone-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-rose-600" />
                  Install Cherish Concierge
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-stone-600">
                <p>Have your personal romance concierge always accessible right from your home screen:</p>
                <div className="p-3 bg-stone-50 rounded-xl space-y-2 border border-stone-200/60">
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">1</span>
                    <span>Tap the <strong>Share</strong> button in your Safari navigation bar.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">2</span>
                    <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">3</span>
                    <span>Tap <strong>Add</strong> in the top-right corner.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-stone-900 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Generic install helper for desktop browser if not yet triggered
  return (
    <button
      id="pwa-install-generic"
      onClick={() => {
        alert('To install Cherish Concierge, tap the Install icon in your browser address bar or menu ("Add to Home screen").');
      }}
      className="hidden md:flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 transition"
      title="Install Cherish as a progressive web app"
    >
      <Download className="w-3.5 h-3.5 text-rose-600" />
      <span>Install App</span>
    </button>
  );
};
