import React, { useState, useMemo } from 'react';
import { Search, X, Check, MapPin, Sparkles, AlertCircle, Globe } from 'lucide-react';
import { LANGUAGE_REGISTRY } from '../config/languages';
import { LanguageInfo, LanguageRegion } from '../types';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCode: string;
  onSelect: (code: string) => void;
  title: string;
  otherSelectedCode?: string;
}

const REGION_TABS: Array<LanguageRegion | 'All'> = [
  'All',
  'Nigeria',
  'East Africa',
  'Southern Africa',
  'Horn of Africa',
  'Central Africa',
  'West Africa',
  'International',
];

const POPULAR_QUICK_LANGS = [
  { code: 'en', name: 'English' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'ha', name: 'Hausa' },
  { code: 'ig', name: 'Igbo' },
  { code: 'sw', name: 'Swahili' },
  { code: 'urh', name: 'Urhobo' },
  { code: 'am', name: 'Amharic' },
  { code: 'zu', name: 'Zulu' },
];

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCode,
  onSelect,
  title,
  otherSelectedCode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<LanguageRegion | 'All'>('All');

  const filteredLanguages = useMemo(() => {
    return LANGUAGE_REGISTRY.filter((lang) => {
      const matchesRegion = selectedRegion === 'All' || lang.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q) ||
        lang.country.toLowerCase().includes(q) ||
        lang.family.toLowerCase().includes(q);

      return matchesRegion && matchesSearch;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedRegion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        id="language-selector-modal"
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-100 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-amber-400" />
              <span>{title}</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Select any language (alphabetized A–Z including English)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-stone-800 space-y-3 bg-stone-950/50">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search English, Yorùbá, Hausa, Igbo, Urhobo, Swahili..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Frequent Language Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] font-semibold text-stone-400 shrink-0 mr-1">Frequent:</span>
            {POPULAR_QUICK_LANGS.map((item) => {
              const isSelected = item.code === selectedCode;
              return (
                <button
                  key={item.code}
                  onClick={() => {
                    onSelect(item.code);
                    onClose();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition shrink-0 ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-xs'
                      : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700 hover:text-amber-300 border-stone-700'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Region Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {REGION_TABS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                  selectedRegion === region
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-stone-100 border border-stone-700/60'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Languages List (Alphabetized) */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-800/60 space-y-1">
          {filteredLanguages.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <AlertCircle className="w-8 h-8 mx-auto text-stone-500 mb-2" />
              <p className="text-sm font-medium">No languages found matching "{searchQuery}"</p>
              <p className="text-xs text-stone-500 mt-1">Try searching for "English", "Urhobo", "Hausa", "Igbo", or "Yorùbá"</p>
            </div>
          ) : (
            filteredLanguages.map((lang: LanguageInfo) => {
              const isSelected = lang.code === selectedCode;
              const isOtherSelected = lang.code === otherSelectedCode;

              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelect(lang.code);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all group ${
                    isSelected
                      ? 'bg-amber-500/15 border border-amber-500/40 text-stone-100'
                      : 'hover:bg-stone-800/60 text-stone-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 uppercase ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950'
                          : lang.code === 'en'
                          ? 'bg-amber-950/70 text-amber-300 border border-amber-700/60 group-hover:bg-amber-800 group-hover:text-stone-100'
                          : 'bg-stone-800 text-stone-400 group-hover:text-amber-300 group-hover:bg-stone-700 border border-stone-700'
                      }`}
                    >
                      {lang.code}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="font-semibold text-sm text-stone-100 group-hover:text-amber-300">
                          {lang.name}
                        </span>
                        <span className="text-xs text-stone-400 italic">
                          ({lang.nativeName})
                        </span>
                        {lang.code === 'en' && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-800/50 rounded">
                            Global
                          </span>
                        )}
                        {lang.isLowResource && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-orange-950/70 text-orange-300 border border-orange-800/50 rounded">
                            Indigenous Dialect
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-stone-400 mt-1">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-stone-500" />
                          <span>{lang.region} • {lang.country.split(',')[0]}</span>
                        </span>
                        <span>•</span>
                        <span>{lang.speakers} speakers</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {isOtherSelected && (
                      <span className="text-[11px] text-stone-500 px-2 py-0.5 rounded bg-stone-800">
                        Current Pair
                      </span>
                    )}
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-stone-950 border-t border-stone-800 text-center text-xs text-stone-400 flex items-center justify-between">
          <span className="text-stone-500 text-[11px]">
            {filteredLanguages.length} languages available
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
