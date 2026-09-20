import React, { useEffect } from 'react';
import { Mic, MicOff, Square, Play, Sparkles, CheckCircle2, AlertCircle, X, ArrowRight, Volume2 } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { getLanguageByCode } from '../config/languages';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceLangCode: string;
  onConfirmText: (text: string) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  sourceLangCode,
  onConfirmText,
}) => {
  const lang = getLanguageByCode(sourceLangCode);

  const {
    isRecording,
    isProcessing,
    recognizedText,
    error,
    audioLevel,
    recordingSeconds,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useSpeechRecognition({
    languageHint: sourceLangCode,
    onTextRecognized: (text) => {
      // Recognized text callback
    },
  });

  useEffect(() => {
    if (isOpen) {
      // Auto-start recording when modal opens
      startRecording();
    } else {
      cancelRecording();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDone = () => {
    if (recognizedText) {
      onConfirmText(recognizedText);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div
        id="voice-input-modal"
        className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">Voice Recognition Input</h3>
              <p className="text-xs text-stone-400">
                Speaking in <span className="text-amber-400 font-semibold">{lang.name}</span> ({lang.nativeName})
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              cancelRecording();
              onClose();
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body & Waveform */}
        <div className="p-6 text-center space-y-6">
          {/* Animated Microphone Orb */}
          <div className="relative flex items-center justify-center py-4">
            {isRecording && (
              <>
                <div
                  className="absolute w-32 h-32 rounded-full bg-amber-500/20 animate-ping"
                  style={{ animationDuration: '2s' }}
                />
                <div
                  className="absolute w-24 h-24 rounded-full bg-orange-500/30 transition-all duration-150"
                  style={{ transform: `scale(${1 + (audioLevel / 100) * 0.4})` }}
                />
              </>
            )}

            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
                isRecording
                  ? 'bg-gradient-to-tr from-rose-600 to-red-500 text-white ring-4 ring-rose-500/30 scale-105'
                  : isProcessing
                  ? 'bg-amber-600/50 text-amber-200 animate-pulse'
                  : 'bg-gradient-to-tr from-amber-600 to-orange-600 text-white hover:from-amber-500 hover:to-orange-500'
              }`}
            >
              {isRecording ? (
                <Square className="w-7 h-7 fill-white" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Recording Status & Timer */}
          <div>
            {isRecording ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-amber-300 animate-pulse">
                  Listening... Speak clearly in {lang.name}
                </p>
                <p className="text-xs text-stone-400 font-mono">
                  Recording time: 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                </p>
              </div>
            ) : isProcessing ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-amber-400">
                  Transcribing speech through speech-to-text engine...
                </p>
                <p className="text-xs text-stone-400">
                  Converting audio waveform to text characters
                </p>
              </div>
            ) : (
              <p className="text-xs text-stone-400">
                Click microphone to start or restart voice input
              </p>
            )}
          </div>

          {/* Simulated Waveform Visualizer */}
          {isRecording && (
            <div className="flex items-center justify-center space-x-1 h-10 px-4">
              {[12, 28, 45, 70, 90, 60, 80, 40, 65, 30, 85, 50, 75, 35, 60, 20].map((height, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-amber-500 to-orange-400 rounded-full transition-all duration-100"
                  style={{
                    height: `${Math.max(6, (height * (audioLevel + 20)) / 100)}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Recognized Text Display */}
          {recognizedText && (
            <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-left space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-semibold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recognized Spoken Text</span>
                </span>
                <span className="text-stone-500">STT Output</span>
              </div>
              <p className="text-sm font-medium text-stone-100 leading-relaxed">
                "{recognizedText}"
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-start space-x-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Strict 2-Step Notice */}
          <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/60 text-[11px] text-stone-400 flex items-center justify-center space-x-2">
            <span className="font-semibold text-stone-300">Pipeline:</span>
            <span>Voice</span>
            <ArrowRight className="w-3 h-3 text-stone-500" />
            <span className="text-amber-400 font-medium">STT Recognition</span>
            <ArrowRight className="w-3 h-3 text-stone-500" />
            <span>Text Translation</span>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <button
            onClick={() => {
              cancelRecording();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-stone-100 hover:bg-stone-800"
          >
            Cancel
          </button>

          {isRecording ? (
            <button
              onClick={stopRecording}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md flex items-center space-x-1.5"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop & Recognize</span>
            </button>
          ) : (
            <button
              onClick={handleDone}
              disabled={!recognizedText || isProcessing}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 shadow-md flex items-center space-x-1.5"
            >
              <span>Insert to Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
