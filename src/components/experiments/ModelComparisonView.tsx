import React, { useState } from 'react';
import { GitCompare, TrendingUp, HelpCircle, Layers, ArrowRight, AlertTriangle, Check } from 'lucide-react';
import { RESEARCH_MODELS_BENCHMARK } from '../../data/researchBenchmark';
import { PageId } from '../../types';

interface ModelComparisonViewProps {
  onNavigate: (page: PageId) => void;
  onOpenGlossary: () => void;
}

export const ModelComparisonView: React.FC<ModelComparisonViewProps> = ({
  onNavigate,
  onOpenGlossary,
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'roc'>('table');

  const m1 = RESEARCH_MODELS_BENCHMARK[0];
  const m2 = RESEARCH_MODELS_BENCHMARK[1];
  const m3 = RESEARCH_MODELS_BENCHMARK[2];
  const m4 = RESEARCH_MODELS_BENCHMARK[3];

  const METRICS_TABLE_ROWS = [
    { label: 'AUC (ROC)', key: 'auc', format: (v: number) => v.toFixed(3), isHigherBetter: true },
    { label: 'Sensitivity (Recall)', key: 'sensitivity', format: (v: number) => `${(v * 100).toFixed(1)}%`, isHigherBetter: true },
    { label: 'Specificity', key: 'specificity', format: (v: number) => `${(v * 100).toFixed(1)}%`, isHigherBetter: true },
    { label: 'Accuracy', key: 'accuracy', format: (v: number) => `${(v * 100).toFixed(1)}%`, isHigherBetter: true },
    { label: 'False Negatives (Missed)', key: 'falseNegatives', format: (v: number) => `${v} / 500 (${((v / 500) * 100).toFixed(1)}%)`, isHigherBetter: false },
    { label: 'False Positives', key: 'falsePositives', format: (v: number) => `${v} / 1000 (${((v / 1000) * 100).toFixed(1)}%)`, isHigherBetter: false },
    { label: 'F1 Score', key: 'f1Score', format: (v: number) => v.toFixed(3), isHigherBetter: true },
    { label: 'Brier Score (Calibration)', key: 'brierScore', format: (v: number) => v.toFixed(3), isHigherBetter: false },
    { label: 'Expected Calib. Error (ECE)', key: 'ece', format: (v: number) => v.toFixed(3), isHigherBetter: false },
  ];

  return (
    <div id="model-comparison-view" className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6] mb-1">
            <GitCompare className="w-4 h-4" />
            <span>CROSS-ARCHITECTURE SYNTHESIS</span>
          </div>
          <h2 className="text-xl font-bold text-[#F5F5F5]">
            Comprehensive Model Comparison
          </h2>
          <p className="text-xs text-[#A1A1A1] mt-1">
            Primary question: <strong className="text-[#F5F5F5]">“Does adding another type of information actually improve the model?”</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenGlossary}
            className="px-3 py-1.5 rounded bg-[#181818] hover:bg-[#262626] border border-[#262626] text-xs text-[#A1A1A1] hover:text-[#F5F5F5] flex items-center space-x-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Metric Definitions</span>
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setActiveTab('table')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'table'
              ? 'bg-[#181818] text-[#3B82F6] border border-[#3B82F6]/40'
              : 'text-[#737373] hover:text-[#F5F5F5] bg-[#0D0D0D] border border-[#262626]'
          }`}
        >
          Detailed Comparison Table
        </button>
        <button
          onClick={() => setActiveTab('roc')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'roc'
              ? 'bg-[#181818] text-[#3B82F6] border border-[#3B82F6]/40'
              : 'text-[#737373] hover:text-[#F5F5F5] bg-[#0D0D0D] border border-[#262626]'
          }`}
        >
          Multi-Model ROC Curves (SVG)
        </button>
      </div>

      {/* TABLE VIEW */}
      {activeTab === 'table' && (
        <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider">
              Scientific Evaluation Matrix (N=1,500 Test Cohort)
            </span>
            <span className="text-[10px] font-mono text-[#F59E0B] px-2 py-0.5 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/20">
              DEMO DATA — NOT REAL RESEARCH RESULTS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#262626] text-[#737373] font-mono text-[11px]">
                  <th className="py-3 px-3">Metric</th>
                  <th className="py-3 px-3 text-right">Clinical (M1)</th>
                  <th className="py-3 px-3 text-right">Mammogram (M2)</th>
                  <th className="py-3 px-3 text-right">Clinical + Mammo (M3)</th>
                  <th className="py-3 px-3 text-right text-[#3B82F6] font-semibold">All Modalities (M4)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f1f]">
                {METRICS_TABLE_ROWS.map((row) => {
                  const v1 = (m1 as any)[row.key];
                  const v2 = (m2 as any)[row.key];
                  const v3 = (m3 as any)[row.key];
                  const v4 = (m4 as any)[row.key];

                  return (
                    <tr key={row.key} className="hover:bg-[#121212] transition-colors">
                      <td className="py-3 px-3 font-medium text-[#F5F5F5]">{row.label}</td>
                      <td className="py-3 px-3 text-right font-mono text-[#A1A1A1]">{row.format(v1)}</td>
                      <td className="py-3 px-3 text-right font-mono text-[#A1A1A1]">{row.format(v2)}</td>
                      <td className="py-3 px-3 text-right font-mono text-[#A1A1A1]">{row.format(v3)}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-[#F5F5F5] bg-[#3B82F6]/5">
                        {row.format(v4)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table synthesis insight */}
          <div className="pt-4 border-t border-[#262626] text-xs text-[#A1A1A1] space-y-1 leading-relaxed">
            <p>
              <strong className="text-[#F5F5F5]">Answer to Research Question:</strong> Yes, adding mammogram imaging to clinical information provides a substantial and statistically significant improvement (AUC jumps from 0.684 to 0.798, reducing false negatives from 181 down to 113).
            </p>
            <p className="text-[11px] text-[#737373]">
              Adding genetic panel information provides a smaller, selective incremental gain (AUC increases to 0.826, reducing false negatives to 94).
            </p>
          </div>
        </div>
      )}

      {/* ROC CURVES VIEW */}
      {activeTab === 'roc' && (
        <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-6">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#F5F5F5]">
                Receiver Operating Characteristic (ROC) Space
              </h3>
              <p className="text-xs text-[#A1A1A1]">
                True Positive Rate (Sensitivity) vs False Positive Rate (1 - Specificity) across decision thresholds.
              </p>
            </div>
            <span className="text-xs font-mono text-[#737373]">Dark Theme Vector Plot</span>
          </div>

          {/* SVG ROC Plot */}
          <div className="w-full max-w-xl mx-auto aspect-square relative p-4 bg-[#080808] border border-[#262626] rounded-xl">
            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((step, idx) => {
                const pos = 40 + step * 320;
                return (
                  <g key={idx}>
                    {/* Horizontal Grid */}
                    <line x1="40" y1={pos} x2="360" y2={pos} stroke="#1f1f1f" strokeDasharray="3 3" />
                    {/* Vertical Grid */}
                    <line x1={pos} y1="40" x2={pos} y2="360" stroke="#1f1f1f" strokeDasharray="3 3" />
                    {/* Y-axis label */}
                    <text x="32" y={40 + (1 - step) * 320 + 4} fill="#737373" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">
                      {step.toFixed(1)}
                    </text>
                    {/* X-axis label */}
                    <text x={pos} y="380" fill="#737373" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
                      {step.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Random Baseline Diagonal (y=x) */}
              <line x1="40" y1="360" x2="360" y2="40" stroke="#737373" strokeDasharray="4 4" strokeWidth="1.5" />
              <text x="210" y="200" fill="#737373" fontSize="9" transform="rotate(-45 200 200)" fontFamily="JetBrains Mono">
                Chance Diagonal (AUC = 0.500)
              </text>

              {/* Model 1: Clinical Only (AUC 0.684) */}
              {/* Origin (40, 360) to (360, 40) */}
              <path
                d="M 40 360 Q 90 280, 150 200 T 360 40"
                fill="none"
                stroke="#A1A1A1"
                strokeWidth="2"
              />

              {/* Model 2: Mammogram Only (AUC 0.742) */}
              <path
                d="M 40 360 Q 80 230, 140 160 T 360 40"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2"
              />

              {/* Model 3: Clinical + Mammo (AUC 0.798) */}
              <path
                d="M 40 360 Q 70 180, 130 120 T 360 40"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
              />

              {/* Model 4: Full Multimodal (AUC 0.826) */}
              <path
                d="M 40 360 Q 60 140, 120 90 T 360 40"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
              />
            </svg>

            {/* Axes Labels */}
            <div className="text-center text-[11px] text-[#A1A1A1] font-mono mt-2">
              False Positive Rate (1 - Specificity)
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-2 rounded bg-[#121212] border border-[#262626] flex items-center space-x-2">
              <span className="w-3 h-1 bg-[#10B981] rounded" />
              <div>
                <span className="font-semibold text-[#F5F5F5] block">Model 4 (All)</span>
                <span className="text-[10px] text-[#737373] font-mono">AUC 0.826</span>
              </div>
            </div>

            <div className="p-2 rounded bg-[#121212] border border-[#262626] flex items-center space-x-2">
              <span className="w-3 h-1 bg-[#3B82F6] rounded" />
              <div>
                <span className="font-semibold text-[#F5F5F5] block">Model 3 (Clin+Mam)</span>
                <span className="text-[10px] text-[#737373] font-mono">AUC 0.798</span>
              </div>
            </div>

            <div className="p-2 rounded bg-[#121212] border border-[#262626] flex items-center space-x-2">
              <span className="w-3 h-1 bg-[#F59E0B] rounded" />
              <div>
                <span className="font-semibold text-[#F5F5F5] block">Model 2 (Mammo)</span>
                <span className="text-[10px] text-[#737373] font-mono">AUC 0.742</span>
              </div>
            </div>

            <div className="p-2 rounded bg-[#121212] border border-[#262626] flex items-center space-x-2">
              <span className="w-3 h-1 bg-[#A1A1A1] rounded" />
              <div>
                <span className="font-semibold text-[#F5F5F5] block">Model 1 (Clinical)</span>
                <span className="text-[10px] text-[#737373] font-mono">AUC 0.684</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
