import React from 'react';
import { Globe, Heart, Layers, BookOpen, ShieldCheck } from 'lucide-react';
import { LANGUAGE_REGISTRY } from '../config/languages';

interface FooterProps {
  onOpenPhrasebook: () => void;
  onOpenArchitecture: () => void;
  onOpenHistory: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPhrasebook,
  onOpenArchitecture,
  onOpenHistory,
  onScrollToTop,
}) => {
  return (
    <footer id="app-footer" className="bg-stone-950 border-t border-stone-850 text-stone-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-stone-100">
                Indigenous Language Translator
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              A multilingual web translator engineered for African indigenous languages, supporting text-to-text translation, speech recognition, and audio file processing.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-amber-400/90 pt-1">
              <span>Hausa, Yorùbá, Igbo, Urhobo, Isoko, Nupe, Igala, Ebira, Idoma, Ijaw, Kanuri, Swahili & beyond.</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider">Features & Tools</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={onOpenPhrasebook} className="hover:text-amber-300 transition">
                  African Phrasebook & Proverbs
                </button>
              </li>
              <li>
                <button onClick={onOpenHistory} className="hover:text-amber-300 transition">
                  Translation History
                </button>
              </li>
              <li>
                <a href="#supported-languages" className="hover:text-amber-300 transition">
                  Supported Languages Directory
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical & Deployment */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider">PWA & Production</h4>
            <div className="space-y-2 text-stone-400 text-[11px]">
              <div className="flex items-center space-x-1.5 text-stone-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Secret Exposure Architecture</span>
              </div>
              <p>
                Deployment-ready for Netlify, Vercel, and Cloud Run with service worker caching, manifest schema, and standalone viewport support.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Indigenous Language Translator PWA. Dedicated to African Linguistic Heritage.
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={onScrollToTop} className="hover:text-stone-300 transition">
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
