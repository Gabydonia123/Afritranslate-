import React from 'react';
import { Download, X, Smartphone, Zap } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export const PwaInstallBanner: React.FC = () => {
  const { isInstallable, installPWA } = usePWA();
  const [dismissed, setDismissed] = React.useState(false);

  if (!isInstallable || dismissed) return null;

  return (
    <div
      id="pwa-install-banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-stone-900 border border-amber-500/40 rounded-2xl p-4 shadow-2xl animate-bounce-short text-stone-100 flex items-center justify-between gap-3 backdrop-blur-md"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-md">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-xs sm:text-sm text-stone-100">Install Indigenous Translator</h4>
          <p className="text-[11px] text-stone-400">Fast offline access on your phone or computer</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0">
        <button
          onClick={installPWA}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition flex items-center space-x-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200"
          title="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
