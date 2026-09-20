import { ISpeechAdapter } from './ISpeechAdapter';
import { SpeechToTextRequest, SpeechToTextResponse } from '../../types';
import { getLanguageByCode } from '../../config/languages';

export class MockSpeechAdapter implements ISpeechAdapter {
  id = 'mock-stt';
  name = 'Deterministic Development Speech Mock';

  isAvailable(): boolean {
    return true;
  }

  async transcribe(request: SpeechToTextRequest): Promise<SpeechToTextResponse> {
    const lang = request.languageHint ? getLanguageByCode(request.languageHint) : null;
    const sampleText = lang ? lang.sampleGreeting.native : 'Ẹ kú àárọ̀ o, ṣé ẹ jí daadaa?';

    return {
      recognizedText: sampleText,
      detectedLanguage: request.languageHint || 'yo',
      confidence: 0.95,
      success: true,
      durationSeconds: 3.2,
      engine: 'mock-stt',
    };
  }
}
