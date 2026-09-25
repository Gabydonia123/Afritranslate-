# English Visibility & Recommended Google Translation Architecture

Enhance language discovery by alphabetizing English alongside all indigenous and international languages in source and target selectors, while establishing Google Translate as the auto-selected primary translation engine with a prominent "Recommended" status badge and seamless multi-tier fallback to Gemini AI and verified indigenous lexicons.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during clarification and have been built into this plan:

- **Confirmed Decision 1 (Language Positioning)**: English is alphabetized alongside all other languages in both the source and target selectors (A–Z ordering by language name), ensuring English appears naturally under 'E' between Ebira/Edo/Efik and Fulfulde/Hausa.
- **Confirmed Decision 2 (Recommended Translator Badge)**: Google Translate is auto-selected by default as the primary translation engine, distinguished with a clear "Recommended" badge in the workspace selector and multi-source comparison panel.
- **Confirmed Decision 3 (Dialect Fallback Handling)**: When translating low-resource indigenous dialects or languages without direct Google Translate coverage (such as Urhobo, Isoko, Igala, Nupe, Ebira, Idoma, Ijaw, etc.), the translation engine automatically cascades to Gemini AI and verified indigenous lexicons without user disruption, providing an informative linguistic notice.

---

### 1. Overview & Core Concept

- **What It Does**:
  - Provides frictionless bilingual and cross-lingual translation between English, national African lingua francas, and low-resource indigenous languages.
  - Fixes language visibility so English is immediately found in both Source ("From") and Target ("To") language selectors, alphabetically ordered and directly searchable.
  - Automatically routes translation requests through Google Translate for supported languages (English, Yoruba, Hausa, Igbo, Swahili, Zulu, Xhosa, Amharic, Somali, Afrikaans, Lingala, Wolof, Kinyarwanda, Oromo, Tigrinya, Bambara, Luganda, Akan/Twi, French, and Arabic).
  - Intelligently detects dialect limitations in Google Translate and automatically falls back to specialized Gemini AI computational linguistics and indigenous rule glossaries for Niger Delta and other regional dialects.
- **Target Audience / Persona**:
  - Native speakers, linguists, diaspora community members, students, and cultural researchers translating between English and African indigenous languages.
- **Key Value**:
  - Fast, reliable neural translations for mainstream pairs with Google Translate, combined with AI-powered preservation of tonal diacritics and cultural nuances for underrepresented dialects.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Language Selection**:
     - User clicks the "From" or "To" language selector button in the translation workspace.
     - The modal opens displaying all supported languages sorted strictly A–Z (`Afrikaans`, `Akan`, `Amharic`, `Annang`, `Arabic`, `Bambara`, `Berom`, `Ebira`, `Edo`, `Efik`, **`English`**, `Fulfulde`, `Hausa`, `Ibibio`, `Idoma`, `Igala`, `Igbo`, `Ijaw`, `Isoko`, `Itsekiri`, `Kanuri`, `Kinyarwanda`, `Lingala`, `Luganda`, `Nigerian Pidgin`, `Nupe`, `Oromo`, `Shona`, `Somali`, `Swahili`, `Tigrinya`, `Tiv`, `Urhobo`, `Wolof`, `Xhosa`, `Yorùbá`, `Zulu`).
     - English is prominent, easily filtered, and quickly selectable. Region tabs continue to allow localized grouping while maintaining alphabetical consistency.
  2. **Recommended Engine Indicator**:
     - At the top of the translation workspace and within the engine selector, an engine badge clearly highlights **Google Translate** with a `★ Recommended` tag.
     - Users can immediately see which engine is active and compare secondary sources (Gemini AI, Indigenous Lexicon) via one-click multi-source comparison tabs.
  3. **Dialect Graceful Fallback**:
     - If the user selects a dialect without native Google Translate coverage (e.g. English $\rightarrow$ Urhobo or Isoko $\rightarrow$ English), the system automatically routes to Gemini AI with verified lexical tone markings.
     - A clean informative toast/pill informs the user: *"Google Translate lacks native coverage for [Language]; automatically translated using Gemini AI & Indigenous Lexicon."*

- **Visual Identity & Theme**:
  - **Aesthetic Direction**: High-density linguistic workstation adhering to dark stone styling (`bg-stone-950`, `bg-stone-900`) with warm amber accents (`text-amber-400`, `border-amber-500/40`).
  - **Engine Badges**:
    - Google Translate: Slate/amber container with `★ Recommended` micro-badge.
    - Gemini AI: Violet/indigo accent for advanced tonal reasoning.
    - Indigenous Lexicon: Emerald/amber accent for dictionary rule verification.
  - **Zero-Pill Restraint**: Language metadata (speakers, language family, region) rendered as clean unboxed typographic metadata with subtle interpuncts (`·`).

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Alphabetical Sorting Across All Modals and Registries**:
  - *Chosen Approach*: Sort all language lists alphabetically by localized display name (`a.name.localeCompare(b.name)`), while keeping search and region filters intact.
  - *Why*: Eliminates user confusion where English was previously appended at the bottom of a 38-language registry or excluded under regional filters.
  - *Alternatives Considered*: Pinning English at the top vs. alphabetizing. The user explicitly chose alphabetizing alongside all other languages for egalitarian, natural discovery.

- **Decision 2: Expanded Google Translate Language Matrix**:
  - *Chosen Approach*: Expand the server-side `GOOGLE_LANG_MAP` to include newly supported African languages (`om`, `ti`, `lg`, `bm`, `ak`, `sn`) alongside existing major languages (`yo`, `ha`, `ig`, `sw`, `zu`, `xh`, `am`, `so`, `af`, `ln`, `wo`, `rw`, `en`, `fr`, `ar`).
  - *Why*: Maximizes Google Translate coverage across the continent, reducing latency and utilizing Google's neural translation infrastructure.

- **Decision 3: Multi-Tier Transparent Fallback Pipeline**:
  - *Chosen Approach*: Tier 1 = Google Translate (Recommended) $\rightarrow$ Tier 2 = Gemini AI Model $\rightarrow$ Tier 3 = Custom African Lexicon & Glossary.
  - *Why*: Ensures that even low-resource languages without Google Translate support return accurate, tone-preserving translations rather than empty errors.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Translation Workspace UI                        │
│                                                                        │
│  ┌─────────────────────────┐             ┌──────────────────────────┐  │
│  │ Source Language Button  │             │  Target Language Button  │  │
│  │ (Alphabetized List A-Z) │             │ (Alphabetized List A-Z)  │  │
│  └───────────┬─────────────┘             └────────────┬─────────────┘  │
│              │                                        │                │
│              ▼                                        ▼                │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Engine Selector: [★ Google Translate (Recommended)] [Gemini AI] │  │
│  └─────────────────────────────────┬────────────────────────────────┘  │
└────────────────────────────────────┼───────────────────────────────────┘
                                     │
                                     ▼ POST /api/translate
┌────────────────────────────────────────────────────────────────────────┐
│                     Express API Pipeline (server.ts)                   │
│                                                                        │
│                       Can Google Translate Handle?                     │
│                             /              \                           │
│                           YES               NO                         │
│                           /                  \                         │
│                          ▼                    ▼                        │
│             ┌───────────────────────┐   ┌───────────────────────────┐  │
│             │ Google Translate API  │   │  Gemini AI Model Fallback │  │
│             │ (Primary Recommended) │   │  (Tones & Diacritics)     │  │
│             └───────────┬───────────┘   └─────────────┬─────────────┘  │
│                         │                             │                │
│                         ▼                             ▼                │
│             ┌───────────────────────────────────────────────────────┐  │
│             │ Multi-Source Result Aggregator & Fallback Validator   │  │
│             │ (Includes: Google, Gemini AI, African Lexicon)        │  │
│             └───────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

- **Interactive Component & State Mapping**:
  1. `LanguageSelectorModal.tsx`:
     - Sorts languages using `filteredLanguages.sort((a, b) => a.name.localeCompare(b.name))`.
     - Ensures English ('en') is included under 'All' and categorized properly under 'International', with quick search indexing.
  2. `TranslationWorkspace.tsx`:
     - Renders an engine indicator showing Google Translate as active and marked with a `Recommended` badge.
     - Displays source tabs with `Google Translate (Recommended)` as Option 1, and AI / Lexicon comparisons.
  3. `server.ts` & `GoogleTranslationAdapter.ts`:
     - Routes all eligible language translations through Google Translate first.
     - Automatically cascades to Gemini AI and indigenous lexicons when Google lacks coverage for regional dialects.
