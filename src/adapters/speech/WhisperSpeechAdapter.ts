import { ISpeechAdapter } from './ISpeechAdapter';
import { SpeechToTextRequest, SpeechToTextResponse } from '../../types';

export class WhisperSpeechAdapter implements ISpeechAdapter {
  id = 'gemini-whisper';
  name = 'AI Speech-to-Text & Audio Transcription';

  isAvailable(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  async transcribe(request: SpeechToTextRequest): Promise<SpeechToTextResponse> {
    try {
      let base64Audio = request.audioBase64;

      if (!base64Audio && request.audioBlob) {
        base64Audio = await this.blobToBase64(request.audioBlob);
      }

      if (!base64Audio) {
        return {
          recognizedText: '',
          confidence: 0,
          success: false,
          error: 'No audio data was provided for speech recognition.',
          engine: 'gemini-whisper',
        };
      }

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: base64Audio,
          mimeType: request.mimeType || 'audio/webm',
          languageHint: request.languageHint,
        }),
      });

      if (!response.ok) {
        throw new Error(`Speech API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        recognizedText: data.recognizedText || '',
        detectedLanguage: data.detectedLanguage || request.languageHint,
        confidence: data.confidence ?? 0.94,
        success: Boolean(data.success),
        error: data.error,
        durationSeconds: data.durationSeconds,
        engine: 'gemini-whisper',
      };
    } catch (err: any) {
      console.warn('AI speech transcription error:', err);
      return {
        recognizedText: '',
        confidence: 0,
        success: false,
        error: 'Audio could not be processed. Speech could not be recognized.',
        engine: 'gemini-whisper',
      };
    }
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // Strip data URL prefix if present (e.g. data:audio/webm;base64,...)
        const rawBase64 = base64data.includes(',') ? base64data.split(',')[1] : base64data;
        resolve(rawBase64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
