import React from 'react';
import { Mic, FileAudio, CheckCircle2, ShieldCheck, Waves, ArrowRight, Sparkles } from 'lucide-react';

export const VoiceAudioShowcaseSection: React.FC = () => {
  return (
    <section id="voice-audio-showcase" className="py-12 sm:py-16 bg-stone-950 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Waves className="w-3.5 h-3.5" />
            <span>Acoustic & Multimodal Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-50 tracking-tight">
            Voice & Audio Speech Recognition Pipeline
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            Our SpeechToTextService separates speech recognition from translation, enabling speech adapters to be swapped independently without impacting the core translation engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Live Microphone Audio Input */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-100">
                Live Microphone Recognition
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Records live speech in browsers supporting the Web Audio API with real-time waveform visualization. Audio frames are converted to Opus/WebM and transcribed into exact text orthography.
              </p>

              <ul className="space-y-2 text-xs text-stone-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Works across desktop, tablet, and mobile browsers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dual adapter fallback (AI Multimodal Whisper + Web Speech API)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Extracted transcript populated directly into input workspace</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 text-xs text-amber-400 font-semibold">
              Live Waveform Meter & Automatic Silence Termination
            </div>
          </div>

          {/* Feature 2: Audio File Upload & Format Validation */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <FileAudio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-100">
                Audio File Transcribe & Translate
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Enables users to upload recorded interviews, oral history recordings, voice notes, and marketplace conversations in MP3, WAV, M4A, WEBM, or OGG formats up to 25MB.
              </p>

              <ul className="space-y-2 text-xs text-stone-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict verification of MIME headers and file byte boundaries</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>In-browser audio playback preview with pause/play controls</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Explicit 3-step visualization: Original Audio → Recognized Text → Translation</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 text-xs text-amber-400 font-semibold">
              Multimodal Base64 Serverless Bridge Architecture
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
