/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TranslationWorkspace } from './components/TranslationWorkspace';
import { SupportedLanguagesSection } from './components/SupportedLanguagesSection';
import { PhrasebookModal } from './components/PhrasebookModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { Footer } from './components/Footer';
import { HistoryItem } from './types';

function MainTranslatorPortal() {
  const { isAuthenticated, isLoading } = useAuth();

  // Global modal state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPhrasebookOpen, setIsPhrasebookOpen] = useState(false);

  // Active workspace state injection
  const [workspaceSourceLang, setWorkspaceSourceLang] = useState<string | undefined>(undefined);
  const [workspaceTargetLang, setWorkspaceTargetLang] = useState<string | undefined>(undefined);
  const [workspaceText, setWorkspaceText] = useState<string | undefined>(undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-200">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium tracking-wide">Loading African Language Translator...</p>
      </div>
    );
  }

  // Gate website entry with the persistent stored login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleSelectSamplePair = (source: string, target: string, text: string) => {
    setWorkspaceSourceLang(source);
    setWorkspaceTargetLang(target);
    setWorkspaceText(text);

    // Scroll smoothly to workspace
    const workspaceElement = document.getElementById('translation-workspace');
    if (workspaceElement) {
      workspaceElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectLanguageForTranslate = (langCode: string) => {
    if (langCode === 'en') {
      setWorkspaceSourceLang('en');
      setWorkspaceTargetLang('yo');
    } else {
      setWorkspaceSourceLang('en');
      setWorkspaceTargetLang(langCode);
    }

    const workspaceElement = document.getElementById('translation-workspace');
    if (workspaceElement) {
      workspaceElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setWorkspaceSourceLang(item.sourceLang);
    setWorkspaceTargetLang(item.targetLang);
    setWorkspaceText(item.sourceText);

    const workspaceElement = document.getElementById('translation-workspace');
    if (workspaceElement) {
      workspaceElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToWorkspace = () => {
    const workspaceElement = document.getElementById('translation-workspace');
    if (workspaceElement) {
      workspaceElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* 1. App Header */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenPhrasebook={() => setIsPhrasebookOpen(true)}
        onOpenArchitecture={() => {}}
        onNavigateToLanguages={() => {
          const el = document.getElementById('supported-languages');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onSelectSamplePair={handleSelectSamplePair}
          onScrollToWorkspace={handleScrollToWorkspace}
        />

        {/* Central Translation Workspace (Text, Voice Dictation, Audio File Upload, TTS) */}
        <TranslationWorkspace
          onOpenArchitecture={() => {}}
          externalSourceLang={workspaceSourceLang}
          externalTargetLang={workspaceTargetLang}
          externalText={workspaceText}
        />

        {/* Supported Languages Directory */}
        <SupportedLanguagesSection
          onSelectLanguageForTranslate={handleSelectLanguageForTranslate}
        />
      </main>

      {/* 3. Footer */}
      <Footer
        onOpenPhrasebook={() => setIsPhrasebookOpen(true)}
        onOpenArchitecture={() => {}}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onScrollToTop={handleScrollToTop}
      />

      {/* 4. Modals & Drawers */}
      <PhrasebookModal
        isOpen={isPhrasebookOpen}
        onClose={() => setIsPhrasebookOpen(false)}
        onUsePhrase={handleSelectSamplePair}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectHistoryItem={handleSelectHistoryItem}
      />

      {/* 5. PWA Install Floating Banner */}
      <PwaInstallBanner />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainTranslatorPortal />
    </AuthProvider>
  );
}

