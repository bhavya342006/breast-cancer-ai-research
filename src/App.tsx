import React, { useState } from 'react';
import { PageId, AssessmentInput, PredictionResult } from './types';
import { DEFAULT_ASSESSMENT_INPUT, calculateResearchRisk } from './data/researchBenchmark';
import { predictRisk } from './services/api';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { MetricExplanationModal } from './components/common/MetricExplanationModal';

import { HomeView } from './components/home/HomeView';
import { RiskAssessmentWizard } from './components/assessment/RiskAssessmentWizard';
import { PredictionResultView } from './components/results/PredictionResultView';
import { ResearchExperimentsView } from './components/experiments/ResearchExperimentsView';
import { MissingInfoExperimentView } from './components/experiments/MissingInfoExperimentView';
import { ModelComparisonView } from './components/experiments/ModelComparisonView';
import { CalibrationView } from './components/experiments/CalibrationView';
import { FalseNegativesView } from './components/experiments/FalseNegativesView';
import { ExplainabilityView } from './components/explainability/ExplainabilityView';
import { MethodologyView } from './components/research/MethodologyView';
import { ArchitectureView } from './components/research/ArchitectureView';
import { ResearchFindingsView } from './components/research/ResearchFindingsView';
import { AboutView } from './components/about/AboutView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  // Form assessment input state
  const [assessmentInput, setAssessmentInput] = useState<AssessmentInput>(DEFAULT_ASSESSMENT_INPUT);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  // Computed prediction result (initialize with a pre-computed demo result so Results tab can be inspected immediately)
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(() => {
    return calculateResearchRisk(DEFAULT_ASSESSMENT_INPUT);
  });

  // Handle Assessment submission
  const handleRunAssessment = async (input: AssessmentInput) => {
    setIsPredicting(true);
    try {
      setAssessmentInput(input);
      const res = await predictRisk(input);
      setPredictionResult(res);
      setCurrentPage('results');
    } catch (err) {
      console.error('Failed to run research risk prediction, using fallback calculation:', err);
      const fallback = calculateResearchRisk(input);
      setPredictionResult(fallback);
      setCurrentPage('results');
    } finally {
      setIsPredicting(false);
    }
  };

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col font-sans selection:bg-[#3B82F6]/30 selection:text-[#60A5FA]">
      {/* Top Universal Non-Diagnostic Banner */}
      <DisclaimerBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={navigateTo}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Body Content Column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header */}
          <Header
            currentPage={currentPage}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />

          {/* Active View Container */}
          <main id="main-view-container" className="flex-1 p-4 md:p-6 lg:p-8">
            {currentPage === 'home' && (
              <HomeView onNavigate={navigateTo} />
            )}

            {currentPage === 'assessment' && (
              <RiskAssessmentWizard
                initialInput={assessmentInput}
                onSubmit={handleRunAssessment}
                isSubmitting={isPredicting}
              />
            )}

            {currentPage === 'results' && (
              <PredictionResultView
                result={predictionResult}
                onNewAssessment={() => navigateTo('assessment')}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'experiments' && (
              <ResearchExperimentsView onNavigate={navigateTo} />
            )}

            {currentPage === 'missing-info' && (
              <MissingInfoExperimentView onNavigate={navigateTo} />
            )}

            {currentPage === 'model-comparison' && (
              <ModelComparisonView
                onNavigate={navigateTo}
                onOpenGlossary={() => setIsGlossaryOpen(true)}
              />
            )}

            {currentPage === 'calibration' && (
              <CalibrationView
                onNavigate={navigateTo}
                onOpenGlossary={() => setIsGlossaryOpen(true)}
              />
            )}

            {currentPage === 'false-negatives' && (
              <FalseNegativesView
                onNavigate={navigateTo}
                onOpenGlossary={() => setIsGlossaryOpen(true)}
              />
            )}

            {currentPage === 'explainability' && (
              <ExplainabilityView
                onNavigate={navigateTo}
                onOpenGlossary={() => setIsGlossaryOpen(true)}
              />
            )}

            {currentPage === 'methodology' && (
              <MethodologyView onNavigate={navigateTo} />
            )}

            {currentPage === 'architecture' && (
              <ArchitectureView onNavigate={navigateTo} />
            )}

            {currentPage === 'findings' && (
              <ResearchFindingsView onNavigate={navigateTo} />
            )}

            {currentPage === 'about' && (
              <AboutView onNavigate={navigateTo} />
            )}
          </main>

          {/* Global Research Footer */}
          <footer className="h-12 bg-[#0D0D0D] border-t border-[#262626] flex items-center px-4 md:px-8 text-[10px] text-[#737373] justify-between shrink-0 select-none">
            <div className="truncate">
              Evaluating the Reliability of Multimodal AI for Breast Cancer Risk Stratification
            </div>
            <div className="hidden md:flex items-center gap-6 font-mono text-[#737373] shrink-0">
              <span>Dataset: RSNA-2023-Anonymized</span>
              <span className="text-[#262626]">•</span>
              <span>Architecture: Multi-Task Fusion Transformer</span>
              <span className="text-[#262626]">•</span>
              <span className="text-amber-500/80">Non-Diagnostic Prototype</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Metric Explanation Modal */}
      <MetricExplanationModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}

