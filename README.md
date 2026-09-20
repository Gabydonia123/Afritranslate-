# Indigenous Language Translator PWA

An enterprise-grade, modular Progressive Web Application (PWA) designed for bidirectional text, voice, and audio translation across African indigenous languages, with specialized neural and rule routing for low-resource Nigerian languages.

---

## Key Highlights

- **23 African & Global Languages Supported**:
  - **11 Nigerian Indigenous Languages**: Hausa, Yorùbá, Igbo, Urhobo, Isoko, Igala, Nupe, Kanuri, Ebira, Idoma, Ijaw.
  - **9 Wider African Languages**: Swahili, Zulu, Xhosa, Amharic, Somali, Afrikaans, Lingala, Wolof, Kinyarwanda.
  - **International**: English, French, Arabic.
- **Strict 3-Stage Multimodal Processing Pipeline**:
  - `Voice / Audio Recording` → `Speech-to-Text (STT) Extraction` → `Extracted Text` → `Translation Router` → `Translated Text`.
  - Speech recognition and translation are strictly decoupled: audio is never directly translated as uninspected binary bytes.
- **Low-Resource Language Protection**:
  - Languages lacking high-resource NMT representations (such as Urhobo, Isoko, Nupe, Igala) are dynamically routed to specialized **Gemini Indigenous AI Adapters** or **Custom Morphological Rule Adapters**.
- **Tone & Diacritic Typing Support**:
  - Integrated virtual diacritics keyboard for African orthographies (sub-dots: *ẹ, ọ, ṣ, ị, ụ, ṅ*; implosives/ejectives: *ɓ, ɗ, ƙ, ƴ, ǝ*; tone marks: *á, à, ā, é, è, ẹ́, ẹ̀, ọ́, ọ̀*).
- **Progressive Web App (PWA)**:
  - Installable on mobile and desktop devices with full `manifest.json` and service worker caching for offline shell and lexicon accessibility.
- **Decoupled Adapter Architecture**:
  - Built upon strict TypeScript interfaces (`ITranslationAdapter`, `ISpeechAdapter`) allowing new AI, NLLB, or on-device models to plug in without modifying UI components.
- **Zero API Key Client Exposure**:
  - All AI model calls execute securely via serverless backend endpoints (`/api/translate`, `/api/transcribe`), protecting secrets from browser DevTools.

---

## Architectural Overview

```
[ Frontend Client (React 19 + Tailwind CSS) ]
       │
       ├──> TranslationWorkspace & Diacritics Keyboard
       ├──> VoiceInputModal (Microphone Audio Capture)
       └──> AudioUploadPanel (MP3/WAV/M4A/WEBM/OGG Parser)
                 │
                 ▼
     [ Core Service Coordinators ]
       ├──> TranslationService (Singleton Coordinator)
       │         │
       │         ├──> AITranslationAdapter (Gemini 3.7 Serverless Bridge)
       │         ├──> NLLBTranslationAdapter (Meta NLLB Neural Adapter)
       │         ├──> CustomLanguageAdapter (ATR Harmony & Morphological Lexicon)
       │         └──> MockTranslationAdapter (Offline Heuristic Fallback)
       │
       └──> SpeechToTextService (Singleton Coordinator)
                 │
                 ├──> WhisperSpeechAdapter (Multimodal Audio AI)
                 ├──> BrowserSpeechAdapter (Web Speech API)
                 └──> MockSpeechAdapter (Offline Phonetic Estimator)
                 │
                 ▼
[ Secure Serverless API Gateway (Express / Node.js) ]
       ├──> POST /api/translate (Server-side Gemini AI)
       └──> POST /api/transcribe (Server-side Audio Transcription)
```

---

## Supported Languages Directory

| Code | Language | Native Name | Region | Classification | Low-Resource |
|---|---|---|---|---|---|
| `ha` | **Hausa** | Harshen Hausa | Nigeria / West Africa | Afroasiatic (Chadic) | No |
| `yo` | **Yorùbá** | Èdè Yorùbá | Nigeria / Benin | Niger-Congo (Defoid) | No |
| `ig` | **Igbo** | Asụsụ Igbo | Nigeria | Niger-Congo (Igboid) | No |
| `urh` | **Urhobo** | Urhobo | Nigeria (Delta State) | Niger-Congo (Edoid) | **Yes** |
| `iso` | **Isoko** | Isoko | Nigeria (Delta State) | Niger-Congo (Edoid) | **Yes** |
| `igl` | **Igala** | Igala | Nigeria (Kogi State) | Niger-Congo (Yoruboid) | **Yes** |
| `nup` | **Nupe** | Nufawa / Nupe | Nigeria (Niger State) | Niger-Congo (Nupoid) | **Yes** |
| `kn` | **Kanuri** | Kanuri | Nigeria (Borno / Lake Chad) | Nilo-Saharan (Saharan) | **Yes** |
| `ebi` | **Ebira** | Ebira | Nigeria (Kogi State) | Niger-Congo (Nupoid) | **Yes** |
| `idm` | **Idoma** | Idoma | Nigeria (Benue State) | Niger-Congo (Idomoid) | **Yes** |
| `ijw` | **Ijaw** | Izon | Nigeria (Bayelsa / Rivers) | Niger-Congo (Ijoid) | **Yes** |
| `sw` | **Swahili** | Kiswahili | East Africa | Niger-Congo (Bantu) | No |
| `zu` | **Zulu** | isiZulu | Southern Africa | Niger-Congo (Bantu) | No |
| `xh` | **Xhosa** | isiXhosa | Southern Africa | Niger-Congo (Bantu) | No |
| `am` | **Amharic** | አማርኛ | Horn of Africa | Afroasiatic (Semitic) | No |
| `so` | **Somali** | Af-Soomaali | Horn of Africa | Afroasiatic (Cushitic) | No |
| `af` | **Afrikaans** | Afrikaans | Southern Africa | Indo-European (Germanic) | No |
| `ln` | **Lingala** | Lingála | Central Africa | Niger-Congo (Bantu) | No |
| `wo` | **Wolof** | Wolof | West Africa | Niger-Congo (Senegambian) | No |
| `rw` | **Kinyarwanda** | Ikinyarwanda | East Africa | Niger-Congo (Bantu) | No |
| `en` | **English** | English | International | Indo-European | No |
| `fr` | **French** | Français | International | Indo-European | No |
| `ar` | **Arabic** | العربية | North Africa / Int. | Afroasiatic (Semitic) | No |

---

## Local Development & Setup

### 1. Prerequisites
- Node.js 20+
- npm or yarn

### 2. Environment Configuration
Create a `.env` file at the root based on `.env.example`:

```env
# GEMINI_API_KEY: Required for Gemini AI API calls (Server-Side)
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000` with Express backend API routes and Vite frontend serving.

---

## Production Build & Netlify Deployment Instructions

### Option A: Build and Run Standalone Container / Cloud Run
```bash
npm run build
npm start
```

### Option B: Deploying to Netlify
1. Connect your repository to **Netlify**.
2. Set the build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Configure Environment Variables in the Netlify Dashboard:
   - `GEMINI_API_KEY`: Your Google Gen AI API key.
4. Netlify will serve the client-side SPA with offline PWA caching while edge functions or serverless endpoints proxy AI translation routes.

---

## Offline PWA Capabilities

When network connectivity is disrupted or in low-bandwidth regions:
1. **Service Worker (`/sw.js`)** serves cached application assets instantly.
2. **Offline Rule Lexicon (`CustomLanguageAdapter`)** translates standard conversational phrases, greetings, directions, and market transactions.
3. **Translation History** persists across sessions via client-side storage with JSON export capabilities.

---

## License

Apache-2.0 License. Built for African language preservation and open linguistic empowerment.
