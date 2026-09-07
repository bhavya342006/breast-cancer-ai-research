import React, { useState } from 'react';
import { Activity, HelpCircle, AlertTriangle, Info, CheckCircle2, TrendingUp } from 'lucide-react';
import { RESEARCH_MODELS_BENCHMARK } from '../../data/researchBenchmark';
import { PageId } from '../../types';

interface CalibrationViewProps {
  onNavigate: (page: PageId) => void;
  onOpenGlossary: () => void;
}

export const CalibrationView: React.FC<CalibrationViewProps> = ({ onNavigate, onOpenGlossary }) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('model_4');

  const activeModel = RESEARCH_MODELS_BENCHMARK.find((m) => m.id === selectedModelId) || RESEARCH_MODELS_BENCHMARK[3];

  return (
    <div id="calibration-view" className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6] mb-1">
            <Activity className="w-4 h-4" />
            <span>PREDICTION RELIABILITY & CALIBRATION</span>
          </div>
          <h2 className="text-xl font-bold text-[#F5F5F5]">
            Calibration Reliability Curves
          </h2>
          <p className="text-xs text-[#A1A1A1] mt-1 max-w-2xl leading-relaxed">
            <strong className="text-[#F5F5F5]">“Are the model’s predicted risk percentages reasonably close to what actually happens in real patient data?”</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-2.5 py-1 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[10px] font-mono text-[#F59E0B]">
            DEMO DATA — BENCHMARK
          </span>
          <button
            onClick={onOpenGlossary}
            className="px-3 py-1.5 rounded bg-[#181818] hover:bg-[#262626] border border-[#262626] text-xs text-[#A1A1A1] hover:text-[#F5F5F5] flex items-center space-x-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Glossary</span>
          </button>
        </div>
      </div>

      {/* Conceptual Explanation Box */}
      <div className="p-5 rounded-xl bg-[#121212] border border-[#262626] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="space-y-1">
          <span className="font-semibold text-[#F5F5F5] block">Why Calibration Matters</span>
          <p className="text-[#A1A1A1] leading-relaxed text-[11px]">
            High AUC only measures sorting order (who has higher risk than whom). Calibration measures truthfulness: if an AI predicts a 20% risk for 1,000 subjects, exactly 200 should actually develop cancer.
          </p>
        </div>

        <div className="space-y-1">
          <span className="font-semibold text-[#F5F5F5] block">Overestimation vs Underestimation</span>
          <p className="text-[#A1A1A1] leading-relaxed text-[11px]">
            Curves lying below the diagonal overestimate risk (causing excessive screening anxiety). Curves lying above underestimate risk (creating a false sense of security).
          </p>
        </div>

        <div className="space-y-1">
          <span className="font-semibold text-[#F5F5F5] block">Expected Calibration Error (ECE)</span>
          <p className="text-[#A1A1A1] leading-relaxed text-[11px]">
            Lower is better. Model 4 achieves an ECE of <span className="font-mono text-[#10B981]">0.042</span> vs Model 1's <span className="font-mono text-[#EF4444]">0.091</span>, demonstrating that multimodal fusion substantially tames miscalibration.
          </p>
        </div>
      </div>

      {/* Interactive Calibration Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: SVG Calibration Curve */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#F5F5F5]">Calibration Plot (Reliability Diagram)</h3>
              <p className="text-xs text-[#A1A1A1]">Predicted Risk Probability vs Observed Event Fraction (10 decile bins)</p>
            </div>
          </div>

          {/* SVG Diagram */}
          <div className="w-full max-w-md mx-auto aspect-square relative p-2 bg-[#080808] border border-[#262626] rounded-xl">
            <svg viewBox="0 0 360 360" className="w-full h-full overflow-visible">
              {/* Axes & Grids */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((step, i) => {
                const pos = 40 + step * 280;
                return (
                  <g key={i}>
                    <line x1="40" y1={pos} x2="320" y2={pos} stroke="#1a1a1a" strokeDasharray="2 2" />
                    <line x1={pos} y1="40" x2={pos} y2="320" stroke="#1a1a1a" strokeDasharray="2 2" />
                    {/* Y label */}
                    <text x="32" y={40 + (1 - step) * 280 + 3} fill="#737373" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
                      {(step * 100).toFixed(0)}%
                    </text>
                    {/* X label */}
                    <text x={pos} y="336" fill="#737373" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">
                      {(step * 100).toFixed(0)}%
                    </text>
                  </g>
                );
              })}

              {/* Perfect Calibration Diagonal Line */}
              <line x1="40" y1="320" x2="320" y2="40" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="1.5" />
              <text x="180" y="170" fill="#3B82F6" fontSize="9" transform="rotate(-45 180 170)" fontFamily="JetBrains Mono">
                Perfect Calibration (y = x)
              </text>

              {/* Model 1 Curve (Overestimating in mid-risk) */}
              <path
                d="M 40 320 L 70 300 L 110 270 L 150 240 L 190 190 L 230 150 L 270 120 L 320 80"
                fill="none"
                stroke="#737373"
                strokeWidth="1.5"
                opacity={selectedModelId === 'model_1' ? '1' : '0.4'}
              />

              {/* Model 4 Curve (Closely hugging diagonal) */}
              <path
                d="M 40 320 L 68 292 L 105 256 L 145 214 L 182 178 L 222 138 L 260 100 L 320 44"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                opacity={selectedModelId === 'model_4' ? '1' : '0.5'}
              />

              {/* Data points for Model 4 */}
              {[
                { x: 68, y: 292 },
                { x: 105, y: 256 },
                { x: 145, y: 214 },
                { x: 182, y: 178 },
                { x: 222, y: 138 },
                { x: 260, y: 100 },
                { x: 320, y: 44 },
              ].map((pt, idx) => (
                <circle key={idx} cx={pt.x} cy={pt.y} r="3.5" fill="#10B981" stroke="#080808" strokeWidth="1.5" />
              ))}
            </svg>

            <div className="text-center text-[10px] text-[#A1A1A1] font-mono mt-3">
              Predicted Probability Decile Bin (%)
            </div>
          </div>
        </div>

        {/* Right: Model Selection & Metric Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-4">
          <div className="border-b border-[#262626] pb-3">
            <h4 className="text-sm font-bold text-[#F5F5F5]">Calibration Benchmark Inspection</h4>
            <p className="text-xs text-[#A1A1A1]">Select a model architecture to inspect calibration stability:</p>
          </div>

          <div className="space-y-2">
            {RESEARCH_MODELS_BENCHMARK.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModelId(m.id)}
                className={`w-full p-3 rounded-lg text-left transition-all border flex items-center justify-between ${
                  selectedModelId === m.id
                    ? 'bg-[#181818] border-[#3B82F6]'
                    : 'bg-[#121212] border-[#262626] hover:border-[#3B82F6]/30'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-[#F5F5F5]">{m.name}</span>
                    <span className="text-[10px] font-mono text-[#737373]">{m.code}</span>
                  </div>
                  <span className="text-[11px] text-[#A1A1A1]">Brier Score: {m.brierScore}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#737373] block">ECE</span>
                  <span className="font-mono text-xs font-bold text-[#3B82F6]">{m.ece}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Model Assessment */}
          <div className="p-4 rounded-lg bg-[#181818] border border-[#262626] space-y-2 text-xs">
            <span className="font-semibold text-[#F5F5F5] block">
              Analysis for {activeModel.name}:
            </span>
            <p className="text-[#A1A1A1] leading-relaxed text-[11px]">
              Achieves Brier score of <span className="font-mono text-[#F5F5F5]">{activeModel.brierScore}</span> with an Expected Calibration Error of <span className="font-mono text-[#10B981]">{activeModel.ece}</span>.
            </p>
            <p className="text-[#737373] text-[10px] leading-relaxed">
              In clinical deployment, Platt scaling or Isotonic Regression can be trained on validation folds to further minimize residual bias in high-density parenchymal cohorts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
