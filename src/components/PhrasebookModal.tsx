import React, { useState } from 'react';
import { BookOpen, X, Sparkles, Volume2, ArrowRight, Check, Search } from 'lucide-react';
import { PHRASEBOOK } from '../data/phrasebook';
import { PhraseCategory } from '../types';
import { LANGUAGE_REGISTRY, getLanguageByCode } from '../config/languages';
import { audioService } from '../services/audio/AudioService';

interface PhrasebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUsePhrase: (sourceLang: string, targetLang: string, text: string) => void;
}

const CATEGORIES: Array<PhraseCategory | 'All'> = [
  'All',
  'Greetings',
  'Politeness & Gratitude',
  'Questions & Directions',
  'Health & Emergency',
  'Commerce & Market',
  'Family & Community',
  'Proverbs & Wisdom',
];

export const PhrasebookModal: React.FC<PhrasebookModalProps> = ({
  isOpen,
  onClose,
  onUsePhrase,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory | 'All'>('All');
  const [selectedTargetLang, setSelectedTargetLang] = useState<string>('urh');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const targetLangInfo = getLanguageByCode(selectedTargetLang);

  const filteredPhrases = PHRASEBOOK.filter((phrase) => {
    const matchesCat = selectedCategory === 'All' || phrase.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const trans = phrase.translations[selectedTargetLang] || '';
    const matchesSearch =
      !q ||
      phrase.english.toLowerCase().includes(q) ||
      trans.toLowerCase().includes(q) ||
      phrase.category.toLowerCase().includes(q);

    return matchesCat && matchesSearch;
  });

  const handleSpeak = (text: string) => {
    audioService.speakText(text, selectedTargetLang);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div
        id="phrasebook-modal"
        className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100">
                African Multilingual Phrasebook
              </h3>
              <p className="text-xs text-stone-400">
                Curated indigenous expressions, daily dialogue, and proverb corpora
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls: Target Language selector, Category pills, and Search */}
        <div className="p-4 border-b border-stone-800 bg-stone-950/60 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Target Language Select */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-stone-400 font-medium">Explore in Language:</span>
              <select
                value={selectedTargetLang}
                onChange={(e) => setSelectedTargetLang(e.target.value)}
                className="bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500"
              >
                {LANGUAGE_REGISTRY.filter((l) => l.code !== 'en').map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.nativeName}) {lang.isLowResource ? '• Low-Resource' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phrases..."
                className="w-full pl-8 pr-3 py-1.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Phrases List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredPhrases.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <p className="text-sm">No phrases found for the current search/category.</p>
            </div>
          ) : (
            filteredPhrases.map((phrase) => {
              const translation = phrase.translations[selectedTargetLang] || 'Translation in rule lexicon';

              return (
                <div
                  key={phrase.id}
                  className="bg-stone-950 border border-stone-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                        {phrase.category}
                      </span>
                      {phrase.culturalNote && (
                        <span className="text-[10px] text-amber-400/80 italic">
                          • {phrase.culturalNote}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-stone-100">{phrase.english}</p>
                    <p className="text-sm font-medium text-amber-300">{translation}</p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleSpeak(translation)}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 border border-stone-700 transition"
                      title="Pronounce phrase"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleCopy(phrase.id, translation)}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 border border-stone-700 transition"
                      title="Copy translation"
                    >
                      {copiedId === phrase.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="text-xs px-1">Copy</span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onUsePhrase('en', selectedTargetLang, phrase.english);
                        onClose();
                      }}
                      className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-1 shadow-xs"
                      title="Load into Translation Workspace"
                    >
                      <span>Translate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>{filteredPhrases.length} phrases available for {targetLangInfo.name}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
