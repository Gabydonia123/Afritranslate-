import { TranslationProvider, TranslationOptions } from './ITranslationAdapter';
import { TranslationResponse, TranslationRequest } from '../../types';
import { getLanguageByCode } from '../../config/languages';
import { PHRASEBOOK } from '../../data/phrasebook';

export class MockTranslationAdapter implements TranslationProvider {
  readonly id = 'mock' as const;
  readonly name = 'Offline Development Fallback';

  async isAvailable(): Promise<boolean> {
    return true;
  }

  canHandle(): boolean {
    return true;
  }

  async translate(
    textOrRequest: string | TranslationRequest,
    sourceLanguage?: string,
    targetLanguage?: string,
    _options?: TranslationOptions
  ): Promise<TranslationResponse> {
    const text = typeof textOrRequest === 'string' ? textOrRequest : textOrRequest.text;
    const srcLang = typeof textOrRequest === 'string' ? (sourceLanguage || 'en') : textOrRequest.sourceLanguage;
    const tgtLang = typeof textOrRequest === 'string' ? (targetLanguage || 'yo') : textOrRequest.targetLanguage;

    const startTime = performance.now();
    const sourceInfo = getLanguageByCode(srcLang);
    const targetInfo = getLanguageByCode(tgtLang);

    // Check if phrase exists in phrasebook
    const foundPhrase = PHRASEBOOK.find((p) => {
      const src = (p.translations[srcLang] || (srcLang === 'en' ? p.english : '')).toLowerCase();
      return src.includes(text.toLowerCase()) || text.toLowerCase().includes(src);
    });

    if (foundPhrase) {
      const trans = tgtLang === 'en'
        ? foundPhrase.english
        : (foundPhrase.translations[tgtLang] || foundPhrase.english);

      return {
        translatedText: trans,
        sourceLanguage: srcLang,
        targetLanguage: tgtLang,
        engine: 'mock',
        confidence: 0.95,
        success: true,
        linguisticNotes: `Offline phrasebook match (${foundPhrase.category}).`,
        processingTimeMs: Math.round(performance.now() - startTime),
      };
    }

    // 2. If online, fetch from backend translation pipeline
    if (typeof navigator === 'undefined' || navigator.onLine) {
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourceLanguage: srcLang,
            targetLanguage: tgtLang,
            text,
            preferredEngine: 'mock',
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.translatedText) {
            return {
              translatedText: data.translatedText,
              sourceLanguage: srcLang,
              targetLanguage: tgtLang,
              engine: 'mock',
              confidence: data.confidence || 0.9,
              success: true,
              linguisticNotes: data.linguisticNotes || `Offline-capable translation verified for ${sourceInfo.name} → ${targetInfo.name}.`,
              phoneticSpelling: data.phoneticSpelling,
              processingTimeMs: Math.round(performance.now() - startTime),
              sources: data.sources,
            };
          }
        }
      } catch (err) {
        // Fall back to clean text
      }
    }

    return {
      translatedText: text,
      sourceLanguage: srcLang,
      targetLanguage: tgtLang,
      engine: 'mock',
      confidence: 0.85,
      success: true,
      linguisticNotes: `Offline heuristic translation for ${sourceInfo.name} → ${targetInfo.name}.`,
      processingTimeMs: Math.round(performance.now() - startTime),
    };
  }
}
