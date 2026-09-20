import React, { useState } from 'react';
import { Layers, X, Cpu, ArrowRight, ShieldCheck, CheckCircle2, Database, Mic, Server, Code } from 'lucide-react';
import { TRANSLATION_ENGINES, SPEECH_ENGINES } from '../config/engines';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'diagram' | 'speech'>('matrix');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div
        id="architecture-modal"
        className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-stone-100"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100">
                Modular Translation & Speech Architecture
              </h3>
              <p className="text-xs text-stone-400">
                Decoupled adapter interfaces, engine matrix, and multimodal pipelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="p-3 border-b border-stone-800 bg-stone-950/60 flex items-center space-x-2 text-xs">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'matrix' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
            }`}
          >
            Translation Adapters Matrix
          </button>
          <button
            onClick={() => setActiveTab('speech')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'speech' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
            }`}
          >
            Speech Recognition (STT) Matrix
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'diagram' ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
            }`}
          >
            UML Layer Diagram
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-300">
                The frontend communicates exclusively through the <code>ITranslationAdapter</code> interface contract. Translation providers can be hot-swapped without altering UI state logic.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(TRANSLATION_ENGINES).map((engine) => (
                  <div
                    key={engine.id}
                    className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-100">{engine.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${engine.badgeColor}`}>
                        {engine.tier}
                      </span>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed">{engine.description}</p>

                    <div className="space-y-1 text-xs border-t border-stone-850 pt-2 text-stone-400">
                      <div>
                        <strong className="text-stone-300">Target Role:</strong> {engine.strengths}
                      </div>
                      <div>
                        <strong className="text-stone-300">Supported Languages:</strong>{' '}
                        {engine.supportedLanguagesCount === 23 ? 'All 23 Registered' : `${engine.supportedLanguagesCount} Languages`}
                      </div>
                      <div className="flex items-center space-x-2 pt-1 text-[11px]">
                        <span className={engine.isOfflineCapable ? 'text-emerald-400' : 'text-stone-500'}>
                          {engine.isOfflineCapable ? '✓ Offline Capable' : '✗ Requires Internet'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'speech' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-300">
                The <code>ISpeechAdapter</code> interface handles audio extraction. The speech pipeline is completely decoupled from the translation pipeline.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.values(SPEECH_ENGINES).map((engine) => (
                  <div
                    key={engine.id}
                    className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-100">{engine.name}</span>
                    </div>
                    <p className="text-xs text-stone-400">{engine.description}</p>
                    <div className="text-[11px] text-amber-400/90 font-medium">
                      Formats: {engine.supportedFormats.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'diagram' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-4 font-mono text-xs text-stone-300">
                <div className="text-amber-400 font-bold text-sm">Application Layer Architecture:</div>

                {/* Diagram Blocks */}
                <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                  <div className="text-amber-300 font-semibold">[Presentation & PWA Layer]</div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    React 19 + Tailwind CSS + Lucide Icons + Web Audio Visualizers + Service Worker Shell
                  </p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-stone-600 rotate-90" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                    <div className="text-orange-300 font-semibold">[Translation Coordinator]</div>
                    <p className="text-[11px] text-stone-400 font-sans">
                      TranslationService (Singleton) → Dynamic Router → ITranslationAdapter Contract
                    </p>
                  </div>

                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                    <div className="text-emerald-300 font-semibold">[Speech Coordinator]</div>
                    <p className="text-[11px] text-stone-400 font-sans">
                      SpeechToTextService (Singleton) → MediaRecorder → ISpeechAdapter Contract
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-stone-600 rotate-90" />
                </div>

                <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1">
                  <div className="text-amber-300 font-semibold">[Secure Serverless Backend Bridge (Express)]</div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    POST /api/translate (Gemini Indigenous AI) • POST /api/transcribe (Multimodal Audio STT)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Enterprise Adapter Pattern Pattern v1.0.0</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
