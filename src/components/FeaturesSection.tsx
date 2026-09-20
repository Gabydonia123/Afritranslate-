import React from 'react';
import { Download, ShieldCheck, Zap, Database, Globe, RefreshCw, Cpu, Layers } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Download className="w-5 h-5 text-amber-400" />,
      title: 'Progressive Web App (PWA)',
      description: 'Installable on Android, iOS, Windows, and macOS with service worker caching and offline fallback capabilities.',
    },
    {
      icon: <Layers className="w-5 h-5 text-orange-400" />,
      title: 'Decoupled Adapter Architecture',
      description: 'Engineered with ITranslationAdapter and ISpeechAdapter interfaces allowing plug-and-play AI and neural model integration.',
    },
    {
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      title: '23 African Languages',
      description: '11 Nigerian indigenous languages plus major East, Southern, West, and Central African linguistic families.',
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: 'Diacritic & Tone Mark Typing',
      description: 'Built-in virtual tone accent keyboard ensuring proper Yorùbá, Igbo, Hausa, and Urhobo orthography.',
    },
    {
      icon: <Database className="w-5 h-5 text-blue-400" />,
      title: 'Offline Lexicon Fallback',
      description: 'Local phrasebooks and morphological rule dictionaries keep core translations functional during network outages.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Zero Client Key Exposure',
      description: 'All AI model keys and transcription pipelines execute securely via server endpoints, never leaking to browser dev tools.',
    },
  ];

  return (
    <section id="features-section" className="py-12 sm:py-16 bg-stone-900 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>PWA & Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-50 tracking-tight">
            Built for Real-World African Accessibility
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            Engineered with high performance, resilience against unstable connectivity, and deep respect for African linguistic nuances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-stone-950 border border-stone-800 rounded-2xl p-6 hover:border-amber-500/40 transition shadow-lg space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="font-bold text-base text-stone-100">{f.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
