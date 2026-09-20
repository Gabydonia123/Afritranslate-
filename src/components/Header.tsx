import React from 'react';
import { Globe, Download, Wifi, WifiOff, History, BookOpen, LogOut, User as UserIcon } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenPhrasebook: () => void;
  onOpenArchitecture: () => void;
  onNavigateToLanguages: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  onOpenPhrasebook,
  onOpenArchitecture,
  onNavigateToLanguages,
}) => {
  const { isOnline, isInstallable, installPWA } = usePWA();
  const { user, logout } = useAuth();

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      {/* Top African Geometric Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-950/40 ring-1 ring-amber-400/30">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-stone-50">
                  Indigenous Language
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 hidden sm:inline-block">
                  Translator
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium">
                African Multilingual Translation System
              </p>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Online/Offline Status Indicator */}
            <div
              id="network-status-badge"
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isOnline
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                  : 'bg-rose-950/60 text-rose-300 border-rose-800/80'
              }`}
              title={isOnline ? 'Online' : 'Offline'}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden md:inline">Offline</span>
                </>
              )}
            </div>

            {/* Phrasebook Modal Trigger */}
            <button
              id="header-phrasebook-btn"
              onClick={onOpenPhrasebook}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-200 hover:text-white bg-stone-800/90 hover:bg-stone-700 border border-stone-700 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Phrasebook</span>
            </button>

            {/* History Drawer Trigger */}
            <button
              id="header-history-btn"
              onClick={onOpenHistory}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-200 hover:text-white bg-stone-800/90 hover:bg-stone-700 border border-stone-700 transition"
            >
              <History className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">History</span>
            </button>

            {/* PWA Install Button */}
            {isInstallable && (
              <button
                id="header-pwa-install-btn"
                onClick={installPWA}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install App</span>
              </button>
            )}

            {/* User Profile & Sign Out */}
            {user && (
              <div className="flex items-center space-x-2 pl-2 border-l border-stone-800">
                <div
                  className="flex items-center space-x-2 px-2.5 py-1 rounded-xl bg-stone-800/80 border border-stone-700 text-xs text-stone-200"
                  title={`Logged in as ${user.email}`}
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-[11px]">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden lg:inline max-w-[120px] truncate font-medium">
                    {user.name || user.email}
                  </span>
                </div>

                <button
                  id="header-logout-btn"
                  onClick={logout}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-300 hover:bg-rose-950/40 border border-transparent hover:border-rose-800/60 transition"
                  title="Sign Out of your account"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

