import React from 'react';
import { X, HelpCircle, BookOpen } from 'lucide-react';

interface MetricExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GLOSSARY_ITEMS = [
  {
    term: 'False Negative (FN)',
    simpleMeaning: 'The AI missed a real case.',
    formalMeaning: 'The model predicted negative or low risk, but the actual medical outcome was positive (malignancy confirmed). In screening AI, false negatives are the most critical safety concern because missed cases delay necessary evaluation.',
    tag: 'Safety Critical',
    tagColor: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20',
  },
  {
    term: 'False Positive (FP)',
    simpleMeaning: 'The AI raised an unnecessary alarm.',
    formalMeaning: 'The model predicted high risk or disease, but the tissue was benign. While less hazardous than missing cancer, high false-positive rates lead to unnecessary patient anxiety and supplementary invasive biopsies.',
    tag: 'Resource Impact',
    tagColor: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
  },
  {
    term: 'Sensitivity (Recall / True Positive Rate)',
    simpleMeaning: 'How good the model is at finding actual positive cases.',
    formalMeaning: 'Calculated as TP / (TP + FN). A sensitivity of 81.2% means that out of 100 people with verified disease, the AI correctly flags ~81 of them.',
    tag: 'Case Detection',
    tagColor: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20',
  },
  {
    term: 'Specificity (True Negative Rate)',
    simpleMeaning: 'How good the model is at correctly identifying healthy cases.',
    formalMeaning: 'Calculated as TN / (TN + FP). A specificity of 80.4% means that out of 100 healthy individuals, the AI correctly identifies 80 as non-elevated risk.',
    tag: 'Alarm Prevention',
    tagColor: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
  },
  {
    term: 'AUC (Area Under ROC Curve)',
    simpleMeaning: 'How well the model separates higher-risk people from lower-risk people across all possible decision thresholds.',
    formalMeaning: 'Ranges from 0.5 (random coin toss) to 1.0 (perfect ranking). An AUC of 0.826 indicates that a randomly chosen positive case has an 82.6% probability of receiving a higher risk score than a randomly chosen negative case.',
    tag: 'Discrimination',
    tagColor: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20',
  },
  {
    term: 'Calibration (Reliability of Risk %)',
    simpleMeaning: 'Whether the model’s predicted risk percentages are reasonably close to what actually happens in real patient data.',
    formalMeaning: 'If an AI predicts a 20% risk for 1,000 subjects, approximately 200 of them should actually develop the outcome. Measured via Expected Calibration Error (ECE) and Brier Score.',
    tag: 'Probability Truth',
    tagColor: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20',
  },
  {
    term: 'Accuracy',
    simpleMeaning: 'How many predictions were correct overall out of the total dataset.',
    formalMeaning: 'Calculated as (TP + TN) / Total. In clinical cohorts with low disease prevalence, accuracy alone can be misleading, so clinicians prioritize Sensitivity, Specificity, and AUC.',
    tag: 'Overall Score',
    tagColor: 'text-[#A1A1A1] bg-[#181818] border-[#262626]',
  },
  {
    term: 'F1 Score',
    simpleMeaning: 'A measurement that balances finding positive cases with avoiding too many false alarms.',
    formalMeaning: 'The harmonic mean of Precision and Recall: 2 * (Precision * Recall) / (Precision + Recall). Useful when evaluating imbalanced datasets where positive cases are infrequent.',
    tag: 'Balanced Metric',
    tagColor: 'text-[#A1A1A1] bg-[#181818] border-[#262626]',
  },
];

export const MetricExplanationModal: React.FC<MetricExplanationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="metric-explanation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        id="metric-explanation-modal-content"
        className="bg-[#0D0D0D] border border-[#262626] rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#262626] flex items-center justify-between bg-[#121212]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-md bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#F5F5F5]">What Do These Research Measurements Mean?</h2>
              <p className="text-[11px] text-[#A1A1A1]">Simple, plain-English reference guide for AI performance evaluation</p>
            </div>
          </div>
          <button
            id="close-glossary-modal-btn"
            onClick={onClose}
            className="text-[#737373] hover:text-[#F5F5F5] p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {GLOSSARY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              id={`glossary-item-${idx}`}
              className="p-3 rounded-lg bg-[#121212] border border-[#262626] hover:border-[#3B82F6]/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-semibold text-xs text-[#F5F5F5]">{item.term}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
              <div className="p-2 rounded bg-[#080808] border border-[#1f1f1f] text-xs mb-2">
                <span className="text-[#737373] font-medium mr-1.5">Simple meaning:</span>
                <span className="text-[#F5F5F5] font-medium">{item.simpleMeaning}</span>
              </div>
              <p className="text-[11px] text-[#A1A1A1] leading-relaxed">{item.formalMeaning}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#262626] bg-[#080808] flex items-center justify-between text-[11px] text-[#737373]">
          <span>Source: Medical AI Evaluation Standards (SPIRIT-AI / CONSORT-AI Guidelines)</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#181818] hover:bg-[#262626] text-[#F5F5F5] rounded border border-[#262626] text-xs transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
