import React, { useState } from 'react';
import {
  AlertTriangle,
  RotateCcw,
  Sliders,
  ChevronRight,
  Sparkles,
  Download,
  TrendingDown
} from 'lucide-react';
import { PredictionResult, PageId } from '../../types';

interface PredictionResultViewProps {
  result: PredictionResult | null;
  onNewAssessment: () => void;
  onNavigate: (page: PageId) => void;
}

export const PredictionResultView: React.FC<PredictionResultViewProps> = ({
  result,
  onNewAssessment,
  onNavigate,
}) => {
  const [exported, setExported] = useState(false);

  if (!result) {
    return (
      <div id="no-prediction-placeholder" className="max-w-xl mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#121212] border border-[#262626] flex items-center justify-center text-[#737373] mx-auto">
          <Sliders className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#F5F5F5]">No Active Prediction Found</h3>
        <p className="text-xs text-[#A1A1A1] max-w-sm mx-auto leading-relaxed">
          Please run a multimodal assessment to generate an estimated research risk score, category, and feature attribution.
        </p>
        <button
          onClick={onNewAssessment}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F5F5F5] text-xs font-semibold transition-colors"
        >
          <span>Start Risk Assessment</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Visual color for risk category
  const getCategoryTheme = (cat: PredictionResult['riskCategory']) => {
    switch (cat) {
      case 'Low':
        return {
          textColor: 'text-emerald-400',
          bgSubtle: 'bg-emerald-500/10',
          borderSubtle: 'border-emerald-500/30',
          barColor: 'bg-emerald-500',
          barShadow: 'shadow-[0_0_8px_rgba(16,185,129,0.5)]',
          label: 'Low Risk',
          rangeNote: '< 10.0% estimated 5-year risk',
        };
      case 'Moderate':
        return {
          textColor: 'text-amber-500',
          bgSubtle: 'bg-amber-500/10',
          borderSubtle: 'border-amber-500/30',
          barColor: 'bg-amber-500',
          barShadow: 'shadow-[0_0_8px_rgba(245,158,11,0.5)]',
          label: 'Moderate Risk',
          rangeNote: '10.0% – 19.9% estimated 5-year risk',
        };
      case 'Higher':
      default:
        return {
          textColor: 'text-red-400',
          bgSubtle: 'bg-red-500/10',
          borderSubtle: 'border-red-500/30',
          barColor: 'bg-red-500',
          barShadow: 'shadow-[0_0_8px_rgba(239,68,68,0.5)]',
          label: 'Higher Risk',
          rangeNote: '≥ 20.0% estimated 5-year risk',
        };
    }
  };

  const theme = getCategoryTheme(result.riskCategory);
  const isComplete = result.completenessCount === result.completenessTotal;

  const handleExportFindings = () => {
    const summary = {
      project: 'Breast Cancer Multimodal AI Reliability Study',
      estimated5YearRisk: `${result.estimatedRiskPercent.toFixed(1)}%`,
      riskCategory: result.riskCategory,
      confidenceInterval: `[${result.confidenceInterval[0]}% – ${result.confidenceInterval[1]}%]`,
      completeness: `${result.completenessCount}/${result.completenessTotal}`,
      modalitiesUsed: result.modalitiesUsed,
      featureContributions: result.featureContributions,
      generatedAt: new Date().toISOString(),
      disclaimer: 'Academic research prototype. Non-diagnostic.',
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bcr-research-findings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div id="prediction-results-view" className="max-w-6xl mx-auto space-y-6">
      {/* Sleek Top Header Summary Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#262626]">
        <div>
          <h2 className="text-2xl font-semibold mb-1 text-[#F5F5F5] tracking-tight">
            Research Prediction Summary
          </h2>
          <p className="text-[#A1A1A1] text-sm italic">
            Evaluating multimodal reliability under partial availability.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-left sm:text-right">
            <div className="text-[10px] text-[#737373] uppercase tracking-widest font-mono">
              Data Status
            </div>
            <div
              className={`text-sm font-medium ${
                isComplete ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {isComplete ? 'Complete (3/3)' : `Incomplete (${result.completenessCount}/${result.completenessTotal})`}
            </div>
          </div>

          <button
            id="export-findings-btn"
            onClick={handleExportFindings}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-[0_0_10px_rgba(59,130,246,0.35)] flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{exported ? 'Exported!' : 'Export Findings'}</span>
          </button>

          <button
            id="new-assessment-btn"
            onClick={onNewAssessment}
            className="bg-[#181818] hover:bg-[#262626] border border-[#262626] text-[#F5F5F5] px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5"
            title="Start new assessment"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Assessment</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 4-col left, 8-col right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (col-span-4 / col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 1: Estimated Research Risk Display */}
          <div className="bg-[#121212] border border-[#262626] rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#181818] rounded text-[9px] text-[#737373] border border-[#262626] font-mono">
              DEMO DATA
            </div>

            <span className="text-[#737373] text-xs uppercase tracking-widest mb-3 font-mono">
              Estimated Research Risk
            </span>

            <div className="text-6xl font-bold text-[#F5F5F5] mb-2 font-mono tracking-tight">
              {result.estimatedRiskPercent.toFixed(1)}%
            </div>

            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest font-mono ${theme.textColor} ${theme.bgSubtle} border ${theme.borderSubtle}`}
            >
              {theme.label}
            </div>

            {/* Glowing horizontal progress indicator */}
            <div className="mt-6 w-full h-1.5 bg-[#262626] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${theme.barColor} ${theme.barShadow}`}
                style={{ width: `${Math.min(Math.max(result.estimatedRiskPercent, 4), 100)}%` }}
              />
            </div>

            {/* Sub-projections: 5-Year & Lifetime */}
            <div className="w-full mt-6 pt-4 border-t border-[#262626] grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-[#181818] border border-[#262626]">
                <span className="text-[10px] text-[#737373] uppercase tracking-widest block font-mono">
                  5-Year Est.
                </span>
                <span className="text-base font-bold font-mono text-[#F5F5F5] mt-0.5 block">
                  {result.fiveYearRiskPercent}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#181818] border border-[#262626]">
                <span className="text-[10px] text-[#737373] uppercase tracking-widest block font-mono">
                  Lifetime Est.
                </span>
                <span className="text-base font-bold font-mono text-[#F5F5F5] mt-0.5 block">
                  {result.lifetimeRiskPercent}%
                </span>
              </div>
            </div>

            <div className="mt-4 text-[10px] text-[#737373] leading-relaxed font-mono">
              95% Credible Interval:{' '}
              <span className="text-[#A1A1A1]">
                [{result.confidenceInterval[0]}% – {result.confidenceInterval[1]}%]
              </span>
            </div>
          </div>

          {/* Card 2: Modality Status with Sleek Glowing Indicators */}
          <div className="bg-[#121212] border border-[#262626] rounded-xl p-5">
            <h3 className="text-xs font-semibold text-[#737373] uppercase tracking-widest mb-4">
              Modality Status
            </h3>

            <div className="space-y-4">
              {/* Clinical */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-sm text-[#F5F5F5]">Clinical Info</span>
                </div>
                <span className="text-xs text-[#737373] uppercase font-mono tracking-wider">
                  Available ({result.modalityWeights.clinical}%)
                </span>
              </div>

              {/* Mammogram */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {result.modalitiesUsed.mammogram ? (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  )}
                  <span
                    className={`text-sm ${
                      result.modalitiesUsed.mammogram ? 'text-[#F5F5F5]' : 'text-[#A1A1A1]'
                    }`}
                  >
                    Mammogram
                  </span>
                </div>
                <span
                  className={`text-xs uppercase font-mono tracking-wider ${
                    result.modalitiesUsed.mammogram ? 'text-[#737373]' : 'text-red-400'
                  }`}
                >
                  {result.modalitiesUsed.mammogram
                    ? `Available (${result.modalityWeights.mammogram}%)`
                    : 'Missing'}
                </span>
              </div>

              {/* Genetics */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {result.modalitiesUsed.genetic ? (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  )}
                  <span
                    className={`text-sm ${
                      result.modalitiesUsed.genetic ? 'text-[#F5F5F5]' : 'text-[#A1A1A1]'
                    }`}
                  >
                    Genetic Info
                  </span>
                </div>
                <span
                  className={`text-xs uppercase font-mono tracking-wider ${
                    result.modalitiesUsed.genetic ? 'text-[#737373]' : 'text-red-400'
                  }`}
                >
                  {result.modalitiesUsed.genetic
                    ? `Available (${result.modalityWeights.genetic}%)`
                    : 'Missing'}
                </span>
              </div>
            </div>

            {/* Missing Info Warning */}
            {result.missingModalities.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[#262626] space-y-1 text-xs">
                <div className="flex items-center space-x-1.5 text-amber-500 font-semibold text-[11px]">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Missing Modality Condition Active</span>
                </div>
                <p className="text-[#737373] text-[10px] leading-relaxed">
                  Absent features trigger learned missingness mask tokens and wider epistemic uncertainty intervals.
                </p>
              </div>
            )}
          </div>

          {/* Safety Notice in Result */}
          <div className="p-3.5 rounded-xl bg-[#121212] border border-amber-500/20 flex items-start space-x-2.5 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#A1A1A1] leading-relaxed">
              <strong className="text-[#F5F5F5]">Ethical Safeguard:</strong> This prediction is an estimated research probability generated by deep neural networks. It does not diagnose disease or replace physician counsel.
            </p>
          </div>
        </div>

        {/* Right Column (col-span-8 / col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Card 1: Feature Influence (Explainability / SHAP Values) */}
          <div className="bg-[#121212] border border-[#262626] rounded-xl p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-semibold text-[#737373] uppercase tracking-widest">
                Feature Influence (Explainability)
              </h3>
              <span className="text-[10px] text-amber-500 font-medium px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20 font-mono">
                SHAP Values
              </span>
            </div>

            <div className="space-y-5">
              {result.featureContributions.slice(0, 5).map((item, idx) => {
                const isIncrease = item.direction === 'increases_risk';
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A1A1A1] font-medium">{item.feature}</span>
                      <span
                        className={`font-mono font-semibold ${
                          isIncrease ? 'text-[#3B82F6]' : 'text-emerald-500'
                        }`}
                      >
                        {isIncrease ? '+' : ''}
                        {item.shapValue.toFixed(2)}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-[#181818] rounded-full overflow-hidden flex">
                      {isIncrease ? (
                        <div
                          className="h-full bg-[#3B82F6] rounded-full shadow-[0_0_6px_rgba(59,130,246,0.5)] transition-all duration-700"
                          style={{ width: `${Math.min(Math.max(item.relativeImpactPercent, 15), 90)}%` }}
                        />
                      ) : (
                        <div className="w-full h-full flex justify-end">
                          <div
                            className="h-full bg-emerald-500 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)] transition-all duration-700"
                            style={{ width: `${Math.min(Math.max(item.relativeImpactPercent, 15), 90)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="mt-8 pt-4 border-t border-[#262626] text-[11px] text-[#737373] leading-relaxed">
                Model explanations show which input features influenced the prediction. They do not establish medical causation.
              </div>
            </div>
          </div>

          {/* Card 2: 3 Sleek Metric Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#181818] border border-[#262626] rounded-xl p-4">
              <div className="text-[10px] text-[#737373] uppercase tracking-widest mb-1 font-mono">
                Model AUC
              </div>
              <div className="text-xl font-bold font-mono text-[#F5F5F5]">
                {result.modalitiesUsed.mammogram && result.modalitiesUsed.genetic
                  ? '0.826'
                  : result.modalitiesUsed.mammogram
                  ? '0.798'
                  : '0.684'}
              </div>
            </div>

            <div className="bg-[#181818] border border-[#262626] rounded-xl p-4">
              <div className="text-[10px] text-[#737373] uppercase tracking-widest mb-1 font-mono">
                Sensitivity
              </div>
              <div className="text-xl font-bold font-mono text-[#F5F5F5]">
                {result.modalitiesUsed.mammogram && result.modalitiesUsed.genetic
                  ? '81.2%'
                  : result.modalitiesUsed.mammogram
                  ? '76.8%'
                  : '63.8%'}
              </div>
            </div>

            <div className="bg-[#181818] border border-[#262626] rounded-xl p-4">
              <div className="text-[10px] text-[#737373] uppercase tracking-widest mb-1 font-mono">
                False Neg Rate
              </div>
              <div className="text-xl font-bold font-mono text-red-500/80">
                {result.modalitiesUsed.mammogram && result.modalitiesUsed.genetic
                  ? '18.8%'
                  : result.modalitiesUsed.mammogram
                  ? '23.2%'
                  : '36.2%'}
              </div>
            </div>
          </div>

          {/* Card 3: Direct Link to Research Experiments */}
          <div className="p-4 rounded-xl bg-[#121212] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-[#F5F5F5] block">
                Compare Across 1,500 Validation Cohort Cases
              </span>
              <p className="text-[11px] text-[#737373]">
                Investigate discrimination curves, calibration degradation, and false-negative trade-offs.
              </p>
            </div>
            <button
              onClick={() => onNavigate('experiments')}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md bg-[#181818] hover:bg-[#262626] text-[#F5F5F5] border border-[#262626] text-xs font-medium transition-colors shrink-0 self-start sm:self-auto"
            >
              <span>View Experiments</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

