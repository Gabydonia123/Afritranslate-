import React, { useRef, useState } from 'react';
import { UploadCloud, FileAudio, Play, Pause, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, X, Music } from 'lucide-react';
import { useAudioUpload } from '../hooks/useAudioUpload';
import { getLanguageByCode } from '../config/languages';

interface AudioUploadPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sourceLangCode: string;
  targetLangCode: string;
  onConfirmText: (extractedText: string) => void;
}

export const AudioUploadPanel: React.FC<AudioUploadPanelProps> = ({
  isOpen,
  onClose,
  sourceLangCode,
  targetLangCode,
  onConfirmText,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  const sourceLang = getLanguageByCode(sourceLangCode);
  const targetLang = getLanguageByCode(targetLangCode);

  const {
    selectedFile,
    audioUrl,
    isProcessing,
    currentStep,
    extractedText,
    translatedAudioText,
    linguisticNotes,
    phoneticSpelling,
    error,
    processAudioFile,
    resetUpload,
  } = useAudioUpload({
    sourceLanguage: sourceLangCode,
    targetLanguage: targetLangCode,
    onTextExtracted: () => {},
  });

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAudioFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processAudioFile(e.target.files[0]);
    }
  };

  const toggleAudioPlayback = () => {
    if (!audioPreviewRef.current) return;
    if (isPlayingPreview) {
      audioPreviewRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioPreviewRef.current.play();
      setIsPlayingPreview(true);
    }
  };

  const handleUseExtractedText = () => {
    if (extractedText) {
      onConfirmText(extractedText);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div
        id="audio-upload-panel"
        className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <FileAudio className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">Audio File Translation</h3>
              <p className="text-xs text-stone-400">
                Extract speech from <span className="text-amber-400 font-semibold">{sourceLang.name}</span> audio files
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              resetUpload();
              onClose();
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Pipeline Visualizer Indicator */}
          <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
            <div className={`flex items-center space-x-1.5 ${selectedFile ? 'text-amber-400 font-semibold' : 'text-stone-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${selectedFile ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'}`}>
                1
              </div>
              <span>Upload Audio</span>
            </div>

            <ArrowRight className="w-3.5 h-3.5 text-stone-600" />

            <div className={`flex items-center space-x-1.5 ${extractedText ? 'text-amber-400 font-semibold' : isProcessing ? 'text-orange-400 animate-pulse font-semibold' : 'text-stone-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${extractedText ? 'bg-emerald-500 text-stone-950 font-bold' : isProcessing ? 'bg-orange-500 text-stone-950' : 'bg-stone-800 text-stone-400'}`}>
                2
              </div>
              <span>STT Extraction</span>
            </div>

            <ArrowRight className="w-3.5 h-3.5 text-stone-600" />

            <div className="flex items-center space-x-1.5 text-stone-400">
              <div className="w-5 h-5 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center text-[10px]">
                3
              </div>
              <span>Translate Text</span>
            </div>
          </div>

          {!selectedFile ? (
            /* Drag & Drop Zone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
                isDragging
                  ? 'border-amber-500 bg-amber-500/10 scale-[0.99]'
                  : 'border-stone-700 hover:border-amber-500/50 hover:bg-stone-800/40 bg-stone-950/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/mp3,audio/wav,audio/m4a,audio/webm,audio/ogg,audio/aac"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <UploadCloud className="w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-semibold text-stone-200">
                  Click to upload or drag & drop an African speech audio file
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Supports MP3, WAV, M4A, WEBM, OGG, AAC (Max: 25MB)
                </p>
              </div>
            </div>
          ) : (
            /* File Loaded View */
            <div className="space-y-4">
              <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between">
                <div className="flex items-center space-x-3 truncate">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
                    <Music className="w-5 h-5" />
                  </div>
                  <div className="truncate text-left">
                    <p className="text-sm font-semibold text-stone-100 truncate">{selectedFile.name}</p>
                    <p className="text-xs text-stone-400">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'audio file'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {audioUrl && (
                    <>
                      <audio
                        ref={audioPreviewRef}
                        src={audioUrl}
                        onEnded={() => setIsPlayingPreview(false)}
                        className="hidden"
                      />
                      <button
                        onClick={toggleAudioPlayback}
                        className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200"
                        title={isPlayingPreview ? 'Pause Audio' : 'Play Audio Preview'}
                      >
                        {isPlayingPreview ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-amber-400" />}
                      </button>
                    </>
                  )}

                  <button
                    onClick={resetUpload}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100"
                    title="Change Audio File"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress / Step State */}
              {isProcessing && (
                <div className="p-4 bg-amber-950/30 border border-amber-800/60 rounded-2xl text-center space-y-2">
                  <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-semibold text-amber-300">
                    Processing audio stream and recognizing spoken words...
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Routing to Speech-to-Text Engine with {sourceLang.name} language model
                  </p>
                </div>
              )}

              {/* Extracted Speech and Translation Boxes */}
              {extractedText && (
                <div className="space-y-3 animate-fadeIn">
                  {/* Extracted Source Speech */}
                  <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-left space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verbatim {sourceLang.name} Speech (Step 2)</span>
                      </span>
                      <span className="text-stone-500 font-mono text-[11px]">Acoustically Verified</span>
                    </div>
                    <p className="text-sm font-medium text-stone-100 leading-relaxed bg-stone-900 p-3 rounded-xl border border-stone-800/80">
                      "{extractedText}"
                    </p>
                  </div>

                  {/* Direct Audio Translation (if available) */}
                  {translatedAudioText && (
                    <div className="p-4 bg-amber-950/20 rounded-2xl border border-amber-800/50 text-left space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Direct Translation to {targetLang.name} (Step 3)</span>
                        </span>
                        <span className="text-amber-500/80 font-mono text-[11px]">Tone-Accurate</span>
                      </div>
                      <p className="text-sm font-semibold text-amber-100 leading-relaxed bg-stone-900/90 p-3 rounded-xl border border-amber-500/20">
                        {translatedAudioText}
                      </p>

                      {phoneticSpelling && (
                        <div className="text-xs text-stone-400 flex items-center space-x-1.5 pt-1">
                          <span className="text-amber-400 font-medium">Pronunciation:</span>
                          <span className="font-mono text-stone-300">/{phoneticSpelling}/</span>
                        </div>
                      )}

                      {linguisticNotes && (
                        <p className="text-[11px] text-stone-400 italic">
                          {linguisticNotes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-start space-x-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <button
            onClick={() => {
              resetUpload();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-stone-100 hover:bg-stone-800"
          >
            Cancel
          </button>

          <button
            onClick={handleUseExtractedText}
            disabled={!extractedText || isProcessing}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 shadow-md flex items-center space-x-1.5"
          >
            <span>Proceed to Translate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
