import { TranslationProvider, TranslationOptions } from './ITranslationAdapter';
import { TranslationResponse, TranslationRequest } from '../../types';
import { getLanguageByCode } from '../../config/languages';

const NLLB_LANGUAGE_MAP: Record<string, string> = {
  yo: 'yor_Latn',
  ha: 'hau_Latn',
  ig: 'ibo_Latn',
  sw: 'swh_Latn',
  zu: 'zul_Latn',
  xh: 'xho_Latn',
  am: 'amh_Ethi',
  so: 'som_Latn',
  af: 'afr_Latn',
  ln: 'lin_Latn',
  wo: 'wol_Latn',
  rw: 'kin_Latn',
  kn: 'knc_Latn',
  en: 'eng_Latn',
  fr: 'fra_Latn',
  ar: 'arb_Arab',
};

export class NLLBTranslationAdapter implements TranslationProvider {
  readonly id = 'nllb-adapter' as const;
  readonly name = 'NLLB Multilingual Neural Adapter';

  async isAvailable(): Promise<boolean> {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  canHandle(sourceLang: string, targetLang: string): boolean {
    return Boolean(NLLB_LANGUAGE_MAP[sourceLang] && NLLB_LANGUAGE_MAP[targetLang]);
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

    const sourceNllbCode = NLLB_LANGUAGE_MAP[srcLang];
    const targetNllbCode = NLLB_LANGUAGE_MAP[tgtLang];

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceLanguage: srcLang,
          targetLanguage: tgtLang,
          sourceLanguageName: options?.sourceLanguageName || sourceInfo.name,
          targetLanguageName: options?.targetLanguageName || targetInfo.name,
          sourceNllbCode,
          targetNllbCode,
          text: text,
          preferredEngine: 'nllb-adapter',
        }),
      });

      if (!response.ok) {
        throw new Error(`NLLB backend error: ${response.statusText}`);
      }

      const data = await response.json();
      const processingTime = Math.round(performance.now() - startTime);

      return {
        translatedText: data.translatedText || '',
        sourceLanguage: srcLang,
        targetLanguage: tgtLang,
        engine: 'nllb-adapter',
        confidence: data.confidence ?? 0.94,
        success: true,
        linguisticNotes: data.linguisticNotes || `NLLB neural matrix (${sourceNllbCode} → ${targetNllbCode}) token sequence.`,
        phoneticSpelling: data.phoneticSpelling,
        processingTimeMs: processingTime,
      };
    } catch (err) {
      console.warn('NLLB Adapter network call failed:', err);
      const processingTime = Math.round(performance.now() - startTime);
      return {
        translatedText: '',
        sourceLanguage: srcLang,
        targetLanguage: tgtLang,
        engine: 'nllb-adapter',
        confidence: 0,
        success: false,
        error: 'Translation service is temporarily unavailable for the selected NLLB pair.',
        processingTimeMs: processingTime,
      };
    }
  }
}
