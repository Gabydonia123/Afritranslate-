import { useState, useCallback } from 'react';
import { audioService } from '../services/audio/AudioService';
import { speechToTextService } from '../services/speech/SpeechToTextService';

export interface UseAudioUploadOptions {
  sourceLanguage: string;
  targetLanguage?: string;
  onTextExtracted: (text: string, translatedText?: string) => void;
}

export function useAudioUpload({ sourceLanguage, targetLanguage = 'en', onTextExtracted }: UseAudioUploadOptions) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'validating' | 'transcribing' | 'completed' | 'error'>('idle');
  const [extractedText, setExtractedText] = useState<string>('');
  const [translatedAudioText, setTranslatedAudioText] = useState<string>('');
  const [linguisticNotes, setLinguisticNotes] = useState<string | undefined>(undefined);
  const [phoneticSpelling, setPhoneticSpelling] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const processAudioFile = useCallback(async (file: File) => {
    setError(null);
    setSelectedFile(file);
    setCurrentStep('validating');

    // 1. Validate
    const validation = audioService.validateAudioFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid audio file.');
      setCurrentStep('error');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setAudioUrl(objectUrl);
    setIsProcessing(true);
    setCurrentStep('transcribing');

    try {
      // 2. Audio Processing to Base64
      const base64 = await audioService.fileToBase64(file);

      // Try direct audio translation endpoint first if targetLanguage is different
      if (targetLanguage && targetLanguage !== sourceLanguage) {
        try {
          const directRes = await fetch('/api/translate-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64: base64,
              mimeType: validation.mimeType,
              sourceLanguage,
              targetLanguage,
            }),
          });

          if (directRes.ok) {
            const data = await directRes.json();
            if (data.success && data.recognizedText) {
              setExtractedText(data.recognizedText);
              setTranslatedAudioText(data.translatedText || '');
              setLinguisticNotes(data.linguisticNotes);
              setPhoneticSpelling(data.phoneticSpelling);
              setCurrentStep('completed');
              onTextExtracted(data.recognizedText, data.translatedText);
              return;
            }
          }
        } catch (directErr) {
          console.warn('Direct audio translate fallback to standard transcription:', directErr);
        }
      }

      // 3. Fallback to standard Speech Recognition Engine
      const sttResponse = await speechToTextService.recognizeSpeech({
        audioBlob: file,
        audioBase64: base64,
        mimeType: validation.mimeType,
        languageHint: sourceLanguage,
      });

      if (sttResponse.success && sttResponse.recognizedText) {
        setExtractedText(sttResponse.recognizedText);
        setCurrentStep('completed');
        onTextExtracted(sttResponse.recognizedText);
      } else {
        setError(sttResponse.error || 'Speech could not be recognized from the uploaded audio file.');
        setCurrentStep('error');
      }
    } catch (err: any) {
      setError(err.message || 'Audio could not be processed.');
      setCurrentStep('error');
    } finally {
      setIsProcessing(false);
    }
  }, [sourceLanguage, targetLanguage, onTextExtracted]);

  const resetUpload = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setSelectedFile(null);
    setAudioUrl(null);
    setIsProcessing(false);
    setCurrentStep('idle');
    setExtractedText('');
    setTranslatedAudioText('');
    setLinguisticNotes(undefined);
    setPhoneticSpelling(undefined);
    setError(null);
  }, [audioUrl]);

  return {
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
  };
}

