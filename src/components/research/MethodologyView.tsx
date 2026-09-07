import React from 'react';
import { Database, FileText, Layers, ShieldCheck, CheckCircle2, Split } from 'lucide-react';
import { RESEARCH_DATASET_INFO } from '../../data/researchBenchmark';
import { PageId } from '../../types';

interface MethodologyViewProps {
  onNavigate: (page: PageId) => void;
}

export const MethodologyView: React.FC<MethodologyViewProps> = ({ onNavigate }) => {
  return (
    <div id="methodology-view" className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626]">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6] mb-1">
          <Database className="w-4 h-4" />
          <span>SCIENTIFIC RIGOR & PROTOCOLS</span>
        </div>
        <h2 className="text-xl font-bold text-[#F5F5F5]">Dataset & Research Methodology</h2>
        <p className="text-xs text-[#A1A1A1] mt-1 max-w-2xl leading-relaxed">
          Experimental design, cohort inclusion criteria, cross-validation partitions, and missingness simulation protocols.
        </p>
      </div>

      {/* Cohort Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#262626]">
          <span className="text-[10px] font-mono text-[#737373] uppercase block">Total Evaluation Cohort</span>
          <span className="text-2xl font-bold font-mono text-[#F5F5F5]">{RESEARCH_DATASET_INFO.cohortSize.toLocaleString()}</span>
          <span className="text-[11px] text-[#A1A1A1] block mt-1">Multi-institutional subjects</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#262626]">
          <span className="text-[10px] font-mono text-[#EF4444] uppercase block">Biopsy-Confirmed Positive</span>
          <span className="text-2xl font-bold font-mono text-[#EF4444]">{RESEARCH_DATASET_INFO.positiveCases}</span>
          <span className="text-[11px] text-[#737373] block mt-1">Malignancy histology verified</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#262626]">
          <span className="text-[10px] font-mono text-[#10B981] uppercase block">Screening-Negative Controls</span>
          <span className="text-2xl font-bold font-mono text-[#10B981]">{RESEARCH_DATASET_INFO.negativeControls}</span>
          <span className="text-[11px] text-[#737373] block mt-1">&ge;2-year disease-free follow-up</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#262626]">
          <span className="text-[10px] font-mono text-[#3B82F6] uppercase block">Validation Partitions</span>
          <span className="text-2xl font-bold font-mono text-[#3B82F6]">{RESEARCH_DATASET_INFO.validationStrategy}</span>
          <span className="text-[11px] text-[#737373] block mt-1">Stratified patient-level splits</span>
        </div>
      </div>

      {/* Cross-Validation & Split Flow */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-4">
        <h3 className="text-sm font-bold text-[#F5F5F5] flex items-center space-x-2">
          <Split className="w-4 h-4 text-[#3B82F6]" />
          <span>Patient-Level Partitioning & Leakage Prevention</span>
        </h3>
        <p className="text-xs text-[#A1A1A1] leading-relaxed">
          To prevent data leakage, all splits (Train: 70%, Validation: 15%, Holdout Test: 15%) are partitioned at the unique patient identifier level. Multiple views (CC / MLO) of the same patient never span across train and test folds.
        </p>

        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
          <div className="p-3 rounded bg-[#121212] border border-[#262626]">
            <span className="font-mono font-bold text-[#F5F5F5] block">70% Training</span>
            <span className="text-[10px] text-[#737373]">1,050 Subjects</span>
          </div>
          <div className="p-3 rounded bg-[#121212] border border-[#262626]">
            <span className="font-mono font-bold text-[#3B82F6] block">15% Validation</span>
            <span className="text-[10px] text-[#737373]">225 Subjects</span>
          </div>
          <div className="p-3 rounded bg-[#121212] border border-[#262626]">
            <span className="font-mono font-bold text-[#10B981] block">15% Holdout Test</span>
            <span className="text-[10px] text-[#737373]">225 Subjects</span>
          </div>
        </div>
      </div>

      {/* Natural Missingness vs Simulated Missingness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-3">
          <h4 className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wider">
            Natural Missingness in Real Cohorts
          </h4>
          <p className="text-xs text-[#A1A1A1] leading-relaxed">
            In non-research hospital registries:
          </p>
          <ul className="space-y-2 text-xs text-[#737373]">
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
              <span><strong>Clinical Data:</strong> Available for &gt;95% of patients presenting to primary clinics.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 shrink-0" />
              <span><strong>Mammograms:</strong> Available for ~65% of screened women in eligible age brackets.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
              <span><strong>Genomic Sequencing:</strong> Available for &lt;7% due to strict insurance and genetic counseling criteria.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-3">
          <h4 className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wider">
            Ethical Framework & De-identification
          </h4>
          <p className="text-xs text-[#A1A1A1] leading-relaxed">
            All imaging DICOM headers and tabular records have been stripped of 18 HIPAA Safe Harbor identifiers. Pixel coordinates containing burning patient metadata have been cropped or masked prior to embedding extraction.
          </p>
          <div className="p-3 rounded bg-[#121212] border border-[#262626] flex items-center space-x-2 text-[11px] text-[#10B981]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>IRB Exemption Category 4 (Secondary Research with De-identified Data)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
