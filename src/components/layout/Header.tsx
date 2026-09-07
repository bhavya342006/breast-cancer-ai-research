import React from 'react';
import { Menu, HelpCircle } from 'lucide-react';
import { PageId } from '../../types';

interface HeaderProps {
  currentPage: PageId;
  onOpenMobileMenu: () => void;
  onOpenGlossary: () => void;
}

const PAGE_DETAILS: Record<PageId, { section: string; title: string }> = {
  home: {
    section: 'Overview',
    title: 'Research Laboratory Home',
  },
  assessment: {
    section: 'Clinical Intake',
    title: 'Multimodal Risk Assessment Wizard',
  },
  results: {
    section: 'Research Experiments',
    title: 'Prediction Results Dashboard',
  },
  experiments: {
    section: 'Benchmarking',
    title: 'Model Ablation Experiments',
  },
  'missing-info': {
    section: 'Analysis',
    title: 'Missing Information Reliability Study',
  },
  'model-comparison': {
    section: 'Analysis',
    title: 'Multi-Model Comparative Matrix',
  },
  calibration: {
    section: 'Evaluation',
    title: 'Probability Reliability & Calibration Curves',
  },
  'false-negatives': {
    section: 'Safety Audit',
    title: 'False-Negative Critical Analysis',
  },
  explainability: {
    section: 'Interpretability',
    title: 'SHAP Feature Attribution Explorer',
  },
  methodology: {
    section: 'Documentation',
    title: 'Cohort Dataset & Methodology',
  },
  architecture: {
    section: 'Documentation',
    title: 'Neural Pipeline Architecture',
  },
  findings: {
    section: 'Evidence',
    title: 'Empirical Research Findings',
  },
  about: {
    section: 'Governance',
    title: 'Academic Scope & Ethical Mandates',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onOpenMobileMenu,
  onOpenGlossary,
}) => {
  const pageInfo = PAGE_DETAILS[currentPage] || {
    section: 'Research Experiments',
    title: 'BC-AI Research Platform',
  };

  return (
    <header
      id="app-header"
      className="h-16 border-b border-[#262626] flex items-center px-4 md:px-8 justify-between bg-[#080808] sticky top-0 z-30 select-none"
    >
      {/* Breadcrumbs Left Section */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <button
          id="open-mobile-menu-btn"
          onClick={onOpenMobileMenu}
          className="lg:hidden text-[#A1A1A1] hover:text-[#F5F5F5] p-1.5 rounded-lg bg-[#121212] border border-[#262626]"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm truncate">
          <span className="text-[#737373] hover:text-[#A1A1A1] transition-colors truncate">
            {pageInfo.section}
          </span>
          <span className="text-[#262626] font-mono">/</span>
          <span className="text-[#F5F5F5] font-medium tracking-tight truncate">
            {pageInfo.title}
          </span>
        </div>
      </div>

      {/* Right Safeguard Pill & Metric Guide */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Metric glossary trigger */}
        <button
          id="open-metric-glossary-header-btn"
          onClick={onOpenGlossary}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#121212] hover:bg-[#181818] border border-[#262626] text-[#A1A1A1] hover:text-[#F5F5F5] text-xs transition-colors"
          title="What do these research measurements mean?"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span className="hidden sm:inline text-xs font-medium">Metrics Guide</span>
        </button>

        {/* Sleek Non-Diagnostic Safeguard Pill */}
        <div className="px-2.5 md:px-3 py-1 bg-amber-900/20 border border-amber-500/30 rounded text-amber-400 text-[10px] md:text-xs font-mono font-medium tracking-wider uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)] shrink-0" />
          <span className="hidden sm:inline">RESEARCH PROTOTYPE — NOT A MEDICAL DIAGNOSIS</span>
          <span className="sm:hidden">RESEARCH ONLY</span>
        </div>
      </div>
    </header>
  );
};

