export interface AudioValidationResult {
  valid: boolean;
  error?: string;
  mimeType: string;
  sizeBytes: number;
  fileName: string;
}

export class AudioService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  public static readonly ALLOWED_MIME_TYPES = [
    'audio/mp3',
    'audio/mpeg',
    'audio/wav',
    'audio/x-wav',
    'audio/m4a',
    'audio/x-m4a',
    'audio/mp4',
    'audio/webm',
    'audio/ogg',
    'audio/aac',
  ];

  public static readonly MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB

  /**
   * Validates an uploaded audio file
   */
  public validateAudioFile(file: File): AudioValidationResult {
    if (!file) {
      return {
        valid: false,
        error: 'No file provided.',
        mimeType: '',
        sizeBytes: 0,
        fileName: '',
      };
    }

    if (file.size > AudioService.MAX_FILE_SIZE_BYTES) {
      return {
        valid: false,
        error: `Audio file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is 25MB.`,
        mimeType: file.type,
        sizeBytes: file.size,
        fileName: file.name,
      };
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const validExtensions = ['mp3', 'wav', 'm4a', 'webm', 'ogg', 'aac', 'mp4'];

    const hasValidMime = AudioService.ALLOWED_MIME_TYPES.includes(file.type);
    const hasValidExt = validExtensions.includes(ext);

    if (!hasValidMime && !hasValidExt) {
      return {
        valid: false,
        error: `Unsupported audio format (.${ext}). Supported formats: MP3, WAV, M4A, WEBM, OGG, AAC.`,
        mimeType: file.type,
        sizeBytes: file.size,
        fileName: file.name,
      };
    }

    return {
      valid: true,
      mimeType: file.type || `audio/${ext}`,
      sizeBytes: file.size,
      fileName: file.name,
    };
  }

  /**
   * Start live microphone recording
   */
  public async startRecording(onDataAvailable?: (blob: Blob) => void): Promise<void> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Microphone access is not supported on this browser.');
    }

    this.audioChunks = [];
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Determine supported mime type
    let mimeType = 'audio/webm';
    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
      mimeType = 'audio/webm;codecs=opus';
    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
      mimeType = 'audio/mp4';
    } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
      mimeType = 'audio/ogg';
    }

    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.audioChunks.push(event.data);
        if (onDataAvailable) {
          onDataAvailable(event.data);
        }
      }
    };

    this.mediaRecorder.start(100); // 100ms chunks
  }

  /**
   * Stop recording and return complete Audio Blob
   */
  public async stopRecording(): Promise<{ blob: Blob; mimeType: string }> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No active recording.'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
        const audioBlob = new Blob(this.audioChunks, { type: mimeType });

        // Stop all audio tracks
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
          this.stream = null;
        }

        resolve({ blob: audioBlob, mimeType });
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Convert file or blob to base64
   */
  public async fileToBase64(file: Blob | File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.includes(',') ? result.split(',')[1] : result;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Synthesize audio / Pronunciation using Web Speech API or server TTS
   */
  public async speakText(text: string, langCode: string): Promise<boolean> {
    if (!text) return false;

    // 1. Try server-side Gemini TTS if online
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, langCode }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.audioBase64) {
            const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
            await audio.play();
            return true;
          }
        }
      } catch (err) {
        console.warn('Server TTS failed, falling back to Web Speech Synthesis:', err);
      }
    }

    // 2. Fallback to Web Speech Synthesis API
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.lang = langCode === 'yo' || langCode === 'ig' || langCode === 'ha' ? 'en-NG' : (langCode || 'en');

      // Check for available voices
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find((v) => v.lang.startsWith(langCode));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      window.speechSynthesis.speak(utterance);
      return true;
    }

    return false;
  }
}

export const audioService = new AudioService();
