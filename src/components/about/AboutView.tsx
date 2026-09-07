import React from 'react';
import {
  Info,
  ShieldAlert,
  GraduationCap,
  Cpu,
  FileCheck2,
  Lock,
  HeartPulse,
  Terminal,
  ArrowRight
} from 'lucide-react';
import { PageId } from '../../types';

interface AboutViewProps {
  onNavigate: (page: PageId) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div id="about-view" className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626]">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6] mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>3RD-YEAR ENGINEERING CAPSTONE INVESTIGATION</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#F5F5F5] mb-2">
          Evaluating the Reliability of Multimodal AI for Breast Cancer Risk Stratification Under Missing-Information Conditions
        </h2>
        <p className="text-xs text-[#A1A1A1] max-w-3xl leading-relaxed">
          An engineering research platform built to examine how multimodal deep neural networks handle real-world clinical data incompleteness when combining clinical, imaging, and genomic features.
        </p>
      </div>

      {/* Strict Ethical & Non-Diagnostic Mandate Card */}
      <div className="p-6 rounded-xl bg-[#121212] border border-[#EF4444]/30 space-y-4">
        <div className="flex items-center space-x-2 text-[#EF4444]">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Strict Ethical Constraints & Non-Diagnostic Declaration
          </h3>
        </div>

        <p className="text-xs text-[#A1A1A1] leading-relaxed">
          This software application is strictly an academic research prototype. It is explicitly engineered for engineering evaluations of multimodal fusion reliability.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#080808] border border-[#262626] space-y-1">
            <span className="text-[#EF4444] font-semibold block text-[11px] uppercase">The platform does NOT:</span>
            <ul className="text-[#737373] space-y-1 text-[11px] list-disc list-inside">
              <li>Diagnose breast cancer or any illness</li>
              <li>Claim a person has or does not have cancer</li>
              <li>Guarantee someone will or will not develop cancer</li>
              <li>Recommend medications, surgeries, or therapies</li>
              <li>Replace licensed physicians or oncologists</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-[#080808] border border-[#262626] space-y-1">
            <span className="text-[#10B981] font-semibold block text-[11px] uppercase">The platform DOES:</span>
            <ul className="text-[#737373] space-y-1 text-[11px] list-disc list-inside">
              <li>Formally state every prediction as an estimated research risk</li>
              <li>Quantify performance drop when modalities are missing</li>
              <li>Report false-negative rates and calibration curves</li>
              <li>Provide transparent feature attribution (SHAP values)</li>
              <li>Protect privacy with zero collection of personal identifiable data</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Engineering Architecture Overview */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6]">
          <Cpu className="w-4 h-4" />
          <span>TECHNICAL IMPLEMENTATION STACK</span>
        </div>
        <h3 className="text-base font-bold text-[#F5F5F5]">Architecture & Technology Components</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-[#121212] border border-[#262626] space-y-1.5">
            <span className="font-semibold text-[#F5F5F5] block">Frontend Client Layer</span>
            <p className="text-[11px] text-[#737373] leading-relaxed">
              Built with React 18, TypeScript, Tailwind CSS, and Lucide icons. Implements a responsive dark scientific interface with accessible contrast.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#121212] border border-[#262626] space-y-1.5">
            <span className="font-semibold text-[#F5F5F5] block">Backend API Server</span>
            <p className="text-[11px] text-[#737373] leading-relaxed">
              Express REST server in TypeScript (`server.ts`), serving endpoints for predictions, dataset benchmarks, and experiment metrics.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#121212] border border-[#262626] space-y-1.5">
            <span className="font-semibold text-[#F5F5F5] block">Evaluation Engine</span>
            <p className="text-[11px] text-[#737373] leading-relaxed">
              Implements weighted late-fusion risk calculation, learned missingness compensation, and SHAP-based feature attribution.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Quick Links */}
      <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#262626] flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-[#737373]">
          Research Project Reference: ENG-CS-2026-BCR-082
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('home')}
            className="px-3 py-1.5 rounded-md bg-[#181818] hover:bg-[#262626] border border-[#262626] text-xs text-[#F5F5F5] transition-colors"
          >
            Home View
          </button>
          <button
            onClick={() => onNavigate('assessment')}
            className="px-3 py-1.5 rounded-md bg-[#3B82F6] hover:bg-[#2563EB] text-xs text-[#F5F5F5] font-semibold transition-colors flex items-center space-x-1"
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
