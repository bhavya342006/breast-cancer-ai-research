import React, { useState } from 'react';
import {
  FlaskConical,
  Layers,
  Activity,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Info,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { RESEARCH_MODELS_BENCHMARK } from '../../data/researchBenchmark';
import { PageId } from '../../types';

interface ResearchExperimentsViewProps {
  onNavigate: (page: PageId) => void;
}

export const ResearchExperimentsView: React.FC<ResearchExperimentsViewProps> = ({ onNavigate }) => {
  const [selectedMetric, setSelectedMetric] = useState<'auc' | 'sensitivity' | 'specificity' | 'f1Score' | 'falseNegatives'>('auc');

  const metricLabels: Record<string, string> = {
    auc: 'AUC (Area Under ROC)',
    sensitivity: 'Sensitivity (Detection Rate)',
    specificity: 'Specificity (True Negative Rate)',
    f1Score: 'F1 Score',
    falseNegatives: 'False Negatives (Missed Cases / 500)',
  };

  return (
    <div id="research-experiments-view" className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner with Demo Data rule */}
      <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20 text-[10px] font-mono uppercase font-semibold">
              DEMO BENCHMARK DATASET (N=1,500)
            </span>
            <span className="text-xs text-[#F59E0B] font-mono flex items-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>DEMO DATA — NOT REAL RESEARCH RESULTS</span>
            </span>
          </div>
          <h2 className="text-base font-bold text-[#F5F5F5]">
            Four Core Model Configurations Benchmark
          </h2>
          <p className="text-xs text-[#A1A1A1]">
            Empirical evaluation across identical test cohort (500 positive cases, 1,000 negative controls).
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onNavigate('missing-info')}
            className="px-3 py-1.5 rounded-md bg-[#181818] hover:bg-[#262626] border border-[#262626] text-xs text-[#F5F5F5] font-medium transition-colors"
          >
            Missing Info Study →
          </button>
          <button
            onClick={() => onNavigate('model-comparison')}
            className="px-3 py-1.5 rounded-md bg-[#3B82F6] hover:bg-[#2563EB] text-xs text-[#F5F5F5] font-semibold transition-colors"
          >
            Full Comparison Table
          </button>
        </div>
      </div>

      {/* 4 Model Configuration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {RESEARCH_MODELS_BENCHMARK.map((model, index) => (
          <div
            key={model.id}
            id={`model-card-${model.id}`}
            className="p-5 rounded-xl bg-[#0D0D0D] border border-[#262626] hover:border-[#3B82F6]/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded border border-[#3B82F6]/20">
                  MODEL {index + 1}
                </span>
                <span className="text-[10px] font-mono text-[#737373]">{model.code}</span>
              </div>

              <h3 className="text-sm font-bold text-[#F5F5F5] mb-2 leading-tight">
                {model.name}
              </h3>

              <div className="flex flex-wrap gap-1 mb-3">
                {model.modalities.map((m, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#181818] border border-[#262626] text-[#A1A1A1]"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-[#737373] leading-relaxed mb-4">
                {model.description}
              </p>
            </div>

            {/* Metrics List */}
            <div className="pt-3 border-t border-[#262626] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#737373]">AUC:</span>
                <span className="font-mono font-bold text-[#F5F5F5]">{model.auc.toFixed(3)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#737373]">Sensitivity:</span>
                <span className="font-mono text-[#F5F5F5]">{(model.sensitivity * 100).toFixed(1)}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#737373]">Specificity:</span>
                <span className="font-mono text-[#F5F5F5]">{(model.specificity * 100).toFixed(1)}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#737373]">Accuracy:</span>
                <span className="font-mono text-[#F5F5F5]">{(model.accuracy * 100).toFixed(1)}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#737373]">False Negatives:</span>
                <span className="font-mono text-[#EF4444] font-semibold">{model.falseNegatives}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#737373]">False Positives:</span>
                <span className="font-mono text-[#F59E0B]">{model.falsePositives}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#737373]">F1 Score:</span>
                <span className="font-mono text-[#F5F5F5]">{model.f1Score.toFixed(3)}</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#1f1f1f] text-[11px]">
                <span className="text-[#737373]">Brier Score / ECE:</span>
                <span className="font-mono text-[#3B82F6]">{model.brierScore} / {model.ece}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Metric Comparison Bar Visualizer */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262626] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Direct Metric Trajectory Comparison
            </h3>
            <p className="text-xs text-[#A1A1A1]">
              Visualizing performance progression from Clinical-only (Model 1) to Full Multimodal (Model 4).
            </p>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {(['auc', 'sensitivity', 'specificity', 'f1Score', 'falseNegatives'] as const).map((m) => (
              <button
                key={m}
                id={`select-metric-btn-${m}`}
                onClick={() => setSelectedMetric(m)}
                className={`px-2.5 py-1 rounded text-xs font-medium font-mono transition-colors ${
                  selectedMetric === m
                    ? 'bg-[#3B82F6] text-[#F5F5F5]'
                    : 'bg-[#181818] text-[#A1A1A1] hover:bg-[#262626]'
                }`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Chart representation */}
        <div className="space-y-4 pt-2">
          {RESEARCH_MODELS_BENCHMARK.map((model) => {
            let val = 0;
            let displayVal = '';
            let barPct = 0;
            let color = 'bg-[#3B82F6]';

            if (selectedMetric === 'auc') {
              val = model.auc;
              displayVal = val.toFixed(3);
              barPct = ((val - 0.5) / 0.5) * 100;
            } else if (selectedMetric === 'sensitivity') {
              val = model.sensitivity;
              displayVal = `${(val * 100).toFixed(1)}%`;
              barPct = val * 100;
            } else if (selectedMetric === 'specificity') {
              val = model.specificity;
              displayVal = `${(val * 100).toFixed(1)}%`;
              barPct = val * 100;
            } else if (selectedMetric === 'f1Score') {
              val = model.f1Score;
              displayVal = val.toFixed(3);
              barPct = val * 100;
            } else if (selectedMetric === 'falseNegatives') {
              val = model.falseNegatives;
              displayVal = `${val} cases (${((val / 500) * 100).toFixed(1)}% FN rate)`;
              barPct = (val / 200) * 100;
              color = 'bg-[#EF4444]';
            }

            return (
              <div key={model.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#F5F5F5]">{model.name}</span>
                  <span className="font-mono text-[#F5F5F5]">{displayVal}</span>
                </div>

                <div className="w-full h-3 bg-[#181818] rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${color}`}
                    style={{ width: `${Math.min(Math.max(barPct, 8), 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-lg bg-[#121212] border border-[#262626] text-xs text-[#737373] flex items-start space-x-2">
          <Info className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
          <span>
            Notice how Model 4 achieves the lowest false-negative count (94 cases) compared to Model 1 (181 cases), while Sensitivity improves from 63.8% to 81.2%.
          </span>
        </div>
      </div>
    </div>
  );
};
