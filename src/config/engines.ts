import { TranslationEngineType } from '../types';

export interface EngineMetadata {
  id: TranslationEngineType;
  name: string;
  shortName: string;
  description: string;
  bestFor: string;
  isOnlineRequired: boolean;
  status: 'active' | 'beta' | 'fallback';
  badgeColor: string;
  architectureTier: 'Primary AI Neural' | 'Multilingual Transformer' | 'Rule & Dictionary Expert' | 'Offline Heuristic';
  tier?: string;
  strengths?: string;
  supportedLanguagesCount?: number;
  isOfflineCapable?: boolean;
}

export interface SpeechEngineMetadata {
  id: string;
  name: string;
  description: string;
  supportedFormats: string[];
}

export const TRANSLATION_ENGINES: Record<TranslationEngineType, EngineMetadata> = {
  'gemini-ai': {
    id: 'gemini-ai',
    name: 'Gemini Indigenous AI Model',
    shortName: 'Gemini AI',
    description: 'Server-side advanced LLM conditioned with deep African linguistic prompts, morphological tonality, diacritics retention, and cultural context.',
    bestFor: 'All languages, especially low-resource Nigerian languages (Urhobo, Isoko, Nupe, Igala, Ebira, Kanuri, Idoma, Ijaw).',
    isOnlineRequired: true,
    status: 'active',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    architectureTier: 'Primary AI Neural',
    tier: 'Primary AI Neural',
    strengths: 'Deep cultural semantics, tone diacritics, low-resource Nigerian synthesis',
    supportedLanguagesCount: 23,
    isOfflineCapable: false,
  },
  'nllb-adapter': {
    id: 'nllb-adapter',
    name: 'NLLB Multilingual Neural Adapter',
    shortName: 'NLLB Engine',
    description: 'No Language Left Behind (NLLB-200) compatible translation architecture optimized for high-resource pairs.',
    bestFor: 'High-resource African languages (Hausa, Yoruba, Igbo, Swahili, Zulu, Amharic, Afrikaans, French).',
    isOnlineRequired: true,
    status: 'active',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    architectureTier: 'Multilingual Transformer',
    tier: 'Multilingual Transformer',
    strengths: 'Standardized orthography for major vehicular languages',
    supportedLanguagesCount: 15,
    isOfflineCapable: false,
  },
  'custom-rule': {
    id: 'custom-rule',
    name: 'Custom Linguistic & Dictionary Adapter',
    shortName: 'Custom Lexicon',
    description: 'Specialized morphological dictionary, glossing rules, and phonetic inflection engine for low-resource Niger Delta & Benue languages.',
    bestFor: 'Domain-specific vocabulary, proverbs, idioms, and baseline offline fallback.',
    isOnlineRequired: false,
    status: 'active',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    architectureTier: 'Rule & Dictionary Expert',
    tier: 'Rule & Dictionary Expert',
    strengths: 'High-precision dictionary matching, vowel harmony rules',
    supportedLanguagesCount: 23,
    isOfflineCapable: true,
  },
  'hybrid': {
    id: 'hybrid',
    name: 'Hybrid AI + Heuristic Adapter',
    shortName: 'Hybrid Engine',
    description: 'Dual-pipeline validation marrying rule-based morphological decomposition with neural generative context.',
    bestFor: 'Complex tonality validation and disambiguation of polysemous words.',
    isOnlineRequired: true,
    status: 'beta',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    architectureTier: 'Primary AI Neural',
    tier: 'Hybrid Validation',
    strengths: 'Tone disambiguation and morpho-syntax auditing',
    supportedLanguagesCount: 23,
    isOfflineCapable: false,
  },
  'mock': {
    id: 'mock',
    name: 'Offline Development Fallback',
    shortName: 'Offline Fallback',
    description: 'Deterministic local dictionary and pattern matching for development verification and zero-network environments.',
    bestFor: 'Testing UI states, offline PWA demonstrations, and development environments.',
    isOnlineRequired: false,
    status: 'fallback',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
    architectureTier: 'Offline Heuristic',
    tier: 'Offline Fallback',
    strengths: 'Zero-latency, 100% offline uptime guarantee',
    supportedLanguagesCount: 23,
    isOfflineCapable: true,
  },
};

export const SPEECH_ENGINES: Record<string, SpeechEngineMetadata> = {
  'gemini-whisper': {
    id: 'gemini-whisper',
    name: 'Gemini Multimodal Audio Transcriber',
    description: 'Server-side multimodal speech-to-text supporting Nigerian & African phonemes and dialects from audio recordings.',
    supportedFormats: ['MP3', 'WAV', 'M4A', 'WEBM', 'OGG', 'AAC'],
  },
  'browser-web-speech': {
    id: 'browser-web-speech',
    name: 'Browser Web Speech API',
    description: 'Client-side real-time continuous microphone recognition running directly in supported browsers without server roundtrips.',
    supportedFormats: ['Live Microphone Stream'],
  },
  'mock-stt': {
    id: 'mock-stt',
    name: 'Offline Acoustic Heuristic STT',
    description: 'Offline speech recognition fallback matching vocal waveforms against pre-cached phonological patterns.',
    supportedFormats: ['Synthetic Fallback'],
  },
};
