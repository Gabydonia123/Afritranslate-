import { TranslationProvider, TranslationOptions } from './ITranslationAdapter';
import { TranslationResponse, TranslationRequest } from '../../types';
import { getLanguageByCode } from '../../config/languages';

export class AITranslationAdapter implements TranslationProvider {
  readonly id = 'gemini-ai' as const;
  readonly name = 'Gemini Indigenous AI Model';

  async isAvailable(): Promise<boolean> {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  canHandle(sourceLang: string, targetLang: string): boolean {
    // Gemini AI can handle all language pairs, including specialized low-resource pairs
    return sourceLang !== targetLang;
  }

  async translate(
    textOrRequest: string | TranslationRequest,
    sourceLanguage?: string,
    targetLanguage?: string,
    options?: TranslationOptions
  ): Promise<TranslationResponse> {
    const text = typeof textOrRequest === 'string' ? textOrRequest : textOrRequest.text;
    const srcLang = typeof textOrRequest === 'string' ? (sourceLanguage || 'en') : textOrRequest.sourceLanguage;
    const tgtLang = typeof textOrRequest === 'string' ? (targetLanguage || 'yo') : textOrRequest.targetLanguage;

    const startTime = performance.now();
    const sourceInfo = getLanguageByCode(srcLang);
    const targetInfo = getLanguageByCode(tgtLang);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceLanguage: srcLang,
          targetLanguage: tgtLang,
          sourceLanguageName: options?.sourceLanguageName || sourceInfo.name,
          targetLanguageName: options?.targetLanguageName || targetInfo.name,
          text: text,
          preferredEngine: 'gemini-ai',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'AI Translation returned an unsuccessful status.');
      }

      const processingTime = Math.round(performance.now() - startTime);

      return {
        translatedText: data.translatedText || '',
        sourceLanguage: srcLang,
        targetLanguage: tgtLang,
        engine: 'gemini-ai',
        confidence: data.confidence ?? 0.96,
        success: true,
        linguisticNotes: data.linguisticNotes || `${sourceInfo.name} → ${targetInfo.name} contextual translation with tone preservation.`,
        phoneticSpelling: data.phoneticSpelling || '',
        processingTimeMs: processingTime,
        detectedSourceTones: data.detectedSourceTones || [],
      };
    } catch (err: any) {
      console.warn('AI Translation provider endpoint error, propagating for fallback handler:', err);
      throw err;
    }
  }
}
