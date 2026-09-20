import { TranslationProvider } from '../../adapters/translation/ITranslationAdapter';
import { AITranslationAdapter } from '../../adapters/translation/AITranslationAdapter';
import { NLLBTranslationAdapter } from '../../adapters/translation/NLLBTranslationAdapter';
import { CustomLanguageAdapter } from '../../adapters/translation/CustomLanguageAdapter';
import { MockTranslationAdapter } from '../../adapters/translation/MockTranslationAdapter';
import { TranslationEngineType, TranslationRequest, TranslationResponse } from '../../types';
import { getLanguageByCode, hasLanguage } from '../../config/languages';

/**
 * Application Layer Coordinator for Language Translation.
 * Handles language code validation, intelligent engine routing, and multi-tier fallback recovery.
 */
export class TranslationService {
  private providers: Map<TranslationEngineType, TranslationProvider> = new Map();

  constructor() {
    this.registerProvider(new AITranslationAdapter());
    this.registerProvider(new NLLBTranslationAdapter());
    this.registerProvider(new CustomLanguageAdapter());
    this.registerProvider(new MockTranslationAdapter());
  }

  /**
   * Register a new translation provider/adapter
   */
  public registerProvider(provider: TranslationProvider): void {
    this.providers.set(provider.id, provider);
  }

  /**
   * Alias for backward compatibility
   */
  public registerAdapter(adapter: TranslationProvider): void {
    this.registerProvider(adapter);
  }

  /**
   * Returns list of currently registered engine identifiers
   */
  public getAvailableEngines(): TranslationEngineType[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Intelligently selects the optimal translation engine based on language configuration,
   * resource availability tier, network status, and user override preferences.
   */
  public selectBestEngine(
    sourceLang: string,
    targetLang: string,
    preferredEngine?: TranslationEngineType
  ): TranslationEngineType {
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    // Offline mode: automatically prefer Custom Lexicon or Mock
    if (!isOnline) {
      const customProvider = this.providers.get('custom-rule');
      if (customProvider && customProvider.canHandle(sourceLang, targetLang)) {
        return 'custom-rule';
      }
      return 'mock';
    }

    // Explicit user preference validation
    if (preferredEngine && this.providers.has(preferredEngine)) {
      const selected = this.providers.get(preferredEngine)!;
      if (selected.canHandle(sourceLang, targetLang)) {
        return preferredEngine;
      }
    }

    const srcInfo = getLanguageByCode(sourceLang);
    const tgtInfo = getLanguageByCode(targetLang);

    // If either language is Low-Resource (Urhobo, Isoko, Nupe, Igala, Ebira, Kanuri, Idoma, Ijaw),
    // route to Gemini Indigenous AI or Custom Rule Morphological Lexicon
    if (srcInfo.isLowResource || tgtInfo.isLowResource) {
      return 'gemini-ai';
    }

    // High-resource pairs default to AI for superior tone and cultural context
    return 'gemini-ai';
  }

  /**
   * Core translation execution pipeline with language validation and multi-tier fallback cascade.
   */
  public async translateText(request: TranslationRequest): Promise<TranslationResponse> {
    // 1. Language validation
    if (!hasLanguage(request.sourceLanguage)) {
      return {
        translatedText: '',
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        engine: 'mock',
        confidence: 0,
        success: false,
        error: `Unrecognized source language code "${request.sourceLanguage}". Please select a registered indigenous language.`,
      };
    }

    if (!hasLanguage(request.targetLanguage)) {
      return {
        translatedText: '',
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        engine: 'mock',
        confidence: 0,
        success: false,
        error: `Unrecognized target language code "${request.targetLanguage}". Please select a registered indigenous language.`,
      };
    }

    // 2. Empty text validation
    if (!request.text || request.text.trim().length === 0) {
      return {
        translatedText: '',
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        engine: request.preferredEngine || 'gemini-ai',
        confidence: 1,
        success: true,
      };
    }

    // 3. Identical language check
    if (request.sourceLanguage.toLowerCase() === request.targetLanguage.toLowerCase()) {
      return {
        translatedText: request.text,
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        engine: request.preferredEngine || 'gemini-ai',
        confidence: 1,
        success: true,
        linguisticNotes: 'Source and target languages are identical. Text preserved directly with orthography intact.',
      };
    }

    // 4. Provider routing
    const engineId = this.selectBestEngine(request.sourceLanguage, request.targetLanguage, request.preferredEngine);
    const primaryProvider = this.providers.get(engineId) || this.providers.get('gemini-ai') || this.providers.get('mock')!;

    const srcInfo = getLanguageByCode(request.sourceLanguage);
    const tgtInfo = getLanguageByCode(request.targetLanguage);

    try {
      const result = await primaryProvider.translate(
        request.text,
        request.sourceLanguage,
        request.targetLanguage,
        {
          preferredEngine: engineId,
          sourceLanguageName: srcInfo.name,
          targetLanguageName: tgtInfo.name,
        }
      );

      if (result.success && result.translatedText) {
        return result;
      }

      throw new Error(result.error || 'Primary provider returned empty response.');
    } catch (primaryErr: any) {
      console.warn(`Translation attempt with provider [${engineId}] failed:`, primaryErr);

      // Fallback Tier 1: Custom Rule Lexicon
      const customProvider = this.providers.get('custom-rule');
      if (customProvider && engineId !== 'custom-rule') {
        try {
          const fallbackResult = await customProvider.translate(
            request.text,
            request.sourceLanguage,
            request.targetLanguage,
            { preferredEngine: 'custom-rule' }
          );
          if (fallbackResult.success && fallbackResult.translatedText) {
            return {
              ...fallbackResult,
              linguisticNotes: `(Fallback Provider: Custom Lexicon) ${fallbackResult.linguisticNotes || ''}`,
            };
          }
        } catch (customErr) {
          console.warn('Custom rule fallback failed:', customErr);
        }
      }

      // Fallback Tier 2: Offline Mock Provider
      const mockProvider = this.providers.get('mock');
      if (mockProvider && engineId !== 'mock') {
        return mockProvider.translate(
          request.text,
          request.sourceLanguage,
          request.targetLanguage,
          { preferredEngine: 'mock' }
        );
      }

      return {
        translatedText: '',
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        engine: engineId,
        confidence: 0,
        success: false,
        error: 'Translation service is temporarily unavailable. Please verify network connection and try again.',
      };
    }
  }
}

// Export singleton instance
export const translationService = new TranslationService();
