import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  HelpCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { PageId } from '../../types';

interface ExplainabilityViewProps {
  onNavigate: (page: PageId) => void;
  onOpenGlossary: () => void;
}

const GLOBAL_FEATURE_IMPORTANCE = [
  { name: 'Mammographic Parenchymal Density', modality: 'Mammography', importance: 0.28, type: 'Vision Embedding' },
  { name: 'Patient Age', modality: 'Clinical', importance: 0.21, type: 'Tabular Continuous' },
  { name: 'BRCA1 / BRCA2 Pathogenic Variant', modality: 'Genetics', importance: 0.17, type: 'Genomic Binary' },
  { name: 'Family History First-Degree', modality: 'Clinical', importance: 0.12, type: 'Tabular Categorical' },
  { name: 'Prior Atypical Biopsy (ADH/ALH)', modality: 'Clinical', importance: 0.09, type: 'Tabular Categorical' },
  { name: 'Microcalcification Texture Entropy', modality: 'Mammography', importance: 0.06, type: 'Radiomic Feature' },
  { name: 'Polygenic Risk Score (PRS)', modality: 'Genetics', importance: 0.04, type: 'Genomic Score' },
  { name: 'Body Mass Index (BMI)', modality: 'Clinical', importance: 0.03, type: 'Tabular Continuous' },
];

export const ExplainabilityView: React.FC<ExplainabilityViewProps> = ({ onNavigate, onOpenGlossary }) => {
  const [selectedExplainer, setSelectedExplainer] = useState<'shap' | 'integrated_gradients' | 'attention'>('shap');

  return (
    <div id="explainability-view" className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>MODEL EXPLAINABILITY & AUDITABILITY</span>
          </div>
          <h2 className="text-xl font-bold text-[#F5F5F5]">
            Feature Attribution & Decision Interpretability
          </h2>
          <p className="text-xs text-[#A1A1A1] mt-1 max-w-2xl leading-relaxed">
            Investigating why the AI produced specific predictions across clinical, imaging, and genetic inputs to safeguard against algorithmic black-box failure modes.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenGlossary}
            className="px-3 py-1.5 rounded bg-[#181818] hover:bg-[#262626] border border-[#262626] text-xs text-[#A1A1A1] hover:text-[#F5F5F5] flex items-center space-x-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Glossary</span>
          </button>
        </div>
      </div>

      {/* Scientific Non-Causation Disclaimer Box */}
      <div className="p-4 rounded-xl bg-[#121212] border border-[#262626] flex items-start space-x-3 text-xs">
        <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#F5F5F5] uppercase tracking-wider text-[11px] block mb-0.5">
            Important Scientific Guideline on Attribution
          </span>
          <p className="text-[#A1A1A1] text-[11px] leading-relaxed">
            Model explanations show which input features mathematically influenced the prediction log-odds. <strong>They do not establish medical causation.</strong> High SHAP attribution reflects correlation within training cohorts rather than biological etiology.
          </p>
        </div>
      </div>

      {/* Global Feature Importance Chart */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262626] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Global Mean Absolute SHAP Value (Population Level)
            </h3>
            <p className="text-xs text-[#A1A1A1]">
              Average impact on model risk output across the 1,500 validation cohort subjects.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono">
            <span className="flex items-center space-x-1 text-[#3B82F6]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span>Mammography</span>
            </span>
            <span className="flex items-center space-x-1 text-[#10B981]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Clinical</span>
            </span>
            <span className="flex items-center space-x-1 text-[#F59E0B]">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span>Genetics</span>
            </span>
          </div>
        </div>

        {/* Bar Chart list */}
        <div className="space-y-4">
          {GLOBAL_FEATURE_IMPORTANCE.map((feat, idx) => {
            const barWidth = (feat.importance / 0.28) * 100;
            const barColor =
              feat.modality === 'Mammography'
                ? 'bg-[#3B82F6]'
                : feat.modality === 'Clinical'
                ? 'bg-[#10B981]'
                : 'bg-[#F59E0B]';

            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#F5F5F5]">{feat.name}</span>
                    <span className="text-[10px] font-mono text-[#737373]">({feat.type})</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#F5F5F5]">
                    {(feat.importance * 100).toFixed(1)}% contribution
                  </span>
                </div>

                <div className="w-full h-3 bg-[#181818] rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explainer Methods Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setSelectedExplainer('shap')}
          className={`p-4 rounded-xl cursor-pointer border transition-all ${
            selectedExplainer === 'shap'
              ? 'bg-[#181818] border-[#3B82F6]'
              : 'bg-[#0D0D0D] border-[#262626] hover:border-[#3B82F6]/30'
          }`}
        >
          <span className="text-xs font-bold text-[#F5F5F5] block mb-1">1. Kernel & Tree SHAP</span>
          <p className="text-[11px] text-[#737373] leading-relaxed">
            Shapley values from cooperative game theory; guarantees local accuracy and consistency across feature subsets.
          </p>
        </div>

        <div
          onClick={() => setSelectedExplainer('integrated_gradients')}
          className={`p-4 rounded-xl cursor-pointer border transition-all ${
            selectedExplainer === 'integrated_gradients'
              ? 'bg-[#181818] border-[#3B82F6]'
              : 'bg-[#0D0D0D] border-[#262626] hover:border-[#3B82F6]/30'
          }`}
        >
          <span className="text-xs font-bold text-[#F5F5F5] block mb-1">2. Integrated Gradients</span>
          <p className="text-[11px] text-[#737373] leading-relaxed">
            Path-integral gradients computed along straight line from a black-image baseline to the input mammogram embedding.
          </p>
        </div>

        <div
          onClick={() => setSelectedExplainer('attention')}
          className={`p-4 rounded-xl cursor-pointer border transition-all ${
            selectedExplainer === 'attention'
              ? 'bg-[#181818] border-[#3B82F6]'
              : 'bg-[#0D0D0D] border-[#262626] hover:border-[#3B82F6]/30'
          }`}
        >
          <span className="text-xs font-bold text-[#F5F5F5] block mb-1">3. Cross-Attention Saliency</span>
          <p className="text-[11px] text-[#737373] leading-relaxed">
            Multimodal fusion transformer attention matrices showing where radiological tokens attend to high-penetrance genetic tokens.
          </p>
        </div>
      </div>
    </div>
  );
};
