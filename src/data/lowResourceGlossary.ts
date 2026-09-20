export interface LanguageRule {
  vowelHarmony: string;
  toneStructure: string;
  salutations: Record<string, string>;
  commonVocabulary: Record<string, string>;
  orthographyNotes: string;
}

export const LOW_RESOURCE_RULES: Record<string, LanguageRule> = {
  urh: {
    vowelHarmony: '9 vowels divided into ATR (Advanced Tongue Root) +/- sets: /i, e, ɛ (ẹ), a, ɔ (ọ), o, u/.',
    toneStructure: 'Two level tones (High, Low) plus downstep and gliding contour tones.',
    salutations: {
      'good morning': 'Miguọ / Ọkọrhọ',
      'good afternoon': 'Miguọ',
      'good evening': 'Miguọ',
      'thank you': 'Kobiruo / Kobiruo gangan',
      'how are you': 'Kẹdọ kọ / Otọ rẹ oma?',
      'welcome': 'Miguọ kẹ wẹ / Nnọọ',
      'safe journey': 'Onyo kẹ wẹ',
      'peace': 'Ufuoma',
      'love': 'Ẹguọnọ',
      'water': 'Ame',
      'food': 'Emurhe',
      'home': 'Uwévwi',
      'friend': 'Ugbeyan'
    },
    commonVocabulary: {
      'i': 'mẹ / mi',
      'you': 'wẹ / wọ',
      'he': 'ọye / ọ',
      'she': 'ọye / ọ',
      'we': 'avwanre',
      'they': 'ayen',
      'yes': 'eeye / in',
      'no': 'ẹjẹ / kake',
      'come': 'cha / kpo cha',
      'go': 'kpo / kpo vrẹn',
      'eat': 're emurhe',
      'drink': 'da ame',
      'speak': 'ta ẹvwe',
      'god': 'Ọghẹnẹ',
      'king': 'Ovie',
      'market': 'Eki'
    },
    orthographyNotes: 'Uses sub-dots (ẹ, ọ) and digraphs: rh (voiceless alveolar trill), vw (voiced labiodental approximant), dj (affricate).'
  },
  iso: {
    vowelHarmony: 'Strict 7-vowel set with ATR harmony across root morphemes.',
    toneStructure: 'High, Mid, Low with distinct interrogative pitch contours.',
    salutations: {
      'good morning': 'Dóo / Otọ rẹ oma?',
      'good afternoon': 'Dóo',
      'good evening': 'Dóo',
      'thank you': 'Whé kobiruo / Kobiruo gaga',
      'how are you': 'Otọ rẹ oma / Kẹdọ?',
      'welcome': 'Dóo bru mai',
      'peace': 'Ufuoma',
      'love': 'Uyoyou',
      'water': 'Ame',
      'food': 'Emu'
    },
    commonVocabulary: {
      'i': 'mẹ',
      'you': 'wẹ',
      'we': 'mai',
      'they': 'ae',
      'yes': 'ee',
      'no': 'ii-i',
      'god': 'Ọghẹnẹ',
      'king': 'Ovie',
      'market': 'Eki'
    },
    orthographyNotes: 'Similar to Urhobo; utilizes kp, gb, vw, wh.'
  },
  igl: {
    vowelHarmony: '7 oral vowels /i, e, ẹ, a, ọ, o, u/ with complete open/close balance.',
    toneStructure: 'High, Mid, Low tone marks with frequent tone contraction in compound nouns.',
    salutations: {
      'good morning': 'Ágba / Ól\'áárọ̀',
      'good afternoon': 'Ágba ól\'ọ́jọ́',
      'thank you': 'Ágba / Ágba púpọ̀',
      'how are you': 'Ábu kẹ nẹ?',
      'welcome': 'Ábá wá',
      'peace': 'Ùjọ̀',
      'water': 'Omi',
      'food': 'Újẹ'
    },
    commonVocabulary: {
      'i': 'umi / mi',
      'you': 'uwẹ / wẹ',
      'god': 'Ọjọ',
      'king': 'Atah',
      'market': 'Afia'
    },
    orthographyNotes: 'Distinguished by sub-dots (ẹ, ọ) and nasalized ñ.'
  },
  nup: {
    vowelHarmony: '5 oral vowels plus nasalized pairs.',
    toneStructure: 'High, Mid, Low tones affecting lexical meanings of monosyllabic verbs.',
    salutations: {
      'good morning': 'Kubè lanyi',
      'good evening': 'Kubè lolé',
      'thank you': 'Gàfara / Gàfara boci',
      'how are you': 'Ké wun yi o?',
      'welcome': 'Kubè',
      'peace': 'Lafia',
      'water': 'Nuwan',
      'food': 'Gyagi'
    },
    commonVocabulary: {
      'god': 'Sòkó',
      'king': 'Etsu',
      'market': 'Dzuko'
    },
    orthographyNotes: 'Includes ts, dz, kp, gb, ny sequences.'
  },
  kn: {
    vowelHarmony: 'Saharan vowel harmony with schwa /ǝ/ phoneme.',
    toneStructure: 'High, Low tones and downstep.',
    salutations: {
      'good morning': 'Wushé sandí / Ndâ kǝndegǝro?',
      'thank you': 'Gode dondé / Ala ro gode',
      'how are you': 'Ndâ wuro?',
      'welcome': 'Wushé fátowaro',
      'peace': 'Nǝm kǝlâfíyà',
      'water': 'Njí',
      'food': 'Bǝrí'
    },
    commonVocabulary: {
      'god': 'Ala',
      'king': 'Shehu / Mai',
      'market': 'Kasugu'
    },
    orthographyNotes: 'Features standard Kanuri Orthography with upside-down e (ǝ) and geminated consonants.'
  },
  ebr: {
    vowelHarmony: 'Nine vowel set with distinct ATR sets.',
    toneStructure: 'High, Low, Falling.',
    salutations: {
      'good morning': 'Mẹ́yì owúza',
      'thank you': 'Mí yẹnẹ́ kẹ́tẹ́',
      'how are you': 'Ọnyì nẹ́?',
      'welcome': 'Ọzẹyì nẹ',
      'peace': 'Ẹjẹ́',
      'water': 'Anyi',
      'food': 'Eyi'
    },
    commonVocabulary: {
      'god': 'Ọhọmọri',
      'king': 'Ohinoyi',
      'market': 'Ahache'
    },
    orthographyNotes: 'Vowel diacritics ẹ and ọ are standard.'
  },
  idu: {
    vowelHarmony: '7 vowel system with ATR distinctions.',
    toneStructure: 'High, Mid, Low tones.',
    salutations: {
      'good morning': 'Aah-ọ / K\'ó lé wó?',
      'thank you': 'Ánẹ́ gẹgẹ́',
      'how are you': 'Ole nẹ?',
      'welcome': 'Nnọọ',
      'peace': 'Ọnọkpa',
      'water': 'Enyl',
      'food': 'Ilyi'
    },
    commonVocabulary: {
      'god': 'Ọchọkọlọhọ / Ọchọ',
      'king': 'Och\'Idoma',
      'market': 'Ehi'
    },
    orthographyNotes: 'Diacritic sub-dots denote open vowels.'
  },
  ijw: {
    vowelHarmony: '9 vowels with cross-height vowel harmony.',
    toneStructure: 'Tonal with phrasal tone sandhi.',
    salutations: {
      'good morning': 'Do-o seribọ',
      'thank you': 'Do kpọkpọ',
      'how are you': 'Kẹrẹ kẹrẹ?',
      'welcome': 'Wari kẹrẹ do-o',
      'peace': 'Kẹrẹ',
      'water': 'Bedi / Ame',
      'food': 'Fie ye'
    },
    commonVocabulary: {
      'god': 'Tamuno / Ayiba',
      'king': 'Amanyanabo / Pere',
      'market': 'Fie'
    },
    orthographyNotes: 'Under-dotted consonants ḅ, ḍ represent implosives.'
  }
};
