import { useState, useCallback } from 'react';
import { translationService } from '../services/translation/TranslationService';
import { TranslationEngineType, TranslationResponse, TranslationSourceItem } from '../types';
import { useTranslationHistory } from './useTranslationHistory';

export function useTranslation() {
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('yo'); // Default to Yoruba
  const [inputText, setInputText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [selectedEngine, setSelectedEngine] = useState<TranslationEngineType>('google-translate');
  const [activeEngine, setActiveEngine] = useState<TranslationEngineType>('google-translate');
  const [sources, setSources] = useState<TranslationSourceItem[]>([]);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number>(0);
  const [isDialectFallback, setIsDialectFallback] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [linguisticNotes, setLinguisticNotes] = useState<string | undefined>(undefined);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [processingTimeMs, setProcessingTimeMs] = useState<number | null>(null);

  const { addHistoryItem } = useTranslationHistory();

  const handleSwapLanguages = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    if (translatedText) {
      setInputText(translatedText);
      setTranslatedText('');
      setSources([]);
    }
    setError(null);
  }, [sourceLang, targetLang, translatedText]);

  const handleSelectSource = useCallback((index: number) => {
    if (sources[index]) {
      setActiveSourceIndex(index);
      setTranslatedText(sources[index].translatedText);
      setActiveEngine(sources[index].engine);
      if (sources[index].notes) {
        setLinguisticNotes(sources[index].notes);
      }
    }
  }, [sources]);

  const handleTranslate = useCallback(async (overrideText?: string) => {
    const textToTranslate = overrideText !== undefined ? overrideText : inputText;

    if (!textToTranslate || textToTranslate.trim().length === 0) {
      setTranslatedText('');
      setSources([]);
      setError(null);
      setIsDialectFallback(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response: TranslationResponse = await translationService.translateText({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        text: textToTranslate,
        preferredEngine: selectedEngine || 'google-translate',
      });

      if (response.success) {
        setTranslatedText(response.translatedText);
        setActiveEngine(response.engine);
        setConfidence(response.confidence);
        setLinguisticNotes(response.linguisticNotes);
        setProcessingTimeMs(response.processingTimeMs || null);
        setSources(response.sources || []);
        setActiveSourceIndex(0);
        setIsDialectFallback(Boolean(response.isDialectFallback || (response.engine !== 'google-translate' && response.engine !== 'mock')));

        addHistoryItem({
          sourceLang,
          targetLang,
          sourceText: textToTranslate,
          translatedText: response.translatedText,
          engine: response.engine,
        });
      } else {
        setError(response.error || 'Translation service is temporarily unavailable.');
      }
    } catch (err: any) {
      setError(err.message || 'Translation service encountered an unexpected issue.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, sourceLang, targetLang, selectedEngine, addHistoryItem]);

  const handleClear = useCallback(() => {
    setInputText('');
    setTranslatedText('');
    setSources([]);
    setActiveSourceIndex(0);
    setIsDialectFallback(false);
    setError(null);
    setLinguisticNotes(undefined);
    setConfidence(null);
    setProcessingTimeMs(null);
  }, []);

  return {
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    inputText,
    setInputText,
    translatedText,
    setTranslatedText,
    selectedEngine,
    setSelectedEngine,
    activeEngine,
    sources,
    activeSourceIndex,
    isDialectFallback,
    handleSelectSource,
    isLoading,
    error,
    linguisticNotes,
    confidence,
    processingTimeMs,
    handleSwapLanguages,
    handleTranslate,
    handleClear,
  };
}
