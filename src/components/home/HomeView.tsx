import React from 'react';
import {
  ArrowRight,
  FlaskConical,
  Info,
  Sliders,
  Database,
  FileCheck2,
  Dna,
  Image as ImageIcon,
  Activity,
  AlertTriangle,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingDown
} from 'lucide-react';
import { PageId } from '../../types';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div id="home-view" className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section
        id="home-hero-section"
        className="relative overflow-hidden rounded-xl bg-[#0D0D0D] border border-[#262626] p-6 md:p-10"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#181818] border border-[#262626] text-xs text-[#A1A1A1] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="font-mono text-[11px] text-[#F5F5F5]">3rd-Year Engineering Research Project</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F5] tracking-tight leading-tight mb-3">
            Breast Cancer AI Research Platform
          </h1>

          <h2 className="text-base sm:text-lg text-[#60A5FA] font-medium mb-4">
            Multimodal AI for Research-Based Risk Stratification
          </h2>

          <p className="text-sm md:text-base text-[#A1A1A1] leading-relaxed mb-6">
            This research prototype investigates whether combining clinical, imaging, and genetic information can improve breast-cancer risk estimation and how model reliability changes when some information is unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="start-assessment-hero-btn"
              onClick={() => onNavigate('assessment')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F5F5F5] font-medium text-xs md:text-sm transition-colors shadow-sm"
            >
              <Sliders className="w-4 h-4" />
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              id="view-research-hero-btn"
              onClick={() => onNavigate('experiments')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-[#181818] hover:bg-[#262626] text-[#F5F5F5] border border-[#262626] font-medium text-xs md:text-sm transition-colors"
            >
              <FlaskConical className="w-4 h-4 text-[#3B82F6]" />
              <span>View Research</span>
            </button>

            <button
              id="about-project-hero-btn"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-transparent hover:bg-[#121212] text-[#A1A1A1] hover:text-[#F5F5F5] border border-[#262626] font-medium text-xs md:text-sm transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About Project</span>
            </button>
          </div>

          {/* Non-Diagnostic Disclaimer Card */}
          <div
            id="home-disclaimer-box"
            className="mt-8 p-4 rounded-lg bg-[#121212] border border-[#262626] flex items-start space-x-3"
          >
            <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-[#F5F5F5] uppercase tracking-wider text-[11px] block mb-0.5">
                Research Prototype — Not a Medical Diagnosis
              </span>
              <p className="text-[#A1A1A1] leading-relaxed text-[11px]">
                This application is intended for academic research and demonstration. Its predictions are not a diagnosis and should not be used to make medical decisions. The system does not replace certified healthcare professionals or diagnostic examinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Research Question Section */}
      <section id="research-question-card" className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626]">
        <div className="max-w-3xl mb-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6] mb-1">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>PRIMARY SCIENTIFIC INQUIRY</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-[#F5F5F5]">
            “How does the availability of different types of patient information affect the reliability of AI-based breast-cancer risk prediction?”
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-6">
          <div className="p-4 rounded-lg bg-[#121212] border border-[#262626]">
            <div className="flex items-center space-x-2 text-[#F5F5F5] font-semibold mb-2">
              <Layers className="w-4 h-4 text-[#3B82F6]" />
              <h4>Multimodal Synergies</h4>
            </div>
            <p className="text-[#A1A1A1] leading-relaxed">
              Evaluating whether combining clinical features with mammogram textures and germline genetic markers improves AUC or whether single modalities suffice.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#121212] border border-[#262626]">
            <div className="flex items-center space-x-2 text-[#F5F5F5] font-semibold mb-2">
              <TrendingDown className="w-4 h-4 text-[#F59E0B]" />
              <h4>Missing-Data Degradation</h4>
            </div>
            <p className="text-[#A1A1A1] leading-relaxed">
              Measuring predictive collapse and confidence shifts when genetic sequencing is unavailable or when radiological screening has not occurred.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#121212] border border-[#262626]">
            <div className="flex items-center space-x-2 text-[#F5F5F5] font-semibold mb-2">
              <Activity className="w-4 h-4 text-[#EF4444]" />
              <h4>Safety & False Negatives</h4>
            </div>
            <p className="text-[#A1A1A1] leading-relaxed">
              Analyzing how many genuine high-risk cases each model architecture misses (false negatives) and testing calibration reliability curves.
            </p>
          </div>
        </div>
      </section>

      {/* The 3 Information Sources */}
      <section id="modalities-overview" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#F5F5F5]">Three Multimodal Information Sources</h3>
            <p className="text-xs text-[#A1A1A1]">
              Researchers can provide whatever information is currently available. The model dynamically adapts.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#737373]">MODALITIES A-C</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Modality 1 */}
          <div className="p-5 rounded-lg bg-[#0D0D0D] border border-[#262626] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-md bg-[#181818] border border-[#262626] flex items-center justify-center text-[#3B82F6] mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">1. Clinical Information</h4>
                <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">Required</span>
              </div>
              <p className="text-xs text-[#A1A1A1] leading-relaxed mb-3">
                Epidemiological markers: patient age, family history, previous biopsy histology, reproductive milestones, and menopausal status.
              </p>
            </div>
            <div className="pt-3 border-t border-[#262626] text-[11px] text-[#737373] font-mono">
              Features: 9 core parameters
            </div>
          </div>

          {/* Modality 2 */}
          <div className="p-5 rounded-lg bg-[#0D0D0D] border border-[#262626] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-md bg-[#181818] border border-[#262626] flex items-center justify-center text-[#3B82F6] mb-3">
                <Dna className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">2. Genetic Information</h4>
                <span className="text-[10px] font-mono text-[#A1A1A1] bg-[#181818] px-2 py-0.5 rounded border border-[#262626]">Optional</span>
              </div>
              <p className="text-xs text-[#A1A1A1] leading-relaxed mb-3">
                Pre-existing NGS multi-gene panels: BRCA1, BRCA2, PALB2, TP53, CHEK2, ATM, PTEN, or PRS percentile. No sample collection performed.
              </p>
            </div>
            <div className="pt-3 border-t border-[#262626] text-[11px] text-[#737373] font-mono">
              Features: 7 genes + polygenic score
            </div>
          </div>

          {/* Modality 3 */}
          <div className="p-5 rounded-lg bg-[#0D0D0D] border border-[#262626] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-md bg-[#181818] border border-[#262626] flex items-center justify-center text-[#3B82F6] mb-3">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">3. Mammogram Imaging</h4>
                <span className="text-[10px] font-mono text-[#A1A1A1] bg-[#181818] px-2 py-0.5 rounded border border-[#262626]">Optional</span>
              </div>
              <p className="text-xs text-[#A1A1A1] leading-relaxed mb-3">
                2D full-field digital mammogram upload (CC / MLO views). Analyzes parenchymal density patterns, asymmetry, and microcalcification features.
              </p>
            </div>
            <div className="pt-3 border-t border-[#262626] text-[11px] text-[#737373] font-mono">
              Vision: DenseNet-121 / ResNet
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section id="research-navigation-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('experiments')}
          className="p-4 rounded-lg bg-[#0D0D0D] hover:bg-[#121212] border border-[#262626] hover:border-[#3B82F6]/50 text-left transition-all group"
        >
          <FlaskConical className="w-5 h-5 text-[#3B82F6] mb-2 group-hover:scale-105 transition-transform" />
          <h4 className="text-xs font-semibold text-[#F5F5F5] mb-1">Research Experiments</h4>
          <p className="text-[11px] text-[#737373]">Compare Models 1 through 4 across AUC, F1, and Sensitivity.</p>
        </button>

        <button
          onClick={() => onNavigate('missing-info')}
          className="p-4 rounded-lg bg-[#0D0D0D] hover:bg-[#121212] border border-[#262626] hover:border-[#3B82F6]/50 text-left transition-all group"
        >
          <TrendingDown className="w-5 h-5 text-[#F59E0B] mb-2 group-hover:scale-105 transition-transform" />
          <h4 className="text-xs font-semibold text-[#F5F5F5] mb-1">Missing Information</h4>
          <p className="text-[11px] text-[#737373]">Evaluate degradation curves when modalities are absent.</p>
        </button>

        <button
          onClick={() => onNavigate('calibration')}
          className="p-4 rounded-lg bg-[#0D0D0D] hover:bg-[#121212] border border-[#262626] hover:border-[#3B82F6]/50 text-left transition-all group"
        >
          <Activity className="w-5 h-5 text-[#3B82F6] mb-2 group-hover:scale-105 transition-transform" />
          <h4 className="text-xs font-semibold text-[#F5F5F5] mb-1">Calibration Curves</h4>
          <p className="text-[11px] text-[#737373]">Reliability diagrams comparing predicted risk vs observed events.</p>
        </button>

        <button
          onClick={() => onNavigate('findings')}
          className="p-4 rounded-lg bg-[#0D0D0D] hover:bg-[#121212] border border-[#262626] hover:border-[#3B82F6]/50 text-left transition-all group"
        >
          <Sparkles className="w-5 h-5 text-[#10B981] mb-2 group-hover:scale-105 transition-transform" />
          <h4 className="text-xs font-semibold text-[#F5F5F5] mb-1">Scientific Findings</h4>
          <p className="text-[11px] text-[#737373]">Data-backed conclusions answering the 6 primary inquiries.</p>
        </button>
      </section>
    </div>
  );
};
