import { SpeechToTextRequest, SpeechToTextResponse } from '../../types';

/**
 * Standard Provider/Adapter interface for speech recognition and transcription engines.
 * Strictly separates audio-to-text extraction from downstream translation tasks.
 */
export interface SpeechProvider {
  readonly id: string;
  readonly name: string;
  isAvailable(): Promise<boolean> | boolean;
  transcribe(request: SpeechToTextRequest): Promise<SpeechToTextResponse>;
}

/**
 * Alias for backward compatibility
 */
export type ISpeechAdapter = SpeechProvider;
