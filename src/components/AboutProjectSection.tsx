import React from 'react';
import { BookOpen, GraduationCap, Heart, Award, Sparkles, ExternalLink, Code } from 'lucide-react';

export const AboutProjectSection: React.FC = () => {
  return (
    <section id="about-project" className="py-12 sm:py-16 bg-stone-950 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic & Linguistic Heritage Project</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-stone-50 tracking-tight">
              About the Indigenous Language Translator PWA
            </h2>

            <div className="mt-4 space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <p>
                Africa is home to over 2,000 distinct languages, embodying centuries of rich oral history, philosophy, medicine, and cultural heritage. However, modern multilingual translation technologies have predominantly catered to high-resource languages, leaving many indigenous Nigerian and African languages digitally underserved.
              </p>
              <p>
                The <strong>Indigenous Language Translator</strong> was conceived as a modular, progressive software system designed to bridge this divide. By combining state-of-the-art multimodal artificial intelligence (Gemini 2.5), multilingual neural machine translation matrices (NLLB), and handcrafted morphological heuristic rule engines, the platform delivers high-accuracy translation even for low-resource languages like Urhobo, Isoko, Kanuri, and Nupe.
              </p>
            </div>

            {/* Core Project Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-stone-800">
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                  <Heart className="w-4 h-4" />
                  <span>Cultural Preservation</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Safeguards threatened dialects and oral literatures through digital corpus integration.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1.5">
                <div className="flex items-center space-x-2 text-orange-400 font-bold text-xs">
                  <Code className="w-4 h-4" />
                  <span>Modular Architecture</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Fully decoupled adapter pattern allowing new translation and STT engines to plug in seamlessly.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                  <Award className="w-4 h-4" />
                  <span>Offline First PWA</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Engineered to operate reliably in low-bandwidth and offline environments across Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
