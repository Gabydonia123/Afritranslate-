import React, { useState, useRef } from 'react';
import {
  ArrowLeftRight,
  Mic,
  FileAudio,
  Volume2,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  Globe2,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { VoiceInputModal } from './VoiceInputModal';
import { AudioUploadPanel } from './AudioUploadPanel';
import { DiacriticsBar } from './DiacriticsBar';
import { getLanguageByCode } from '../config/languages';
import { audioService } from '../services/audio/AudioService';

interface TranslationWorkspaceProps {
  onOpenArchitecture?: () => void;
  externalSourceLang?: string;
  externalTargetLang?: string;
  externalText?: string;
}

const QUICK_LANGUAGE_PILLS = [
  { code: 'en', name: 'English' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'ha', name: 'Hausa' },
  { code: 'ig', name: 'Igbo' },
  { code: 'sw', name: 'Swahili' },
  { code: 'urh', name: 'Urhobo' },
  { code: 'am', name: 'Amharic' },
  { code: 'zu', name: 'Zulu' },
];

export const TranslationWorkspace: React.FC<TranslationWorkspaceProps> = ({
  externalSourceLang,
  externalTargetLang,
  externalText,
}) => {
  const {
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    inputText,
    setInputText,
    translatedText,
    isLoading,
    error,
    linguisticNotes,
    sources,
    activeSourceIndex,
    isDialectFallback,
    handleSelectSource,
    handleSwapLanguages,
    handleTranslate,
    handleClear,
  } = useTranslation();

  // Modals state
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isAudioUploadOpen, setIsAudioUploadOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Sync external quick selections if triggered from hero or phrasebook
  React.useEffect(() => {
    if (externalSourceLang) setSourceLang(externalSourceLang);
    if (externalTargetLang) setTargetLang(externalTargetLang);
    if (externalText) {
      setInputText(externalText);
      handleTranslate(externalText);
    }
  }, [externalSourceLang, externalTargetLang, externalText]);

  const sourceInfo = getLanguageByCode(sourceLang);
  const targetInfo = getLanguageByCode(targetLang);

  const isDialectPair = sourceInfo.isLowResource || targetInfo.isLowResource || isDialectFallback;

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertDiacritic = (char: string) => {
    if (!textareaRef.current) {
      setInputText((prev) => prev + char);
      return;
    }
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const newText = inputText.substring(0, start) + char + inputText.substring(end);
    setInputText(newText);

    // Reposition cursor right after inserted character
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + char.length, start + char.length);
      }
    }, 0);
  };

  const handleSpeak = async (text: string, langCode: string) => {
    if (!text || isPlayingAudio) return;
    setIsPlayingAudio(true);
    try {
      await audioService.speakText(text, langCode);
    } finally {
      setTimeout(() => setIsPlayingAudio(false), 1200);
    }
  };

  return (
    <section id="translation-workspace" className="py-8 sm:py-12 bg-stone-950 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Workspace Card Container */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Top Bar: Language Selectors, Swap, & Recommended Translator Engine Indicator */}
          <div className="p-3 sm:p-4 bg-stone-900/95 border-b border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Language Selection Buttons & Swap */}
            <div className="flex items-center space-x-2 flex-1 justify-between sm:justify-start">
              {/* Source Language Button */}
              <button
                id="source-language-selector-btn"
                onClick={() => setIsSourceModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-between space-x-2 px-3.5 py-2 rounded-xl bg-stone-800/90 hover:bg-stone-750 border border-stone-700 hover:border-amber-500/50 text-stone-100 transition shadow-xs"
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${sourceLang === 'en' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <div className="text-left">
                    <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">From</div>
                    <div className="text-xs sm:text-sm font-bold truncate max-w-[120px] sm:max-w-[170px]">
                      {sourceInfo.name}
                    </div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
              </button>

              {/* Swap Button */}
              <button
                id="swap-languages-btn"
                onClick={handleSwapLanguages}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700 transition shadow-xs shrink-0 active:rotate-180 duration-200"
                title="Swap source and target languages"
                aria-label="Swap languages"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>

              {/* Target Language Button */}
              <button
                id="target-language-selector-btn"
                onClick={() => setIsTargetModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-between space-x-2 px-3.5 py-2 rounded-xl bg-stone-800/90 hover:bg-stone-750 border border-stone-700 hover:border-amber-500/50 text-stone-100 transition shadow-xs"
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${targetLang === 'en' ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                  <div className="text-left">
                    <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">To</div>
                    <div className="text-xs sm:text-sm font-bold truncate max-w-[120px] sm:max-w-[170px]">
                      {targetInfo.name}
                    </div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
              </button>
            </div>

            {/* Recommended Engine Indicator */}
            <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto">
              <div
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs shadow-xs"
                title="Google Translate is auto-selected as the primary neural translation engine for African and global languages, with automatic AI fallback for regional dialects."
              >
                <span className="text-[11px] text-stone-400">Translator:</span>
                <span className="font-semibold text-stone-200 flex items-center space-x-1">
                  <span>Google Translate</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Recommended</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Language Switcher Bar with English always front & center */}
          <div className="px-4 py-2 bg-stone-950/40 border-b border-stone-800/60 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[11px] text-stone-500 shrink-0 font-medium">Quick Select:</span>
            {QUICK_LANGUAGE_PILLS.map((pill) => {
              const isSource = pill.code === sourceLang;
              const isTarget = pill.code === targetLang;
              return (
                <div key={pill.code} className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => {
                      if (pill.code !== targetLang) {
                        setSourceLang(pill.code);
                      } else {
                        handleSwapLanguages();
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition flex items-center space-x-1 ${
                      isSource
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-semibold'
                        : isTarget
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/60 font-semibold'
                        : 'bg-stone-800/60 text-stone-400 hover:text-stone-200 border-stone-750 hover:bg-stone-800'
                    }`}
                    title={`Set ${pill.name} as source language`}
                  >
                    <span>{pill.name}</span>
                    {pill.code === 'en' && (
                      <span className="text-[9px] px-1 py-0.2 bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 rounded">
                        EN
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Automatic Dialect Fallback Notice (When low-resource dialect selected or fallback occurred) */}
          {isDialectPair && (
            <div className="px-4 py-2.5 bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/30 border-b border-stone-800 flex items-center justify-between text-xs text-stone-300 animate-fadeIn">
              <div className="flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-semibold text-amber-300 mr-1.5">Indigenous Dialect Support:</span>
                  <span className="text-stone-300 text-[11px] sm:text-xs">
                    {sourceInfo.isLowResource ? sourceInfo.name : targetInfo.name} is a regional indigenous dialect. Automatically routing through Gemini AI computational linguist and authentic lexicons for accurate tone diacritics.
                  </span>
                </div>
              </div>
              <span className="hidden md:inline-block px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-semibold uppercase tracking-wider shrink-0">
                AI + Lexicon Fallback
              </span>
            </div>
          )}

          {/* Main Dual Translation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-800">
            {/* LEFT: Source Input Panel */}
            <div className="flex flex-col bg-stone-900/60 min-h-[320px] sm:min-h-[380px]">
              {/* Source Header Info */}
              <div className="px-4 py-2.5 bg-stone-950/40 border-b border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-stone-200">{sourceInfo.name}</span>
                  <span className="text-stone-500">({sourceInfo.nativeName})</span>
                  {sourceLang === 'en' && (
                    <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[10px]">
                      Source
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {inputText && (
                    <button
                      onClick={handleClear}
                      className="text-stone-400 hover:text-stone-200 transition text-xs"
                      title="Clear text input"
                    >
                      Clear
                    </button>
                  )}
                  <span className="text-[11px] text-stone-500">{inputText.length} / 5000</span>
                </div>
              </div>

              {/* Text Input Area */}
              <div className="p-4 flex-1 flex flex-col">
                <textarea
                  id="source-text-input"
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      handleTranslate();
                    }
                  }}
                  placeholder={`Enter text in ${sourceInfo.name} or click Voice dictation...`}
                  className="w-full flex-1 bg-transparent text-stone-100 placeholder-stone-500 resize-none focus:outline-none text-base sm:text-lg leading-relaxed min-h-[180px]"
                />
              </div>

              {/* Tonal Diacritics Bar for Typing Yoruba, Igbo, Hausa, Urhobo, etc. */}
              <DiacriticsBar
                sourceLangCode={sourceLang}
                onInsertChar={handleInsertDiacritic}
              />

              {/* Source Bottom Controls: Mic, Audio Upload, Listen, Translate Button */}
              <div className="p-3 sm:p-4 bg-stone-950/60 border-t border-stone-800 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center space-x-1.5">
                  {/* Microphone Voice Input Button */}
                  <button
                    id="mic-voice-input-btn"
                    onClick={() => setIsVoiceModalOpen(true)}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 border border-stone-700 transition flex items-center space-x-1.5 text-xs font-medium"
                    title={`Record voice in ${sourceInfo.name}`}
                  >
                    <Mic className="w-4 h-4 text-orange-400" />
                    <span className="hidden sm:inline">Voice</span>
                  </button>

                  {/* Audio File Upload Button */}
                  <button
                    id="audio-file-upload-btn"
                    onClick={() => setIsAudioUploadOpen(true)}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 border border-stone-700 transition flex items-center space-x-1.5 text-xs font-medium"
                    title="Upload audio file (MP3, WAV, M4A, WEBM, OGG)"
                  >
                    <FileAudio className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline">Upload Audio</span>
                  </button>

                  {/* Source Audio Pronunciation */}
                  {inputText && (
                    <button
                      onClick={() => handleSpeak(inputText, sourceLang)}
                      disabled={isPlayingAudio}
                      className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 border border-stone-700 transition"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-4 h-4 text-stone-400" />
                    </button>
                  )}
                </div>

                {/* Primary Translate Trigger */}
                <button
                  id="submit-translate-btn"
                  onClick={() => handleTranslate()}
                  disabled={isLoading || !inputText.trim()}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-stone-950 shadow-lg shadow-orange-950/40 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center space-x-2 active:scale-98"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Translating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Translate</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT: Target Output Panel */}
            <div className="flex flex-col bg-stone-900/40 min-h-[320px] sm:min-h-[380px] relative">
              {/* Target Header Info */}
              <div className="px-4 py-2.5 bg-stone-950/40 border-b border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-amber-300">{targetInfo.name}</span>
                  <span className="text-stone-500">({targetInfo.nativeName})</span>
                  {targetLang === 'en' && (
                    <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[10px]">
                      Target
                    </span>
                  )}
                </div>
                {sources && sources.length > 0 && (
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <span className="text-stone-500">Source:</span>
                    <span className="font-medium text-amber-400">
                      {sources[activeSourceIndex]?.name || 'Google Translate'}
                    </span>
                    {sources[activeSourceIndex]?.engine === 'google-translate' && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold uppercase">
                        Recommended
                      </span>
                    )}
                    {sources[activeSourceIndex]?.engine === 'gemini-ai' && isDialectPair && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-semibold">
                        Dialect AI
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Output Content Area */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                {isLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 text-stone-400 space-y-3">
                    <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium text-stone-300">Translating...</p>
                  </div>
                ) : error ? (
                  <div className="flex-1 flex items-center justify-center p-4">
                    <div className="p-4 bg-rose-950/40 border border-rose-800/80 rounded-2xl text-xs text-rose-300 flex items-start space-x-3 text-left max-w-md">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                      <div>
                        <p className="font-semibold text-rose-200">Translation Notice</p>
                        <p className="mt-1 leading-relaxed">{error}</p>
                      </div>
                    </div>
                  </div>
                ) : translatedText ? (
                  <div className="space-y-4">
                    <div className="text-stone-100 text-base sm:text-lg leading-relaxed font-medium">
                      {translatedText}
                    </div>

                    {/* Multi-Source Switch Pills (Source 1: Google Translate, Source 2: Gemini AI, Source 3: Lexicon) */}
                    {sources && sources.length > 1 && (
                      <div className="pt-2 border-t border-stone-800/60">
                        <div className="text-[11px] font-semibold text-stone-400 mb-1.5 flex items-center justify-between">
                          <span>Multi-Source Comparison:</span>
                          <span className="text-[10px] text-stone-500 font-normal">Click to compare translations</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {sources.map((src, idx) => {
                            const isGoogle = src.engine === 'google-translate';
                            return (
                              <button
                                key={src.name + idx}
                                onClick={() => handleSelectSource(idx)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition flex items-center space-x-1.5 ${
                                  activeSourceIndex === idx
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-xs'
                                    : 'bg-stone-800/80 text-stone-400 hover:text-stone-200 border-stone-700/80 hover:bg-stone-800'
                                }`}
                                title={`View translation from ${src.name}`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${activeSourceIndex === idx ? 'bg-amber-400' : 'bg-stone-500'}`} />
                                <span>{src.name}</span>
                                {isGoogle && (
                                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold">
                                    Recommended
                                  </span>
                                )}
                                {activeSourceIndex === idx && <Check className="w-3 h-3 text-amber-400 ml-0.5" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Linguistic Notes Breakdown */}
                    {linguisticNotes && (
                      <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 text-xs text-stone-300 space-y-1">
                        <div className="flex items-center space-x-1.5 text-amber-400 font-semibold text-[11px] uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          <span>Cultural & Tone Context:</span>
                        </div>
                        <p className="text-stone-300 text-xs leading-relaxed">{linguisticNotes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 text-stone-500 space-y-2">
                    <Globe2 className="w-10 h-10 stroke-1 text-stone-600" />
                    <p className="text-xs font-medium text-stone-400">
                      Translation result will appear here
                    </p>
                    <p className="text-[11px] text-stone-600 max-w-xs text-center">
                      Select {sourceInfo.name} → {targetInfo.name} and click Translate, or use Voice input.
                    </p>
                  </div>
                )}
              </div>

              {/* Output Bottom Controls: Copy, Pronounce */}
              <div className="p-3 sm:p-4 bg-stone-950/60 border-t border-stone-800 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-1.5">
                  {/* Listen / Pronounce Button */}
                  <button
                    id="listen-pronunciation-btn"
                    onClick={() => handleSpeak(translatedText, targetLang)}
                    disabled={!translatedText || isPlayingAudio}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-300 hover:text-amber-400 border border-stone-700 transition flex items-center space-x-1.5 text-xs"
                    title={`Pronounce translated text in ${targetInfo.name}`}
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-amber-400 animate-pulse' : 'text-stone-400'}`} />
                    <span className="hidden sm:inline">Listen</span>
                  </button>

                  {/* Copy Button */}
                  <button
                    id="copy-translation-btn"
                    onClick={handleCopy}
                    disabled={!translatedText}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-300 hover:text-amber-400 border border-stone-700 transition flex items-center space-x-1.5 text-xs font-medium"
                    title="Copy translated text to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-stone-400" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LanguageSelectorModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        selectedCode={sourceLang}
        onSelect={(code) => {
          setSourceLang(code);
          if (code === targetLang) {
            setTargetLang(sourceLang);
          }
        }}
        title="Select Source Language"
        otherSelectedCode={targetLang}
      />

      <LanguageSelectorModal
        isOpen={isTargetModalOpen}
        onClose={() => setIsTargetModalOpen(false)}
        selectedCode={targetLang}
        onSelect={(code) => {
          setTargetLang(code);
          if (code === sourceLang) {
            setSourceLang(targetLang);
          }
        }}
        title="Select Target Language"
        otherSelectedCode={sourceLang}
      />

      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        sourceLangCode={sourceLang}
        onConfirmText={(text) => {
          setInputText(text);
          handleTranslate(text);
        }}
      />

      <AudioUploadPanel
        isOpen={isAudioUploadOpen}
        onClose={() => setIsAudioUploadOpen(false)}
        sourceLangCode={sourceLang}
        targetLangCode={targetLang}
        onConfirmText={(text) => {
          setInputText(text);
          handleTranslate(text);
        }}
      />
    </section>
  );
};
