import { ISpeechAdapter } from './ISpeechAdapter';
import { SpeechToTextRequest, SpeechToTextResponse } from '../../types';

export class BrowserSpeechAdapter implements ISpeechAdapter {
  id = 'browser-web-speech';
  name = 'Browser Web Speech API';

  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return Boolean(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    );
  }

  async transcribe(request: SpeechToTextRequest): Promise<SpeechToTextResponse> {
    return new Promise((resolve) => {
      if (!this.isAvailable()) {
        resolve({
          recognizedText: '',
          confidence: 0,
          success: false,
          error: 'Browser speech recognition is not supported on this browser or platform. Using AI speech recognition fallback.',
          engine: 'browser-web-speech',
        });
        return;
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = request.languageHint || 'en-NG'; // Nigerian English or target code

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence || 0.9;
        resolve({
          recognizedText: transcript,
          confidence,
          success: true,
          engine: 'browser-web-speech',
        });
      };

      recognition.onerror = (event: any) => {
        console.warn('Browser speech recognition error:', event.error);
        resolve({
          recognizedText: '',
          confidence: 0,
          success: false,
          error: `Speech could not be recognized (${event.error || 'unknown error'}).`,
          engine: 'browser-web-speech',
        });
      };

      try {
        recognition.start();
      } catch (err) {
        resolve({
          recognizedText: '',
          confidence: 0,
          success: false,
          error: 'Failed to initialize microphone speech session.',
          engine: 'browser-web-speech',
        });
      }
    });
  }
}
