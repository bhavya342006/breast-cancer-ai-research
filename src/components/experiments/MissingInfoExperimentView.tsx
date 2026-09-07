import React, { useState } from 'react';
import {
  FileQuestion,
  TrendingDown,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldAlert,
  Info,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { MISSING_INFO_EXPERIMENTS } from '../../data/researchBenchmark';
import { PageId } from '../../types';

interface MissingInfoExperimentViewProps {
  onNavigate: (page: PageId) => void;
}

export const MissingInfoExperimentView: React.FC<MissingInfoExperimentViewProps> = ({ onNavigate }) => {
  const [selectedTestId, setSelectedTestId] = useState<string>('test_b');

  const selectedTest = MISSING_INFO_EXPERIMENTS.find((t) => t.id === selectedTestId) || MISSING_INFO_EXPERIMENTS[0];

  return (
    <div id="missing-info-experiment-view" className="max-w-6xl mx-auto space-y-6">
      {/* Hero Headline / Main Research Question */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626]">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#F59E0B] mb-2">
          <FileQuestion className="w-4 h-4" />
          <span>CENTRAL RESEARCH QUESTION</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#F5F5F5] mb-2">
          “How does model reliability change when information is missing?”
        </h2>
        <p className="text-xs md:text-sm text-[#A1A1A1] max-w-3xl leading-relaxed">
          In clinical environments, complete tri-modal data (clinical, radiological, and genomic) is rarely available simultaneously. This experiment systematically evaluates predictive degradation when specific modalities are withheld.
        </p>
      </div>

      {/* 4 Missing-Information Test Conditions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MISSING_INFO_EXPERIMENTS.map((test) => {
          const isSelected = selectedTestId === test.id;
          return (
            <div
              key={test.id}
              onClick={() => setSelectedTestId(test.id)}
              className={`p-5 rounded-xl text-left cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-[#181818] border-[#3B82F6] ring-1 ring-[#3B82F6]'
                  : 'bg-[#0D0D0D] border-[#262626] hover:border-[#3B82F6]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded border border-[#3B82F6]/20">
                  {test.id.toUpperCase().replace('_', ' ')}
                </span>
                <span className="text-[11px] font-mono font-bold text-[#F5F5F5]">
                  {test.performanceRetention}% Retained
                </span>
              </div>

              <h3 className="text-xs font-bold text-[#F5F5F5] mb-1">{test.title}</h3>
              <p className="text-[11px] text-[#737373] mb-3 leading-snug">{test.condition}</p>

              <div className="space-y-1.5 text-xs pt-2 border-t border-[#262626]">
                <div className="flex justify-between">
                  <span className="text-[#737373]">AUC:</span>
                  <span className="font-mono font-semibold text-[#F5F5F5]">{test.auc.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Sensitivity:</span>
                  <span className="font-mono text-[#F5F5F5]">{(test.sensitivity * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">False Negatives:</span>
                  <span className="font-mono text-[#EF4444] font-semibold">{test.falseNegatives}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Calib. Error (ECE):</span>
                  <span className="font-mono text-[#3B82F6]">{test.calibrationError}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Degradation Analysis & Comparison Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Degradation Curve / Bar */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-6">
          <div className="border-b border-[#262626] pb-3">
            <h3 className="text-sm font-bold text-[#F5F5F5]">
              Predictive Performance Under Modality Ablation
            </h3>
            <p className="text-xs text-[#A1A1A1]">
              Comparing AUC and False-Negative surges as modalities are systematically removed.
            </p>
          </div>

          {/* Comparative SVG Bar Graph */}
          <div className="space-y-4">
            {MISSING_INFO_EXPERIMENTS.map((test) => {
              const deltaAUC = test.auc - 0.826; // Delta from Test A
              return (
                <div key={test.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F5F5F5]">{test.title}</span>
                    <div className="flex items-center space-x-2 font-mono">
                      <span className="text-[#F5F5F5]">AUC {test.auc.toFixed(3)}</span>
                      {deltaAUC < 0 && (
                        <span className="text-[#EF4444] text-[11px]">
                          ({deltaAUC.toFixed(3)})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full h-3 bg-[#181818] rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        test.id === 'test_a'
                          ? 'bg-[#10B981]'
                          : test.id === 'test_b'
                          ? 'bg-[#3B82F6]'
                          : test.id === 'test_c'
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#EF4444]'
                      }`}
                      style={{ width: `${test.performanceRetention}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#737373]">
                    <span>Missed Positive Cases: {test.falseNegatives} / 500</span>
                    <span>Retention: {test.performanceRetention}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Empirical Takeaway Box */}
          <div className="p-4 rounded-lg bg-[#121212] border border-[#262626] space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 text-[#F5F5F5] font-semibold">
              <TrendingDown className="w-4 h-4 text-[#F59E0B]" />
              <span>Key Empirical Finding: Asymmetric Degradation</span>
            </div>
            <p className="text-[#A1A1A1] leading-relaxed text-[11px]">
              Withholding <strong>genetic information</strong> (Test B) only drops AUC by <span className="text-[#F5F5F5] font-mono">-0.028</span> (96.6% retention).
              However, withholding <strong>mammogram imaging</strong> (Test C) causes a severe <span className="text-[#EF4444] font-mono">-0.088</span> AUC penalty and adds <strong>+54 false negatives</strong>.
            </p>
            <p className="text-[#737373] text-[10px]">
              Conclusion: Imaging carries substantially more variance in population-wide screening than genetic panel status, which is concentrated in high-risk mutation carriers.
            </p>
          </div>
        </div>

        {/* Right Column: Active Condition Detail */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#262626] pb-3">
              <span className="text-[10px] font-mono text-[#3B82F6] uppercase">Active Experiment Inspector</span>
              <h4 className="text-base font-bold text-[#F5F5F5] mt-1">{selectedTest.title}</h4>
              <p className="text-xs text-[#A1A1A1] mt-0.5">{selectedTest.condition}</p>
            </div>

            {/* Modality Status breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#F5F5F5] block">Modality Availability:</span>
              <div className="space-y-1.5">
                {['Clinical', 'Mammogram', 'Genetics'].map((mod) => {
                  const isPresent = selectedTest.includedModalities.includes(mod);
                  return (
                    <div
                      key={mod}
                      className="p-2 rounded bg-[#121212] border border-[#262626] flex items-center justify-between text-xs"
                    >
                      <span className="text-[#F5F5F5]">{mod} Modality</span>
                      {isPresent ? (
                        <span className="text-[#10B981] font-mono flex items-center space-x-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Included</span>
                        </span>
                      ) : (
                        <span className="text-[#EF4444] font-mono flex items-center space-x-1 text-[11px]">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Withheld (Missing)</span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Test Metrics Breakdown */}
            <div className="p-3 rounded-lg bg-[#181818] border border-[#262626] space-y-2 text-xs">
              <span className="text-[11px] font-mono text-[#737373] block uppercase">Validation Cohort Impact</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#737373] block">Sensitivity</span>
                  <span className="text-[#F5F5F5] font-mono font-semibold">{(selectedTest.sensitivity * 100).toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-[#737373] block">Specificity</span>
                  <span className="text-[#F5F5F5] font-mono font-semibold">{(selectedTest.specificity * 100).toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-[#737373] block">Missed Cases</span>
                  <span className="text-[#EF4444] font-mono font-semibold">{selectedTest.falseNegatives} / 500</span>
                </div>
                <div>
                  <span className="text-[#737373] block">False Negative Rate</span>
                  <span className="text-[#EF4444] font-mono font-semibold">{selectedTest.falseNegativeRate}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#262626]">
            <button
              onClick={() => onNavigate('model-comparison')}
              className="w-full py-2 bg-[#121212] hover:bg-[#181818] border border-[#262626] text-xs font-medium text-[#F5F5F5] rounded-md transition-colors flex items-center justify-center space-x-2"
            >
              <span>View Full ROC & Calibration Curves</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
