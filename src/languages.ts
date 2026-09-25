/**
 * Language Registry & Metadata Mapping
 *
 * Maps ISO and regional language codes to their English and native names,
 * with flags/metadata identifying low-resource indigenous dialects to trigger
 * the custom lexicon fallback pipeline.
 */

export interface LanguageDefinition {
  /** Language identifier code (e.g., 'en', 'yo', 'urh') */
  code: string;
  /** Official English name */
  name: string;
  /** Autonym / indigenous native name with complete orthography */
  nativeName: string;
  /** Whether the language is a low-resource indigenous dialect */
  isLowResource: boolean;
  /** Flag to explicitly trigger the specialized custom lexicon fallback pipeline */
  triggersCustomLexiconFallback: boolean;
  /** Routing strategy: standard neural or custom lexicon + AI fallback */
  fallbackStrategy: 'google-translate' | 'custom-lexicon-and-ai';
  /** Geographic region */
  region: string;
  /** Linguistic language family */
  family: string;
  /** Primary countries/states where spoken */
  country: string;
  /** Approximate speaker population */
  speakers?: string;
  /** Linguistic notes regarding tone and morphology */
  notes?: string;
}

/**
 * Direct mapping of language codes to their definitions.
 */
export const LANGUAGES: Record<string, LanguageDefinition> = {
  // ================= LOW-RESOURCE INDIGENOUS DIALECTS (CUSTOM LEXICON TRIGGERED) =================
  urh: {
    code: 'urh',
    name: 'Urhobo',
    nativeName: 'Ẹvwe rẹ Urhobo',
    isLowResource: true,
    triggersCustomLexiconFallback: true,
    fallbackStrategy: 'custom-lexicon-and-ai',
    region: 'Nigeria (Niger Delta)',
    family: 'Niger-Congo (Southwestern Edoid)',
    country: 'Delta State, Nigeria',
    speakers: '3+ Million',
    notes: 'Southwestern Edoid dialect featuring complex consonant clusters (vw, dj, rh), strict ATR vowel harmony, and distinctive kinship terms (Oni-ọrọde, Inene).',
  },
  iso: {
    code: 'iso',
    name: 'Isoko',
    nativeName: 'Ẹvwe rẹ Isoko',
    isLowResource: true,
    triggersCustomLexiconFallback: true,
    fallbackStrategy: 'custom-lexicon-and-ai',
    region: 'Nigeria (Niger Delta)',
    family: 'Niger-Congo (Southwestern Edoid)',
    country: 'Delta & Bayelsa States, Nigeria',
    speakers: '1.5+ Million',
    notes: 'Southwestern Edoid language with 7 ATR oral vowels, kp/gb/vw/wh phonemes, and rich greeting etiquette.',
  },
  igl: {
    code: 'igl',
    name: 'Igala',
    nativeName: 'Íchí Igala',
    isLowResource: true,
    triggersCustomLexiconFallback: true,
    fallbackStrategy: 'custom-lexicon-and-ai',
    region: 'Nigeria (Middle Belt)',
    family: 'Niger-Congo (Yoruboid)',
    country: 'Kogi, Edo, Anambra, Nigeria',
    speakers: '2+ Million',
    notes: 'Yoruboid language with sub-dots (ẹ, ọ), nasalized ñ, and tone contractions.',
  },
  nup: {
    code: 'nup',
    name: 'Nupe',
    nativeName: 'Zanka Nupe',
    isLowResource: true,
    triggersCustomLexiconFallback: true,
    fallbackStrategy: 'custom-lexicon-and-ai',
    region: 'Nigeria (Middle Belt)',
    family: 'Niger-Congo (Nupoid)',
    country: 'Niger, Kwara, Kogi, Abuja FCT, Nigeria',
    speakers: '3.5+ Million',
    notes: 'Nupoid branch with distinctive digraphs (ts, dz, kp, gb, ny) and pitch contours.',
  },
  kn: {
    code: 'kn',
    name: 'Kanuri',
    nativeName: 'Kànurí',
    isLowResource: true,
    triggersCustomLexiconFallback: true,
    fallbackStrategy: 'custom-lexicon-and-ai',
    region: 'Nigeria (Northeast / Lake Chad)',
    family: 'Nilo-Saharan (Saharan)',
    country: 'Borno, Yobe, Chad, Niger',
    speakers: '9+ Million',
    notes: 'Saharan language of the ancient Kanem-Bornu Empire with central schwa (ǝ) vowel and tonal postpositions.',
  },
  ebr: {
    code: 'ebr',
    name: 'Ebira',
    nativeName: 'Okene / Ebira',
    isLowResource: true,
    triggersCustomLexiconFallback: true,
    fallbackStrategy: 'custom-lexicon-and-ai',
    region: 'Nigeria (Middle Belt)',
    family: 'Niger-Congo (Nupoid)',
    country: 'Kogi, Edo, Nasarawa, Nigeria',
    speakers: '1.8+ Million',
    notes: 'Nine-vowel harmony system with open/close pairs and cultural greeting forms.',
  },
  idu: {
    code: 'idu',
    name: 'Idoma',
    nativeName: 'Ẹ̀dá Idoma',
    isLowResource: true,
    triggersCustomLexiconFallback: true,
    fallbackStrategy: 'custom-lexicon-and-ai',
    region: 'Nigeria (Benue Valley)',
    family: 'Niger-Congo (Idomoid)',
    country: 'Benue, Nasarawa, Cross River, Nigeria',
    speakers: '2+ Million',
    notes: 'Idomoid pitch register system with complex verbal morphology.',
  },
  ijw: {
    code: 'ijw',
    name: 'Ijaw (Ịjọ)',
    nativeName: 'Ịzọn / Ijo',
    isLowResource: true,
    triggersCustomLexiconFallback: true,
    fallbackStrategy: 'custom-lexicon-and-ai',
    region: 'Nigeria (Niger Delta Coast)',
    family: 'Niger-Congo (Ijoid)',
    country: 'Bayelsa, Rivers, Delta, Ondo, Nigeria',
    speakers: '3.5+ Million',
    notes: 'Ijoid branch featuring Subject-Object-Verb (SOV) structure and implosives ḅ, ḍ.',
  },

  // ================= HIGH-RESOURCE AFRICAN & GLOBAL LANGUAGES =================
  yo: {
    code: 'yo',
    name: 'Yorùbá',
    nativeName: 'Èdè Yorùbá',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'Nigeria / West Africa',
    family: 'Niger-Congo (Volta-Niger)',
    country: 'Nigeria, Benin, Togo',
    speakers: '45+ Million',
    notes: 'High-resource tonal language with sub-dots for open vowels and phonemic pitch registers.',
  },
  ha: {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Harshen Hausa',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'Nigeria / West Africa',
    family: 'Afroasiatic (Chadic)',
    country: 'Nigeria, Niger, Ghana, Chad',
    speakers: '80+ Million',
    notes: 'Major vehicular language written in Latin Boko with hooked consonants (ɓ, ɗ, ƙ, ƴ).',
  },
  ig: {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Asụsụ Igbo',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'Nigeria (Southeast)',
    family: 'Niger-Congo (Igboid)',
    country: 'Southeastern Nigeria',
    speakers: '30+ Million',
    notes: 'Tonal language with vowel harmony and diacritical sub-dots (ị, ọ, ụ) and velar nasal ṅ.',
  },
  sw: {
    code: 'sw',
    name: 'Swahili (Kiswahili)',
    nativeName: 'Kiswahili',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'East Africa',
    family: 'Niger-Congo (Bantu)',
    country: 'Kenya, Tanzania, Uganda, Rwanda, DRC',
    speakers: '150+ Million',
    notes: 'Official lingua franca of the East African Community with standard noun class concord.',
  },
  zu: {
    code: 'zu',
    name: 'Zulu (isiZulu)',
    nativeName: 'isiZulu',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'Southern Africa',
    family: 'Niger-Congo (Bantu - Nguni)',
    country: 'South Africa, Zimbabwe, Eswatini',
    speakers: '28+ Million',
    notes: 'Nguni language featuring dental, alveolar, and lateral click consonants (c, q, x).',
  },
  xh: {
    code: 'xh',
    name: 'Xhosa (isiXhosa)',
    nativeName: 'isiXhosa',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'Southern Africa',
    family: 'Niger-Congo (Bantu - Nguni)',
    country: 'South Africa, Lesotho',
    speakers: '20+ Million',
    notes: 'Nguni language with 18 distinct click consonant phonemes.',
  },
  am: {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ (Amarəñña)',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'Horn of Africa',
    family: 'Afroasiatic (Semitic)',
    country: 'Ethiopia',
    speakers: '57+ Million',
    notes: 'Working language of Ethiopia written in the ancient Ge\'ez Fidel abugida script.',
  },
  so: {
    code: 'so',
    name: 'Somali',
    nativeName: 'Af-Soomaali',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'Horn of Africa',
    family: 'Afroasiatic (Cushitic)',
    country: 'Somalia, Somaliland, Djibouti, Ethiopia, Kenya',
    speakers: '22+ Million',
    notes: 'Cushitic pitch-accent language written in standard Latin script.',
  },
  af: {
    code: 'af',
    name: 'Afrikaans',
    nativeName: 'Afrikaans',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'Southern Africa',
    family: 'Indo-European (Germanic)',
    country: 'South Africa, Namibia',
    speakers: '17+ Million',
    notes: 'Germanic language of Southern Africa with simplified morphology.',
  },
  ln: {
    code: 'ln',
    name: 'Lingala',
    nativeName: 'Lingála',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'Central Africa',
    family: 'Niger-Congo (Bantu)',
    country: 'DR Congo, Republic of Congo, Angola',
    speakers: '45+ Million',
    notes: 'Bantu lingua franca of the Congo River basin with open vowel accents.',
  },
  wo: {
    code: 'wo',
    name: 'Wolof',
    nativeName: 'Wolof',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'West Africa',
    family: 'Niger-Congo (Senegambian)',
    country: 'Senegal, The Gambia, Mauritania',
    speakers: '12+ Million',
    notes: 'Senegambian language with standard Latin orthography and velar nasal ŋ.',
  },
  rw: {
    code: 'rw',
    name: 'Kinyarwanda',
    nativeName: 'Ikinyarwanda',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'East Africa',
    family: 'Niger-Congo (Bantu)',
    country: 'Rwanda, DRC, Uganda',
    speakers: '13+ Million',
    notes: 'Bantu language with high/low pitch contrasts and rich noun-class prefixes.',
  },
  pcm: {
    code: 'pcm',
    name: 'Nigerian Pidgin',
    nativeName: 'Naija',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'West Africa (Nigeria)',
    family: 'English-based Atlantic Creole',
    country: 'Nigeria, West African diaspora',
    speakers: '100+ Million',
    notes: 'Pan-Nigerian lingua franca with distinct tense-aspect auxiliary markers (dey, don, go).',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'International',
    family: 'Indo-European (Germanic)',
    country: 'Global / Official in 24 African nations',
    speakers: '1.5+ Billion',
    notes: 'Global pivot language and medium of instruction across Anglophone Africa.',
  },
  fr: {
    code: 'fr',
    name: 'French (Français)',
    nativeName: 'Français',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'International',
    family: 'Indo-European (Romance)',
    country: 'Official across 21 Francophone African nations',
    speakers: '300+ Million',
    notes: 'Official language across Francophone West and Central Africa.',
  },
  ar: {
    code: 'ar',
    name: 'Arabic (العربية)',
    nativeName: 'العربية (Al-ʿArabīyyah)',
    isLowResource: false,
    triggersCustomLexiconFallback: false,
    fallbackStrategy: 'google-translate',
    region: 'International',
    family: 'Afroasiatic (Semitic)',
    country: 'North Africa, Horn of Africa, Chad, Sudan',
    speakers: '400+ Million',
    notes: 'Official language across North Africa and the Sahara.',
  },
};

/**
 * Checks whether a given language code corresponds to a low-resource indigenous dialect.
 */
export function isLowResourceDialect(code: string): boolean {
  if (!code) return false;
  const lang = LANGUAGES[code.toLowerCase().trim()];
  return Boolean(lang?.isLowResource);
}

/**
 * Checks whether translation to or from this language code should trigger
 * the custom lexicon fallback pipeline.
 */
export function triggersCustomLexiconFallback(code: string): boolean {
  if (!code) return false;
  const lang = LANGUAGES[code.toLowerCase().trim()];
  return Boolean(lang?.triggersCustomLexiconFallback);
}

/**
 * Determines whether a translation pair involves a low-resource dialect
 * that necessitates routing to the custom cultural lexicon and AI model.
 */
export function shouldTriggerCustomLexiconFallback(
  sourceCode: string,
  targetCode: string
): boolean {
  return triggersCustomLexiconFallback(sourceCode) || triggersCustomLexiconFallback(targetCode);
}

/**
 * Retrieves the language definition for a given code.
 */
export function getLanguage(code: string): LanguageDefinition | undefined {
  if (!code) return undefined;
  return LANGUAGES[code.toLowerCase().trim()];
}

/**
 * Retrieves the English name for a given language code.
 */
export function getLanguageName(code: string): string {
  const lang = getLanguage(code);
  return lang ? lang.name : code.toUpperCase();
}

/**
 * Retrieves the native autonym for a given language code.
 */
export function getNativeName(code: string): string {
  const lang = getLanguage(code);
  return lang ? lang.nativeName : code;
}

/**
 * Returns an array of all low-resource indigenous dialects configured for custom fallback.
 */
export function getLowResourceLanguages(): LanguageDefinition[] {
  return Object.values(LANGUAGES).filter((l) => l.isLowResource);
}

/**
 * Returns an array of all registered languages, sorted alphabetically by English name.
 */
export function getAllLanguagesList(): LanguageDefinition[] {
  return Object.values(LANGUAGES).sort((a, b) => a.name.localeCompare(b.name));
}

export default LANGUAGES;
