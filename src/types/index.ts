export type LanguageRegion = 'Nigeria' | 'East Africa' | 'West Africa' | 'Southern Africa' | 'Horn of Africa' | 'Central Africa' | 'International';

export type LanguageAvailability = 'High-Resource' | 'AI & Custom Engine' | 'Low-Resource Specialized';

export type TranslationEngineType = 'gemini-ai' | 'nllb-adapter' | 'custom-rule' | 'hybrid' | 'mock';

export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  region: LanguageRegion;
  country: string;
  speakers: string;
  family: string;
  availability: LanguageAvailability;
  supportedTranslationEngines: TranslationEngineType[];
  speechToTextAvailability: boolean;
  textToSpeechAvailability: boolean;
  specialCharacters: string[];
  description: string;
  sampleGreeting: {
    native: string;
    english: string;
    pronunciation?: string;
  };
  tonal: boolean;
  isLowResource: boolean;
}

export interface TranslationRequest {
  sourceLanguage: string; // language code
  targetLanguage: string; // language code
  text: string;
  preferredEngine?: TranslationEngineType;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  engine: TranslationEngineType;
  confidence: number;
  success: boolean;
  error?: string;
  linguisticNotes?: string;
  phoneticSpelling?: string;
  processingTimeMs?: number;
  detectedSourceTones?: string[];
}

export interface SpeechToTextRequest {
  audioBlob?: Blob;
  audioBase64?: string;
  mimeType: string;
  languageHint?: string;
}

export interface SpeechToTextResponse {
  recognizedText: string;
  detectedLanguage?: string;
  confidence: number;
  success: boolean;
  error?: string;
  durationSeconds?: number;
  engine: 'browser-web-speech' | 'gemini-whisper' | 'mock-stt';
}

export interface HistoryItem {
  id: string;
  sourceLang: string;
  targetLang: string;
  sourceText: string;
  translatedText: string;
  timestamp: number;
  engine: TranslationEngineType;
  bookmarked?: boolean;
}

export type PhraseCategory =
  | 'Greetings'
  | 'Emergency & Health'
  | 'Market & Trade'
  | 'Family & Courtesy'
  | 'Numbers & Directions'
  | 'Culture & Wisdom'
  | 'Politeness & Gratitude'
  | 'Questions & Directions'
  | 'Health & Emergency'
  | 'Commerce & Market'
  | 'Family & Community'
  | 'Proverbs & Wisdom';

export interface PhraseItem {
  id: string;
  category: string;
  english: string;
  translations: Record<string, string>; // langCode -> text
  culturalNote?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export interface AudioTranslationResponse {
  success: boolean;
  recognizedText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
  linguisticNotes?: string;
  phoneticSpelling?: string;
  error?: string;
}
