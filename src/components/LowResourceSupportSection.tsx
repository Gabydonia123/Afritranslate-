import React from 'react';
import { Sparkles, ShieldCheck, Check, Layers, AlertCircle, BookOpen, ChevronRight } from 'lucide-react';
import { getLowResourceLanguages } from '../config/languages';
import { LOW_RESOURCE_RULES } from '../data/lowResourceGlossary';

interface LowResourceSupportSectionProps {
  onSelectLanguage: (code: string) => void;
}

export const LowResourceSupportSection: React.FC<LowResourceSupportSectionProps> = ({
  onSelectLanguage,
}) => {
  const lowResourceList = getLowResourceLanguages();

  return (
    <section id="low-resource-support" className="py-12 sm:py-16 bg-stone-900 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Low-Resource Language Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-50 tracking-tight">
            Specialized Low-Resource Nigerian Language Support
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            Conventional multilingual translation APIs often ignore low-resource Niger Delta and Middle Belt languages. Our architecture dynamically routes these pairs to dedicated AI and morphological adapters.
          </p>
        </div>

        {/* 2-Column Focus: Architecture Strategy & Language Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Strategy & Linguistic Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-stone-100 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>The Routing Strategy</span>
              </h3>

              <p className="text-xs text-stone-300 leading-relaxed">
                When a user requests a language such as <span className="text-amber-400 font-semibold">Urhobo</span>, <span className="text-amber-400 font-semibold">Isoko</span>, or <span className="text-amber-400 font-semibold">Nupe</span>:
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <div className="font-semibold text-amber-300 flex items-center space-x-1.5">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>1. Dynamic Router Interception</span>
                  </div>
                  <p className="text-stone-400 leading-relaxed">
                    The TranslationService inspects the language registry. Because Urhobo is marked as low-resource, the system bypasses conventional tokenizers and activates the <strong>Gemini Indigenous AI Adapter</strong> or <strong>Custom Lexicon Adapter</strong>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <div className="font-semibold text-orange-300 flex items-center space-x-1.5">
                    <Check className="w-4 h-4 text-orange-400" />
                    <span>2. ATR Vowel Harmony & Digraph Preservation</span>
                  </div>
                  <p className="text-stone-400 leading-relaxed">
                    Edoid (Urhobo, Isoko) and Nupoid consonant clusters like <em>vw</em>, <em>dj</em>, <em>rh</em>, <em>kp</em>, <em>gb</em> and sub-dots (<em>ẹ, ọ</em>) are rigorously preserved during token synthesis.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <div className="font-semibold text-emerald-300 flex items-center space-x-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>3. Offline Custom Heuristic Fallback</span>
                  </div>
                  <p className="text-stone-400 leading-relaxed">
                    In zero-connectivity environments, a curated local dictionary and rule engine resolves standard greetings, market trade expressions, and emergency vocabulary offline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Low-Resource Languages Interactive Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lowResourceList.map((lang) => {
              const rule = LOW_RESOURCE_RULES[lang.code];

              return (
                <div
                  key={lang.code}
                  className="bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-4.5 flex flex-col justify-between transition group shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-300 flex items-center justify-center font-mono font-bold text-xs">
                          {lang.code}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-stone-100 group-hover:text-amber-300">
                            {lang.name}
                          </h4>
                          <p className="text-[11px] text-stone-400">{lang.nativeName}</p>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-stone-900 text-stone-400 border border-stone-800">
                        {lang.country.split(',')[0]}
                      </span>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed mb-3">
                      {lang.description}
                    </p>

                    {rule && (
                      <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] space-y-1">
                        <div className="text-[10px] text-amber-400 font-semibold uppercase">Linguistic Rule:</div>
                        <p className="text-stone-300">{rule.orthographyNotes}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">{lang.speakers} speakers</span>
                    <button
                      onClick={() => onSelectLanguage(lang.code)}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                    >
                      <span>Translate</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
