import { TranslationEngineType, TranslationResponse } from '../../types';

export interface TranslationOptions {
  preferredEngine?: TranslationEngineType;
  sourceLanguageName?: string;
  targetLanguageName?: string;
}

/**
 * Standard Provider/Adapter interface for all indigenous language translation engines.
 * Decouples the presentation and application layers from concrete model/API implementations.
 */
export interface TranslationProvider {
  readonly id: TranslationEngineType;
  readonly name: string;
  isAvailable(): Promise<boolean> | boolean;
  canHandle(sourceLang: string, targetLang: string): boolean;
  translate(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
    options?: TranslationOptions
  ): Promise<TranslationResponse>;
}

/**
 * Alias for backward compatibility
 */
export type ITranslationAdapter = TranslationProvider;
