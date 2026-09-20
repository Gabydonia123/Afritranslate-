import { LanguageInfo, LanguageRegion } from '../../types';
import { LANGUAGE_REGISTRY, getLanguageByCode } from '../../config/languages';

export class LanguageService {
  public getAllLanguages(): LanguageInfo[] {
    return LANGUAGE_REGISTRY;
  }

  public getByCode(code: string): LanguageInfo {
    return getLanguageByCode(code);
  }

  public searchLanguages(query: string, regionFilter?: LanguageRegion | 'All'): LanguageInfo[] {
    let list = LANGUAGE_REGISTRY;

    if (regionFilter && regionFilter !== 'All') {
      list = list.filter((l) => l.region === regionFilter);
    }

    if (!query || query.trim() === '') {
      return list;
    }

    const q = query.toLowerCase().trim();
    return list.filter((l) =>
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q) ||
      l.country.toLowerCase().includes(q) ||
      l.family.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q)
    );
  }

  public getDiacriticList(langCode: string): string[] {
    const lang = this.getByCode(langCode);
    const standardAfricanDiacritics = ['ẹ', 'ọ', 'ṣ', 'ị', 'ụ', 'ṅ', 'ɓ', 'ɗ', 'ƙ', 'ƴ', 'ǝ', 'á', 'à', 'ā', 'é', 'è', 'í', 'ì', 'ó', 'ò', 'ú', 'ù', 'ẹ́', 'ẹ̀', 'ọ́', 'ọ̀', 'ń', 'ḿ'];

    if (lang && lang.specialCharacters && lang.specialCharacters.length > 0) {
      // Merge unique
      return Array.from(new Set([...lang.specialCharacters, ...standardAfricanDiacritics]));
    }
    return standardAfricanDiacritics;
  }

  public getRegistryStats() {
    const total = LANGUAGE_REGISTRY.length;
    const nigerian = LANGUAGE_REGISTRY.filter((l) => l.region === 'Nigeria').length;
    const otherAfrican = LANGUAGE_REGISTRY.filter((l) => l.region !== 'Nigeria' && l.region !== 'International').length;
    const lowResource = LANGUAGE_REGISTRY.filter((l) => l.isLowResource).length;
    const tonal = LANGUAGE_REGISTRY.filter((l) => l.tonal).length;

    return {
      total,
      nigerian,
      otherAfrican,
      lowResource,
      tonal,
      totalSpeakersRepresented: '500M+',
    };
  }
}

export const languageService = new LanguageService();
