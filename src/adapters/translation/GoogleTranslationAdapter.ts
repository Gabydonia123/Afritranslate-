import { TranslationProvider, TranslationOptions } from './ITranslationAdapter';
import { TranslationResponse, TranslationRequest } from '../../types';
import { getLanguageByCode } from '../../config/languages';

export class GoogleTranslationAdapter implements TranslationProvider {
  readonly id = 'google-translate' as const;
  readonly name = 'Google Translate Engine';

  async isAvailable(): Promise<boolean> {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  canHandle(sourceLang: string, targetLang: string): boolean {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceLanguage: srcLang,
          targetLanguage: tgtLang,
          sourceLanguageName: options?.sourceLanguageName || sourceInfo.name,
          targetLanguageName: options?.targetLanguageName || targetInfo.name,
          text: text,
          preferredEngine: 'google-translate',
          isContextLocked: options?.isContextLocked ?? true,
          contextPrompt: options?.contextPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Google Translate backend error: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Translation returned unsuccessful status.');
      }

      const processingTime = Math.round(performance.now() - startTime);

      return {
        translatedText: data.translatedText || '',
        sourceLanguage: srcLang,
        targetLanguage: tgtLang,
        engine: data.engine || 'google-translate',
        confidence: data.confidence ?? 0.98,
        success: true,
        linguisticNotes: data.linguisticNotes || `${sourceInfo.name} → ${targetInfo.name} translated via Google Translate.`,
        phoneticSpelling: data.phoneticSpelling || '',
        processingTimeMs: processingTime,
        detectedSourceTones: data.detectedSourceTones || [],
        sources: data.sources || [],
        isDialectFallback: data.isDialectFallback ?? false,
        recommendedEngine: data.recommendedEngine || 'google-translate',
        isContextLocked: data.isContextLocked ?? true,
        lockedContextLabel: data.lockedContextLabel,
      };
    } catch (err: any) {
      console.warn('Google Translation provider error, propagating for fallback handler:', err);
      throw err;
    }
  }
}
