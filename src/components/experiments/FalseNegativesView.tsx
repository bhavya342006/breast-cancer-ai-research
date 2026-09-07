import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Sliders,
  TrendingDown,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { RESEARCH_MODELS_BENCHMARK } from '../../data/researchBenchmark';
import { PageId } from '../../types';

interface FalseNegativesViewProps {
  onNavigate: (page: PageId) => void;
  onOpenGlossary: () => void;
}

export const FalseNegativesView: React.FC<FalseNegativesViewProps> = ({ onNavigate, onOpenGlossary }) => {
  const [decisionThreshold, setDecisionThreshold] = useState<number>(0.20); // standard screening cutoff

  // Simulation: As threshold increases (e.g. from 0.10 to 0.50), model requires higher confidence to flag case.
  // This causes False Negatives to RISE and False Positives to DROP.
  const calculateThresholdMetrics = (baseFN: number, baseFP: number) => {
    // base is calibrated at threshold = 0.20
    const factor = (decisionThreshold - 0.20) / 0.10;
    const adjustedFN = Math.max(10, Math.min(480, Math.round(baseFN + factor * 25)));
    const adjustedFP = Math.max(10, Math.min(950, Math.round(baseFP - factor * 35)));
    return { fn: adjustedFN, fp: adjustedFP };
  };

  return (
    <div id="false-negatives-view" className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#EF4444] mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>CRITICAL CLINICAL SAFETY METRIC</span>
          </div>
          <h2 className="text-xl font-bold text-[#F5F5F5]">
            False-Negative Safety & Threshold Analysis
          </h2>
          <p className="text-xs text-[#A1A1A1] mt-1">
            <strong className="text-[#F5F5F5]">“What does a false negative mean in this context?”</strong> The AI estimated low risk or missed a case that was truly malignant.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenGlossary}
            className="px-3 py-1.5 rounded bg-[#181818] hover:bg-[#262626] border border-[#262626] text-xs text-[#A1A1A1] hover:text-[#F5F5F5] flex items-center space-x-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>What do these metrics mean?</span>
          </button>
        </div>
      </div>

      {/* Critical Medical Stakes Card */}
      <div className="p-5 rounded-xl bg-[#121212] border border-[#262626] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-[#EF4444] font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Why False Negatives are the Primary Safety Concern</span>
          </div>
          <p className="text-[#A1A1A1] leading-relaxed text-[11px]">
            In breast-cancer risk stratification, a false negative is far more hazardous than a false positive. If an AI erroneously reassures a patient that their risk is low when an underlying lesion exists, timely diagnostic follow-up or supplemental MRI screening is delayed.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-[#F59E0B] font-semibold">
            <Sliders className="w-4 h-4 shrink-0" />
            <span>The Trade-off With False Positives</span>
          </div>
          <p className="text-[#A1A1A1] leading-relaxed text-[11px]">
            Setting the decision threshold too low catches nearly all cancers but floods clinical workflows with false alarms, triggering high patient anxiety and costly unnecessary tissue biopsies. Multimodal fusion (Model 4) contracts this curve.
          </p>
        </div>
      </div>

      {/* Interactive Threshold Slider */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Interactive Decision Threshold Simulator
            </h3>
            <p className="text-xs text-[#A1A1A1]">
              Adjust the probability cutoff for classifying a case as "Elevated / High Risk"
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#737373]">Cutoff Threshold:</span>
            <span className="text-sm font-bold font-mono text-[#3B82F6] px-2.5 py-0.5 rounded bg-[#181818] border border-[#262626]">
              {(decisionThreshold * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="space-y-2 py-2">
          <input
            id="threshold-slider"
            type="range"
            min="0.05"
            max="0.45"
            step="0.05"
            value={decisionThreshold}
            onChange={(e) => setDecisionThreshold(parseFloat(e.target.value))}
            className="w-full accent-[#3B82F6] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#737373] font-mono">
            <span>5% (High Sensitivity / Many False Positives)</span>
            <span>20% (Standard Benchmark)</span>
            <span>45% (High Specificity / Many Missed Cases)</span>
          </div>
        </div>

        {/* Dynamic Comparison Cards Under Current Threshold */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {RESEARCH_MODELS_BENCHMARK.map((m) => {
            const adjusted = calculateThresholdMetrics(m.falseNegatives, m.falsePositives);
            const fnRate = ((adjusted.fn / 500) * 100).toFixed(1);
            const fpRate = ((adjusted.fp / 1000) * 100).toFixed(1);

            return (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-[#121212] border border-[#262626] space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#F5F5F5]">{m.name}</span>
                    <span className="text-[10px] font-mono text-[#737373]">{m.code}</span>
                  </div>
                  <span className="text-[10px] text-[#737373]">{m.modalities.join(' + ')}</span>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#1f1f1f] text-xs">
                  <div className="p-2.5 rounded bg-[#080808] border border-[#262626]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[#EF4444] font-medium text-[11px]">False Negatives (Missed)</span>
                      <span className="font-mono font-bold text-[#EF4444] text-xs">{adjusted.fn}</span>
                    </div>
                    <span className="text-[10px] text-[#737373] block">{fnRate}% of 500 positive cases</span>
                  </div>

                  <div className="p-2.5 rounded bg-[#080808] border border-[#262626]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[#F59E0B] font-medium text-[11px]">False Positives (Alarms)</span>
                      <span className="font-mono font-bold text-[#F59E0B] text-xs">{adjusted.fp}</span>
                    </div>
                    <span className="text-[10px] text-[#737373] block">{fpRate}% of 1,000 negative cases</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-lg bg-[#181818] border border-[#262626] text-xs text-[#737373] flex items-start space-x-2">
          <Info className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
          <span>
            Notice that at any threshold chosen, <strong>Model 4 consistently yields the fewest missed positive cases</strong> while keeping false positive alarms lower than single-modality architectures.
          </span>
        </div>
      </div>
    </div>
  );
};
