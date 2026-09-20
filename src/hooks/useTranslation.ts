import { useState, useCallback } from 'react';
import { translationService } from '../services/translation/TranslationService';
import { TranslationEngineType, TranslationResponse } from '../types';
import { useTranslationHistory } from './useTranslationHistory';

export function useTranslation() {
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('yo'); // Default to Yoruba
  const [inputText, setInputText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [selectedEngine, setSelectedEngine] = useState<TranslationEngineType | undefined>(undefined);
  const [activeEngine, setActiveEngine] = useState<TranslationEngineType>('gemini-ai');
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
    }
    setError(null);
  }, [sourceLang, targetLang, translatedText]);

  const handleTranslate = useCallback(async (overrideText?: string) => {
    const textToTranslate = overrideText !== undefined ? overrideText : inputText;

    if (!textToTranslate || textToTranslate.trim().length === 0) {
      setTranslatedText('');
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response: TranslationResponse = await translationService.translateText({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        text: textToTranslate,
        preferredEngine: selectedEngine,
      });

      if (response.success) {
        setTranslatedText(response.translatedText);
        setActiveEngine(response.engine);
        setConfidence(response.confidence);
        setLinguisticNotes(response.linguisticNotes);
        setProcessingTimeMs(response.processingTimeMs || null);

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
