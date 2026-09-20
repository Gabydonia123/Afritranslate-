import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onSelectSamplePair: (source: string, target: string, text: string) => void;
  onScrollToWorkspace: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectSamplePair,
}) => {
  const sampleQuickPairs = [
    { label: 'English → Urhobo', src: 'en', tgt: 'urh', text: 'Good morning, how is your family? I need help.' },
    { label: 'Yorùbá → English', src: 'yo', tgt: 'en', text: 'Àlàáfíà, ìṣọ̀kan, àti ìtẹ̀síwájú fún gbogbo ènìyàn.' },
    { label: 'English → Isoko', src: 'en', tgt: 'iso', text: 'Welcome to our home. Thank you very much.' },
    { label: 'Hausa → Igbo', src: 'ha', tgt: 'ig', text: 'Sannu! Ina kwana? Mungode sosai da alheri.' },
    { label: 'English → Nupe', src: 'en', tgt: 'nup', text: 'How much is this food? Please reduce the price.' },
    { label: 'English → Kanuri', src: 'en', tgt: 'kn', text: 'Peace and good health to all people.' },
  ];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-stone-950 pt-8 pb-10 sm:pt-10 sm:pb-12 text-stone-100 border-b border-stone-800/80">
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-gradient-to-b from-amber-600/10 via-orange-600/5 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>African Indigenous Language Translator</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-50 tracking-tight leading-tight">
            Translate Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Indigenous African</span> Languages
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
            Translate text, speak using your microphone, or upload audio files with accurate pronunciation and dialect support.
          </p>

          {/* Sample quick-select chips */}
          <div className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2.5">
              Quick Translation Pairs:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {sampleQuickPairs.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectSamplePair(p.src, p.tgt, p.text)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 transition flex items-center space-x-1"
                >
                  <span>{p.label}</span>
                  <ArrowRight className="w-3 h-3 text-amber-400/70" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

