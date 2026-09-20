import React from 'react';
import { Type, Mic, FileAudio, ArrowRight, Cpu, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-stone-950 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-950/70 border border-orange-800/50 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Strict Multimodal Processing Pipelines</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-50 tracking-tight">
            How the Translation Architecture Works
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            All audio and voice inputs strictly flow through an independent Speech-to-Text extraction phase before reaching the modular Translation Service. Audio is never translated directly as raw bytes.
          </p>
        </div>

        {/* 3 Pipeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline 1: Text to Text */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="h-1 w-full bg-amber-500 absolute top-0 left-0" />
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                  <Type className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-100">1. Text Translation</h3>
                  <p className="text-xs text-stone-400">Direct String Pipeline</p>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-6">
                Source text is tokenized with diacritic normalization and routed through the Translation Service dispatcher to either Gemini AI, NLLB Neural Matrix, or Custom Rule Adapters.
              </p>

              {/* Visual Flow */}
              <div className="space-y-3 p-4 bg-stone-950 rounded-2xl border border-stone-800/80">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
                  <span className="font-medium text-stone-300">Input Text (Unicode)</span>
                  <span className="text-[10px] text-amber-400 font-mono">Stage 1</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-amber-500 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-300">
                  <span className="font-semibold">Translation Service Router</span>
                  <span className="text-[10px] font-mono">Stage 2</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-amber-500 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300">
                  <span className="font-semibold">Translated Indigenous Text</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
              Preserves tone marks (ẹ, ọ, ɓ, ɗ, ǝ) and vowel harmony.
            </div>
          </div>

          {/* Pipeline 2: Voice Input */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="h-1 w-full bg-orange-500 absolute top-0 left-0" />
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-100">2. Voice Translation</h3>
                  <p className="text-xs text-stone-400">Microphone STT Pipeline</p>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-6">
                Browser microphone stream captures spoken utterances, passes through the SpeechToTextService for phoneme recognition, and writes extracted text into the input field before translation occurs.
              </p>

              {/* Visual Flow */}
              <div className="space-y-2 p-3 bg-stone-950 rounded-2xl border border-stone-800/80">
                <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900 border border-stone-800 text-xs">
                  <span className="font-medium text-stone-300">Voice Input (Live Audio)</span>
                  <span className="text-[10px] text-orange-400 font-mono">Step 1</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-orange-950/40 border border-orange-800/60 text-xs text-orange-300">
                  <span className="font-semibold">Speech-to-Text (STT)</span>
                  <span className="text-[10px] font-mono">Step 2</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300">
                  <span className="font-semibold">Extracted Text (Input Field)</span>
                  <span className="text-[10px] font-mono">Step 3</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300">
                  <span className="font-semibold">Target Translation</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
              Strict isolation: raw voice never bypasses text stage.
            </div>
          </div>

          {/* Pipeline 3: Audio File Upload */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="h-1 w-full bg-emerald-500 absolute top-0 left-0" />
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <FileAudio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-100">3. Audio File Translation</h3>
                  <p className="text-xs text-stone-400">Multimodal File Pipeline</p>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-6">
                Uploaded audio files (MP3, WAV, M4A, WEBM, OGG) are validated, converted to base64, transcribed into written text via Gemini Audio AI, and presented for review prior to translation.
              </p>

              {/* Visual Flow */}
              <div className="space-y-2 p-3 bg-stone-950 rounded-2xl border border-stone-800/80">
                <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900 border border-stone-800 text-xs">
                  <span className="font-medium text-stone-300">Audio File (MP3/WAV/M4A)</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Step 1</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300">
                  <span className="font-semibold">Validation & STT Engine</span>
                  <span className="text-[10px] font-mono">Step 2</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300">
                  <span className="font-semibold">Review Recognized Text</span>
                  <span className="text-[10px] font-mono">Step 3</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300">
                  <span className="font-semibold">Final Translated Text</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
              Clear display of Original Audio, Extracted Text, and Translation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
