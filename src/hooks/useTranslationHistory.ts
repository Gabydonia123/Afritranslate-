import { useState, useEffect } from 'react';
import { HistoryItem, TranslationEngineType } from '../types';

const HISTORY_STORAGE_KEY = 'indigenous_translator_history_v1';
const MAX_HISTORY_ITEMS = 50;

export function useTranslationHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Failed to load translation history from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to persist history to localStorage', e);
    }
  }, [history]);

  const addHistoryItem = (item: {
    sourceLang: string;
    targetLang: string;
    sourceText: string;
    translatedText: string;
    engine: TranslationEngineType;
  }) => {
    if (!item.sourceText.trim() || !item.translatedText.trim()) return;

    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sourceLang: item.sourceLang,
      targetLang: item.targetLang,
      sourceText: item.sourceText.trim(),
      translatedText: item.translatedText.trim(),
      timestamp: Date.now(),
      engine: item.engine,
      bookmarked: false,
    };

    setHistory((prev) => [newItem, ...prev.filter((h) => !(h.sourceText === newItem.sourceText && h.targetLang === newItem.targetLang))].slice(0, MAX_HISTORY_ITEMS));
  };

  const toggleBookmark = (id: string) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item))
    );
  };

  const removeHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const exportHistory = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `indigenous-translations-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return {
    history,
    addHistoryItem,
    toggleBookmark,
    removeHistoryItem,
    clearHistory,
    exportHistory,
  };
}
