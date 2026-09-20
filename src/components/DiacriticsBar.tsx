import React from 'react';
import { Sparkles } from 'lucide-react';
import { languageService } from '../services/language/LanguageService';

interface DiacriticsBarProps {
  sourceLangCode: string;
  onInsertChar: (char: string) => void;
}

export const DiacriticsBar: React.FC<DiacriticsBarProps> = ({
  sourceLangCode,
  onInsertChar,
}) => {
  const characters = languageService.getDiacriticList(sourceLangCode);
  const lang = languageService.getByCode(sourceLangCode);

  return (
    <div id="diacritics-toolbar" className="flex items-center space-x-1.5 overflow-x-auto py-1.5 px-3 bg-stone-900/90 border-t border-stone-800 text-stone-300 text-xs no-scrollbar">
      <div className="flex items-center space-x-1 text-stone-400 shrink-0 pr-1.5 border-r border-stone-800">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span className="font-semibold text-[11px] uppercase tracking-wider">Tones & Diacritics:</span>
      </div>

      <div className="flex items-center space-x-1 shrink-0">
        {characters.slice(0, 18).map((char, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onInsertChar(char)}
            className="min-w-[28px] h-7 px-1.5 rounded bg-stone-800 hover:bg-amber-600 hover:text-white text-stone-200 text-xs font-mono font-medium border border-stone-700 hover:border-amber-500 transition-colors flex items-center justify-center shadow-xs active:scale-95"
            title={`Insert ${char} into text`}
          >
            {char}
          </button>
        ))}
      </div>

      {lang.tonal && (
        <span className="ml-auto pl-2 text-[10px] text-amber-400 font-medium shrink-0 hidden md:inline">
          {lang.name} tone marks
        </span>
      )}
    </div>
  );
};
