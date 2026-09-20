import { useState, useRef, useCallback } from 'react';
import { audioService } from '../services/audio/AudioService';
import { speechToTextService } from '../services/speech/SpeechToTextService';

export interface UseSpeechRecognitionOptions {
  languageHint: string;
  onTextRecognized: (text: string) => void;
}

export function useSpeechRecognition({ languageHint, onTextRecognized }: UseSpeechRecognitionOptions) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startRecording = useCallback(async () => {
    setError(null);
    setRecognizedText('');
    setRecordingSeconds(0);

    try {
      await audioService.startRecording();
      setIsRecording(true);

      // Start elapsed timer
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Setup live visualizer simulation
      const updateLevel = () => {
        setAudioLevel(Math.floor(Math.random() * 65) + 25);
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    } catch (err: any) {
      console.error('Failed to start microphone recording:', err);
      setError(err.message || 'Microphone access was denied or is unavailable.');
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (!isRecording) return;

    if (timerRef.current) clearInterval(timerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setAudioLevel(0);
    setIsRecording(false);
    setIsProcessing(true);
    setError(null);

    try {
      const { blob, mimeType } = await audioService.stopRecording();
      const base64 = await audioService.fileToBase64(blob);

      // Pipeline: Audio recording -> Speech recognition -> Text
      const sttResponse = await speechToTextService.recognizeSpeech({
        audioBlob: blob,
        audioBase64: base64,
        mimeType,
        languageHint,
      });

      if (sttResponse.success && sttResponse.recognizedText) {
        setRecognizedText(sttResponse.recognizedText);
        onTextRecognized(sttResponse.recognizedText);
      } else {
        setError(sttResponse.error || 'Speech could not be recognized. Please try speaking clearly or type your message.');
      }
    } catch (err: any) {
      setError(err.message || 'Audio could not be processed.');
    } finally {
      setIsProcessing(false);
    }
  }, [isRecording, languageHint, onTextRecognized]);

  const cancelRecording = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setAudioLevel(0);
    setIsRecording(false);
    setIsProcessing(false);
    audioService.stopRecording().catch(() => {});
  }, []);

  return {
    isRecording,
    isProcessing,
    recognizedText,
    error,
    audioLevel,
    recordingSeconds,
    startRecording,
    stopRecording,
    cancelRecording,
  };
}
