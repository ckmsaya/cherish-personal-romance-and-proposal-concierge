import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="offline-banner"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-stone-900/95 text-stone-100 px-4 py-2.5 text-xs font-medium shadow-2xl border border-stone-800 backdrop-blur"
    >
      <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
      <span>Offline Mode — Your saved proposal plans and itineraries are cached.</span>
    </div>
  );
};
