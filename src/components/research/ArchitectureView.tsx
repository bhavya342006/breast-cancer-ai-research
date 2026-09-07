import React from 'react';
import { Layers, Cpu, Dna, Image as ImageIcon, FileCheck2, ArrowDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageId } from '../../types';

interface ArchitectureViewProps {
  onNavigate: (page: PageId) => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ onNavigate }) => {
  return (
    <div id="architecture-view" className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626]">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6] mb-1">
          <Layers className="w-4 h-4" />
          <span>NEURAL PIPELINE SPECIFICATION</span>
        </div>
        <h2 className="text-xl font-bold text-[#F5F5F5]">Multimodal AI Architecture Flow</h2>
        <p className="text-xs text-[#A1A1A1] mt-1 max-w-2xl leading-relaxed">
          Modular late-fusion deep learning topology designed to ingest disparate modalities with graceful degradation under absent feature spaces.
        </p>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] space-y-8">
        {/* Layer 1: Input Modalities */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono text-[#737373] uppercase tracking-wider block">
            1. Heterogeneous Data Inputs
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#121212] border border-[#262626]">
              <div className="flex items-center space-x-2 text-[#10B981] font-semibold text-xs mb-1">
                <FileCheck2 className="w-4 h-4" />
                <span>Clinical Tabular</span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Age, parity, menarche, family history, biopsy histology, BI-RADS density category. (Vector dimension: 12)
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#121212] border border-[#262626]">
              <div className="flex items-center space-x-2 text-[#3B82F6] font-semibold text-xs mb-1">
                <ImageIcon className="w-4 h-4" />
                <span>Mammogram DICOM</span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Full-Field Digital Mammogram (FFDM) bilateral CC and MLO views. (Matrix: 2048 x 1536 x 1)
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#121212] border border-[#262626]">
              <div className="flex items-center space-x-2 text-[#F59E0B] font-semibold text-xs mb-1">
                <Dna className="w-4 h-4" />
                <span>Genomic Panel</span>
              </div>
              <p className="text-[11px] text-[#737373]">
                7 high/moderate penetrance genes + GWAS polygenic risk percentile. (Vector dimension: 8)
              </p>
            </div>
          </div>
        </div>

        {/* Down arrows */}
        <div className="flex justify-around text-[#737373]">
          <ArrowDown className="w-5 h-5" />
          <ArrowDown className="w-5 h-5" />
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Layer 2: Feature Encoders */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono text-[#737373] uppercase tracking-wider block">
            2. Dedicated Unimodal Encoders
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#181818] border border-[#262626]">
              <span className="text-xs font-bold text-[#F5F5F5] block mb-1">Tabular MLP Encoder</span>
              <p className="text-[11px] text-[#A1A1A1] leading-relaxed">
                3-layer MLP with LayerNorm, GELU, and Dropout (0.2). Outputs 64-dimensional clinical embedding vector.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#181818] border border-[#262626]">
              <span className="text-xs font-bold text-[#F5F5F5] block mb-1">DenseNet-121 Vision Backbone</span>
              <p className="text-[11px] text-[#A1A1A1] leading-relaxed">
                Pre-trained on ImageNet and fine-tuned on screening mammograms. Global average pooled to 128-dim embedding.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#181818] border border-[#262626]">
              <span className="text-xs font-bold text-[#F5F5F5] block mb-1">Genomic Embedding Network</span>
              <p className="text-[11px] text-[#A1A1A1] leading-relaxed">
                Learned categorical embeddings for variant pathogenicity states concatenated with PRS scalar. Outputs 32-dim vector.
              </p>
            </div>
          </div>
        </div>

        {/* Down arrows */}
        <div className="flex justify-center text-[#737373]">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Layer 3: Missingness Masking & Cross-Attention Fusion */}
        <div className="p-5 rounded-xl bg-[#121212] border border-[#3B82F6]/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider">
              3. Missingness Masking & Multi-Head Cross-Attention Fusion
            </span>
            <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
              Zero-Imputation Resilient
            </span>
          </div>
          <p className="text-xs text-[#A1A1A1] leading-relaxed">
            When a modality is missing, its input vector is substituted with a learnable <strong>[MISSING] token</strong> and an attention mask value of 0. This prevents the network from suffering from catastrophic out-of-distribution numerical failure when imaging or genetics are absent.
          </p>
        </div>

        {/* Down arrows */}
        <div className="flex justify-center text-[#737373]">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Layer 4: Output Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#181818] border border-[#262626] text-center">
            <span className="text-[10px] font-mono text-[#737373] uppercase block">Risk Probability</span>
            <span className="text-lg font-bold font-mono text-[#F5F5F5] mt-1 block">Sigmoid Logit (0–100%)</span>
            <span className="text-[10px] text-[#A1A1A1]">Calibrated 5-year event rate</span>
          </div>

          <div className="p-4 rounded-lg bg-[#181818] border border-[#262626] text-center">
            <span className="text-[10px] font-mono text-[#737373] uppercase block">Stratification</span>
            <span className="text-lg font-bold font-mono text-[#F5F5F5] mt-1 block">Low / Moderate / Higher</span>
            <span className="text-[10px] text-[#A1A1A1]">Cutoffs calibrated for clinical screening</span>
          </div>

          <div className="p-4 rounded-lg bg-[#181818] border border-[#262626] text-center">
            <span className="text-[10px] font-mono text-[#737373] uppercase block">Uncertainty</span>
            <span className="text-lg font-bold font-mono text-[#3B82F6] mt-1 block">95% Credible Interval</span>
            <span className="text-[10px] text-[#A1A1A1]">Quantified epistemic dispersion</span>
          </div>
        </div>
      </div>
    </div>
  );
};
