import { SpeechProvider } from '../../adapters/speech/ISpeechAdapter';
import { BrowserSpeechAdapter } from '../../adapters/speech/BrowserSpeechAdapter';
import { WhisperSpeechAdapter } from '../../adapters/speech/WhisperSpeechAdapter';
import { MockSpeechAdapter } from '../../adapters/speech/MockSpeechAdapter';
import { SpeechToTextRequest, SpeechToTextResponse } from '../../types';

/**
 * Application Layer Service for Speech Recognition.
 * Isolates audio ingestion and transcription into clean text, ensuring speech recognition
 * is never entangled with translation pipeline execution.
 */
export class SpeechToTextService {
  private providers: Map<string, SpeechProvider> = new Map();

  constructor() {
    this.registerProvider(new WhisperSpeechAdapter());
    this.registerProvider(new BrowserSpeechAdapter());
    this.registerProvider(new MockSpeechAdapter());
  }

  public registerProvider(provider: SpeechProvider): void {
    this.providers.set(provider.id, provider);
  }

  public registerAdapter(adapter: SpeechProvider): void {
    this.registerProvider(adapter);
  }

  /**
   * Transcribes speech from audio stream or file into text.
   * Emits recognized text cleanly to the caller without executing downstream translations.
   */
  public async recognizeSpeech(
    request: SpeechToTextRequest,
    preferredEngine?: 'browser-web-speech' | 'gemini-whisper' | 'mock-stt'
  ): Promise<SpeechToTextResponse> {
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    // 1. Explicit user engine selection
    if (preferredEngine && this.providers.has(preferredEngine)) {
      const provider = this.providers.get(preferredEngine)!;
      if (await provider.isAvailable()) {
        const res = await provider.transcribe(request);
        if (res.success && res.recognizedText) return res;
      }
    }

    // 2. Multimodal AI transcription for African indigenous audio accents
    const whisperProvider = this.providers.get('gemini-whisper');
    if (whisperProvider && isOnline && (request.audioBlob || request.audioBase64)) {
      const result = await whisperProvider.transcribe(request);
      if (result.success && result.recognizedText) {
        return result;
      }
    }

    // 3. Client-side Browser Speech API fallback
    const browserProvider = this.providers.get('browser-web-speech');
    if (browserProvider && (await browserProvider.isAvailable())) {
      const result = await browserProvider.transcribe(request);
      if (result.success && result.recognizedText) {
        return result;
      }
    }

    // 4. Offline synthetic fallback
    const mockProvider = this.providers.get('mock-stt');
    if (mockProvider) {
      return mockProvider.transcribe(request);
    }

    return {
      recognizedText: '',
      confidence: 0,
      success: false,
      error: 'Speech could not be recognized. Please check microphone access or upload a clear audio file.',
      engine: 'gemini-whisper',
    };
  }
}

export const speechToTextService = new SpeechToTextService();
