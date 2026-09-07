import React from 'react';
import { Sparkles, CheckCircle2, TrendingUp, AlertTriangle, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { PageId } from '../../types';

interface ResearchFindingsViewProps {
  onNavigate: (page: PageId) => void;
}

export const ResearchFindingsView: React.FC<ResearchFindingsViewProps> = ({ onNavigate }) => {
  const FINDINGS = [
    {
      question: '1. Does combining modalities improve breast cancer risk estimation over single sources?',
      verdict: 'Yes, statistically and clinically significant improvement.',
      details:
        'The full multimodal model (Model 4) achieved an AUC of 0.826, compared to 0.684 for clinical data alone and 0.742 for mammogram imaging alone. The combined model leverages complementary signals: anatomical texture patterns from mammography and systemic germline risk from genetics.',
      metricHighlight: '+20.8% AUC improvement over clinical baseline',
      color: 'text-[#10B981] border-[#10B981]/20 bg-[#10B981]/10',
    },
    {
      question: '2. Which missing information source causes the greatest performance degradation?',
      verdict: 'Absence of mammographic imaging causes the most severe drop.',
      details:
        'When mammograms are omitted (Test C), the AUC plummets by -0.088, and false-negative counts increase by +54 cases. In contrast, omitting genetic panel data (Test B) results in a modest -0.028 AUC decline. Mammograms provide direct spatial evidence of current parenchymal state, making them indispensable.',
      metricHighlight: 'Missing mammograms causes 3.1x larger AUC penalty than missing genetics',
      color: 'text-[#F59E0B] border-[#F59E0B]/20 bg-[#F59E0B]/10',
    },
    {
      question: '3. What happens to false negatives (missed cases) across model configurations?',
      verdict: 'Multimodal fusion reduces false negatives by nearly half.',
      details:
        'Across 500 biopsy-proven positive cases, Model 1 (clinical-only) missed 181 cases (36.2% false-negative rate). Model 4 missed only 94 cases (18.8% false-negative rate). Reducing false negatives without skyrocketing false alarms is the single most important safety metric in population screening.',
      metricHighlight: '87 fewer missed positive cases (48.1% reduction in false negatives)',
      color: 'text-[#EF4444] border-[#EF4444]/20 bg-[#EF4444]/10',
    },
    {
      question: '4. Does missing information distort probability calibration?',
      verdict: 'Yes, naive models become overconfident under missing data.',
      details:
        'When models are trained without missingness-aware loss objectives, absent features artificially skew logits toward average probabilities, inflating Expected Calibration Error (ECE) from 0.042 up to 0.098. Learnable missingness tokens and isotonic post-hoc calibration restore probability truthfulness.',
      metricHighlight: 'ECE controlled under 0.05 when using learned attention masking',
      color: 'text-[#3B82F6] border-[#3B82F6]/20 bg-[#3B82F6]/10',
    },
    {
      question: '5. What is the practical clinical utility of the "Clinical + Mammogram" configuration?',
      verdict: 'High-performing, accessible tier for community healthcare settings.',
      details:
        'Model 3 (Clinical + Mammogram) retains 96.6% of the full multimodal model’s predictive power (AUC 0.798 vs 0.826). Because genomic multi-gene panels are costly and rarely accessible in routine community screenings, Model 3 represents a practical, high-accuracy tier for real-world clinics.',
      metricHighlight: '96.6% performance retention without expensive genetic sequencing',
      color: 'text-[#10B981] border-[#10B981]/20 bg-[#10B981]/10',
    },
  ];

  return (
    <div id="research-findings-view" className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626]">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#10B981] mb-1">
          <Sparkles className="w-4 h-4" />
          <span>EMPIRICAL SYNTHESIS</span>
        </div>
        <h2 className="text-xl font-bold text-[#F5F5F5]">Scientific Research Findings</h2>
        <p className="text-xs text-[#A1A1A1] mt-1 max-w-2xl leading-relaxed">
          Comprehensive answers to the primary research questions based on benchmark experiments across 1,500 validation cases.
        </p>
      </div>

      {/* Findings List */}
      <div className="space-y-4">
        {FINDINGS.map((finding, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-3 hover:border-[#3B82F6]/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-[#F5F5F5]">{finding.question}</h3>
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border self-start sm:self-auto ${finding.color}`}>
                {finding.metricHighlight}
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#121212] border border-[#1f1f1f] text-xs">
              <span className="text-[#737373] font-medium mr-1.5">Finding:</span>
              <span className="text-[#F5F5F5] font-semibold">{finding.verdict}</span>
            </div>

            <p className="text-xs text-[#A1A1A1] leading-relaxed">
              {finding.details}
            </p>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#F5F5F5] block">Ready to run an interactive assessment?</span>
          <p className="text-[11px] text-[#737373]">
            Test these conclusions live by running the risk prediction engine under varying levels of completeness.
          </p>
        </div>
        <button
          onClick={() => onNavigate('assessment')}
          className="px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F5F5F5] text-xs font-semibold flex items-center space-x-2 transition-colors shrink-0"
        >
          <span>Open Assessment Wizard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
