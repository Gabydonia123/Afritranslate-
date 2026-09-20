import React, { useState, useMemo } from 'react';
import { Search, MapPin, Sparkles, Volume2, ArrowRight, Check } from 'lucide-react';
import { LANGUAGE_REGISTRY } from '../config/languages';
import { LanguageInfo, LanguageRegion } from '../types';
import { audioService } from '../services/audio/AudioService';

interface SupportedLanguagesSectionProps {
  onSelectLanguageForTranslate: (code: string) => void;
}

const REGION_FILTERS: Array<LanguageRegion | 'All'> = [
  'All',
  'Nigeria',
  'East Africa',
  'Southern Africa',
  'Horn of Africa',
  'Central Africa',
  'West Africa',
];

export const SupportedLanguagesSection: React.FC<SupportedLanguagesSectionProps> = ({
  onSelectLanguageForTranslate,
}) => {
  const [activeFilter, setActiveFilter] = useState<LanguageRegion | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLangCode, setCopiedLangCode] = useState<string | null>(null);

  const filteredLanguages = useMemo(() => {
    return LANGUAGE_REGISTRY.filter((lang) => {
      const matchesFilter = activeFilter === 'All' || lang.region === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q) ||
        lang.country.toLowerCase().includes(q) ||
        lang.family.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const handlePlaySample = (text: string, langCode: string) => {
    audioService.speakText(text, langCode);
  };

  const handleCopyGreeting = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLangCode(code);
    setTimeout(() => setCopiedLangCode(null), 1800);
  };

  return (
    <section id="supported-languages" className="py-12 sm:py-16 bg-stone-900 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Languages Directory</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-50 tracking-tight">
            Supported African Languages
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            Browse through languages, listen to sample greetings, or select any language to start translating immediately.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-stone-950/60 p-3 sm:p-4 rounded-2xl border border-stone-800">
          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar text-xs">
            {REGION_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                  activeFilter === f
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, region, family..."
              className="w-full pl-9 pr-4 py-2 bg-stone-900 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLanguages.map((lang: LanguageInfo) => (
            <div
              key={lang.code}
              className="bg-stone-950 border border-stone-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-lg hover:shadow-amber-950/20"
            >
              <div>
                {/* Header with Code */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-sm font-mono uppercase">
                      {lang.code}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-stone-100 group-hover:text-amber-300 transition">
                        {lang.name}
                      </h3>
                      <p className="text-xs text-stone-400 italic">{lang.nativeName}</p>
                    </div>
                  </div>
                </div>

                {/* Linguistic Attributes */}
                <div className="space-y-1.5 text-xs text-stone-400 my-3">
                  <div className="flex items-center justify-between border-b border-stone-850 pb-1">
                    <span className="text-stone-500">Region:</span>
                    <span className="font-medium text-stone-300">{lang.region}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-stone-850 pb-1">
                    <span className="text-stone-500">Language Family:</span>
                    <span className="font-medium text-stone-300 truncate max-w-[170px]" title={lang.family}>
                      {lang.family}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-stone-850 pb-1">
                    <span className="text-stone-500">Speakers:</span>
                    <span className="font-medium text-stone-300">{lang.speakers}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 my-2">
                  {lang.description}
                </p>

                {/* Sample Greeting Box */}
                {lang.sampleGreeting && (
                  <div className="mt-3 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-stone-500 font-semibold uppercase">
                      <span>Sample Greeting:</span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handlePlaySample(lang.sampleGreeting.native, lang.code)}
                          className="text-stone-400 hover:text-amber-400 p-0.5"
                          title="Listen to audio"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleCopyGreeting(lang.sampleGreeting.native, lang.code)}
                          className="text-stone-400 hover:text-amber-400 p-0.5"
                          title="Copy phrase"
                        >
                          {copiedLangCode === lang.code ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <ArrowRight className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-stone-200 font-medium">{lang.sampleGreeting.native}</p>
                    <p className="text-[11px] text-stone-400 italic">{lang.sampleGreeting.english}</p>
                  </div>
                )}
              </div>

              {/* Action: Use in Translator */}
              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-end">
                <button
                  onClick={() => onSelectLanguageForTranslate(lang.code)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 hover:text-stone-950 hover:bg-amber-400 border border-amber-500/40 transition flex items-center space-x-1"
                >
                  <span>Translate in {lang.name}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

