import React, { useState } from 'react';
import { History, Bookmark, Trash2, Download, X, ArrowRight, Sparkles, Clock, Copy, Check } from 'lucide-react';
import { useTranslationHistory } from '../hooks/useTranslationHistory';
import { getLanguageByCode } from '../config/languages';
import { HistoryItem } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  onSelectHistoryItem,
}) => {
  const {
    history,
    toggleBookmark,
    removeHistoryItem,
    clearHistory,
    exportHistory,
  } = useTranslationHistory();

  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const displayList = onlyBookmarks ? history.filter((h) => h.bookmarked) : history;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/80 backdrop-blur-xs animate-fadeIn">
      <div
        id="translation-history-drawer"
        className="bg-stone-900 border-l border-stone-800 w-full max-w-md h-full flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">Translation History</h3>
              <p className="text-xs text-stone-400">Locally persisted offline session log</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="p-3 border-b border-stone-800 bg-stone-950/60 flex items-center justify-between text-xs">
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              onlyBookmarks
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Favorites ({history.filter((h) => h.bookmarked).length})</span>
          </button>

          <div className="flex items-center space-x-2">
            {history.length > 0 && (
              <>
                <button
                  onClick={exportHistory}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-amber-300 transition"
                  title="Export translation history as JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={clearHistory}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/60 text-stone-400 hover:text-rose-300 transition"
                  title="Clear all history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* History Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {displayList.length === 0 ? (
            <div className="text-center py-16 text-stone-500 space-y-2">
              <Clock className="w-8 h-8 mx-auto stroke-1" />
              <p className="text-sm font-medium text-stone-400">No translations logged yet</p>
              <p className="text-xs text-stone-600">Translations you perform will be saved here automatically.</p>
            </div>
          ) : (
            displayList.map((item) => {
              const srcLang = getLanguageByCode(item.sourceLang);
              const tgtLang = getLanguageByCode(item.targetLang);

              return (
                <div
                  key={item.id}
                  className="bg-stone-950 border border-stone-800 rounded-2xl p-3.5 space-y-2.5 hover:border-amber-500/40 transition group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 font-semibold text-stone-300">
                      <span>{srcLang.name}</span>
                      <ArrowRight className="w-3 h-3 text-stone-500" />
                      <span className="text-amber-400">{tgtLang.name}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`p-1 rounded-md transition ${
                          item.bookmarked ? 'text-amber-400' : 'text-stone-500 hover:text-stone-300'
                        }`}
                        title={item.bookmarked ? 'Remove bookmark' : 'Bookmark translation'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button
                        onClick={() => removeHistoryItem(item.id)}
                        className="p-1 rounded-md text-stone-500 hover:text-rose-400 transition"
                        title="Delete from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="text-stone-300 line-clamp-2">"{item.sourceText}"</p>
                    <p className="text-amber-300 font-medium line-clamp-2">"{item.translatedText}"</p>
                  </div>

                  <div className="pt-2 border-t border-stone-850 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-mono text-[10px]">{item.engine}</span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopy(item.id, item.translatedText)}
                        className="text-stone-400 hover:text-amber-300 transition"
                      >
                        {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : 'Copy'}
                      </button>

                      <button
                        onClick={() => {
                          onSelectHistoryItem(item);
                          onClose();
                        }}
                        className="text-amber-400 hover:text-amber-300 font-semibold"
                      >
                        Load
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-950 border-t border-stone-800 text-center text-xs text-stone-500">
          History is saved strictly inside your browser's local sandbox.
        </div>
      </div>
    </div>
  );
};
