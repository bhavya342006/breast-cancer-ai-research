import React, { useState, useRef } from 'react';
import {
  FileCheck2,
  Dna,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UploadCloud,
  Trash2,
  Eye,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Check,
  Sparkles,
  Info
} from 'lucide-react';
import { AssessmentInput, ClinicalFeatures, GeneticFeatures, MammogramData, VariantStatus } from '../../types';
import { PRESET_MAMMOGRAM_SAMPLES } from '../../data/researchBenchmark';

interface RiskAssessmentWizardProps {
  initialInput: AssessmentInput;
  onSubmit: (input: AssessmentInput) => void;
  isSubmitting: boolean;
}

export const RiskAssessmentWizard: React.FC<RiskAssessmentWizardProps> = ({
  initialInput,
  onSubmit,
  isSubmitting,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<AssessmentInput>(initialInput);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper updates
  const updateClinical = <K extends keyof ClinicalFeatures>(field: K, value: ClinicalFeatures[K]) => {
    setFormData((prev) => ({
      ...prev,
      clinical: { ...prev.clinical, [field]: value },
    }));
  };

  const updateGenetic = <K extends keyof GeneticFeatures>(field: K, value: GeneticFeatures[K]) => {
    setFormData((prev) => ({
      ...prev,
      genetic: { ...prev.genetic, [field]: value },
    }));
  };

  const updateMammogram = (patch: Partial<MammogramData>) => {
    setFormData((prev) => ({
      ...prev,
      mammogram: { ...prev.mammogram, ...patch },
    }));
  };

  // Image Upload handler
  const handleFileUpload = (file: File) => {
    setUploadError(null);
    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validExtensions.includes(file.type)) {
      setUploadError('Invalid format. Please upload a JPG, JPEG, or PNG image.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File size exceeds 15MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateMammogram({
        imageUploaded: true,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileUrl: reader.result as string,
        presetSampleId: undefined,
        demoImageFeatures: {
          tissueDensityPattern: 'Extracted digital parenchymal pattern',
          calcificationScore: 0.35,
          structuralAsymmetryIndex: 0.28,
          radiologicalQualityScore: 0.92,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPresetSample = (sampleId: string) => {
    const sample = PRESET_MAMMOGRAM_SAMPLES.find((s) => s.id === sampleId);
    if (!sample) return;
    updateMammogram({
      imageUploaded: true,
      fileName: sample.fileName,
      fileSize: sample.fileSize,
      fileUrl: undefined,
      viewType: sample.view,
      breastLaterality: sample.laterality,
      presetSampleId: sample.id,
      demoImageFeatures: sample.features,
    });
  };

  const handleRemoveImage = () => {
    updateMammogram({
      imageUploaded: false,
      fileName: undefined,
      fileSize: undefined,
      fileUrl: undefined,
      presetSampleId: undefined,
      demoImageFeatures: undefined,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Availability calculation
  const hasClinical = true;
  const hasGenetic = formData.genetic.testingPerformed && (
    formData.genetic.brca1 !== 'untested' ||
    formData.genetic.brca2 !== 'untested' ||
    formData.genetic.palb2 !== 'untested' ||
    formData.genetic.tp53 !== 'untested' ||
    formData.genetic.chek2 !== 'untested' ||
    formData.genetic.atm !== 'untested' ||
    formData.genetic.pten !== 'untested' ||
    typeof formData.genetic.polygenicRiskScorePercentile === 'number'
  );
  const hasMammogram = formData.mammogram.imageUploaded;
  const completenessCount = (hasClinical ? 1 : 0) + (hasGenetic ? 1 : 0) + (hasMammogram ? 1 : 0);

  const STEPS = [
    { num: 1, label: 'Clinical Information', icon: FileCheck2 },
    { num: 2, label: 'Genetic Information', icon: Dna },
    { num: 3, label: 'Mammogram', icon: ImageIcon },
    { num: 4, label: 'Information Review', icon: Sliders },
    { num: 5, label: 'Research Prediction', icon: Sparkles },
  ];

  return (
    <div id="assessment-wizard-container" className="max-w-4xl mx-auto space-y-6">
      {/* Step Progress Indicator */}
      <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#262626]">
        <div className="flex items-center justify-between overflow-x-auto pb-2 sm:pb-0 gap-2">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <button
                key={step.num}
                id={`wizard-step-tab-${step.num}`}
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-[#181818] text-[#3B82F6] border border-[#3B82F6]/40'
                    : isDone
                    ? 'text-[#F5F5F5] hover:bg-[#121212]'
                    : 'text-[#737373] hover:text-[#A1A1A1]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono ${
                    isDone
                      ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30'
                      : isCurrent
                      ? 'bg-[#3B82F6] text-[#F5F5F5]'
                      : 'bg-[#181818] text-[#737373] border border-[#262626]'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3" /> : step.num}
                </div>
                <span className="hidden md:inline">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 rounded-xl bg-[#0D0D0D] border border-[#262626] min-h-[460px] flex flex-col justify-between">
        {/* STEP 1: CLINICAL INFORMATION */}
        {currentStep === 1 && (
          <div id="step-1-clinical-container" className="space-y-6">
            <div className="border-b border-[#262626] pb-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6] mb-1">
                <span>STEP 1 OF 5</span>
                <span>•</span>
                <span>REQUIRED MODALITY</span>
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5]">Clinical & Epidemiological Features</h3>
              <p className="text-xs text-[#A1A1A1]">
                Baseline clinical variables derived from standard risk assessment frameworks (Gail / BCRAT / Tyrer-Cuzick models). No PII is collected.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Age */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F5F5F5] flex items-center justify-between">
                  <span>Patient Age (Years)</span>
                  <span className="font-mono text-[#3B82F6] text-[11px]">{formData.clinical.age} yrs</span>
                </label>
                <input
                  id="clinical-age-input"
                  type="number"
                  min="25"
                  max="90"
                  value={formData.clinical.age}
                  onChange={(e) => updateClinical('age', Math.max(25, Math.min(90, parseInt(e.target.value) || 50)))}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#262626] rounded-md text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                />
                <span className="text-[10px] text-[#737373]">Eligible research cohort: 25 – 90</span>
              </div>

              {/* Family History */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F5F5F5]">Family History of Breast Cancer</label>
                <select
                  id="clinical-family-history-select"
                  value={formData.clinical.familyHistoryBreastCancer}
                  onChange={(e) => updateClinical('familyHistoryBreastCancer', e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#262626] rounded-md text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="none">None documented</option>
                  <option value="first_degree">1 First-degree relative (mother/sister/daughter)</option>
                  <option value="second_degree">1 Second-degree relative (aunt/grandmother)</option>
                  <option value="multiple_relatives">Multiple affected relatives (&ge;2)</option>
                </select>
                <span className="text-[10px] text-[#737373]">Consanguineous lineage documentation</span>
              </div>

              {/* Prior Biopsy */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F5F5F5]">Prior Breast Biopsies</label>
                <select
                  id="clinical-biopsy-select"
                  value={formData.clinical.priorBreastBiopsy}
                  onChange={(e) => updateClinical('priorBreastBiopsy', e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#262626] rounded-md text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="none">No prior biopsies</option>
                  <option value="benign">Prior biopsy: Benign lesion</option>
                  <option value="atypical_hyperplasia">Prior biopsy: Atypical Hyperplasia (ADH/ALH)</option>
                  <option value="lcis">Prior biopsy: LCIS (Lobular Carcinoma In Situ)</option>
                </select>
                <span className="text-[10px] text-[#737373]">Histological proliferation status</span>
              </div>

              {/* Breast Density Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F5F5F5]">Clinical Breast Density (BI-RADS)</label>
                <select
                  id="clinical-density-select"
                  value={formData.clinical.breastDensityCategory}
                  onChange={(e) => updateClinical('breastDensityCategory', e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#262626] rounded-md text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="almost_entirely_fatty">Category A: Almost entirely fatty</option>
                  <option value="scattered_fibroglandular">Category B: Scattered fibroglandular densities</option>
                  <option value="heterogeneously_dense">Category C: Heterogeneously dense</option>
                  <option value="extremely_dense">Category D: Extremely dense</option>
                </select>
                <span className="text-[10px] text-[#737373]">Radiological density classification</span>
              </div>

              {/* Menopausal Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F5F5F5]">Menopausal Status</label>
                <select
                  id="clinical-menopausal-select"
                  value={formData.clinical.menopausalStatus}
                  onChange={(e) => updateClinical('menopausalStatus', e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#262626] rounded-md text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="premenopausal">Premenopausal</option>
                  <option value="perimenopausal">Perimenopausal</option>
                  <option value="postmenopausal">Postmenopausal</option>
                </select>
                <span className="text-[10px] text-[#737373]">Endocrine ovarian status</span>
              </div>

              {/* Age at Menarche */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F5F5F5] flex items-center justify-between">
                  <span>Age at Menarche</span>
                  <span className="font-mono text-[#A1A1A1] text-[11px]">{formData.clinical.ageAtMenarche} yrs</span>
                </label>
                <input
                  id="clinical-menarche-input"
                  type="number"
                  min="9"
                  max="18"
                  value={formData.clinical.ageAtMenarche}
                  onChange={(e) => updateClinical('ageAtMenarche', parseInt(e.target.value) || 12)}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#262626] rounded-md text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                />
                <span className="text-[10px] text-[#737373]">Typical range: 10 – 16</span>
              </div>

              {/* Age at First Live Birth */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F5F5F5]">Parity & Age at First Birth</label>
                <select
                  id="clinical-first-birth-select"
                  value={formData.clinical.ageAtFirstBirth}
                  onChange={(e) => updateClinical('ageAtFirstBirth', e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#262626] rounded-md text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="under_20">&lt; 20 years old</option>
                  <option value="20_29">20 – 29 years old</option>
                  <option value="30_or_older">&ge; 30 years old</option>
                  <option value="nulliparous">Nulliparous (No live births)</option>
                </select>
                <span className="text-[10px] text-[#737373]">Reproductive exposure timeline</span>
              </div>

              {/* Hormone Replacement Therapy */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F5F5F5]">Hormone Replacement Therapy (HRT)</label>
                <select
                  id="clinical-hrt-select"
                  value={formData.clinical.hormoneReplacementTherapy}
                  onChange={(e) => updateClinical('hormoneReplacementTherapy', e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#262626] rounded-md text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="never">Never used</option>
                  <option value="past">Past user (&gt;1 year discontinued)</option>
                  <option value="current">Current user (systemic estrogen/progestin)</option>
                </select>
                <span className="text-[10px] text-[#737373]">Exogenous hormonal exposure</span>
              </div>

              {/* BMI */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#F5F5F5] flex items-center justify-between">
                  <span>Body Mass Index (BMI)</span>
                  <span className="font-mono text-[#A1A1A1] text-[11px]">{formData.clinical.bmi} kg/m²</span>
                </label>
                <input
                  id="clinical-bmi-input"
                  type="number"
                  step="0.1"
                  min="16"
                  max="48"
                  value={formData.clinical.bmi}
                  onChange={(e) => updateClinical('bmi', parseFloat(e.target.value) || 24.5)}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#262626] rounded-md text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                />
                <span className="text-[10px] text-[#737373]">Standard range: 18.5 – 35</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: GENETIC INFORMATION */}
        {currentStep === 2 && (
          <div id="step-2-genetic-container" className="space-y-6">
            <div className="border-b border-[#262626] pb-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#F59E0B] mb-1">
                <span>STEP 2 OF 5</span>
                <span>•</span>
                <span className="bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">OPTIONAL MODALITY</span>
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5]">Genetic Information</h3>
              <p className="text-xs text-[#A1A1A1] mt-1 leading-relaxed">
                This section is for an existing genetic test or research-dataset information. The application does not perform DNA testing and does not collect biological samples.
              </p>
            </div>

            {/* Enable/Disable Genetic Testing Toggle */}
            <div className="p-4 rounded-lg bg-[#121212] border border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#F5F5F5] block">
                  Has multi-gene hereditary panel testing been conducted?
                </span>
                <p className="text-[11px] text-[#737373] mt-0.5">
                  If no clinical genetic test has been performed, leave disabled. The model will evaluate under missing-genetic conditions.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="genetic-performed-toggle"
                  type="checkbox"
                  checked={formData.genetic.testingPerformed}
                  onChange={(e) => updateGenetic('testingPerformed', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#262626] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
              </label>
            </div>

            {formData.genetic.testingPerformed ? (
              <div className="space-y-4">
                <div className="p-3 rounded-md bg-[#181818] border border-[#262626] text-[11px] text-[#A1A1A1] flex items-start space-x-2">
                  <Info className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span>
                    Mark variant status as reported on official CLIA/CAP certified genomic report. Pathogenic variants indicate susceptibility, not active cancer presence.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: 'brca1', label: 'BRCA1', desc: 'DNA repair / tumor suppressor' },
                    { key: 'brca2', label: 'BRCA2', desc: 'Homologous recombination' },
                    { key: 'palb2', label: 'PALB2', desc: 'Partner and localizer of BRCA2' },
                    { key: 'tp53', label: 'TP53', desc: 'Cell cycle checkpoint' },
                    { key: 'chek2', label: 'CHEK2', desc: 'Moderate penetrance kinase' },
                    { key: 'atm', label: 'ATM', desc: 'DNA double-strand break repair' },
                    { key: 'pten', label: 'PTEN', desc: 'Cowden syndrome locus' },
                  ].map((gene) => (
                    <div key={gene.key} className="p-3 rounded-md bg-[#121212] border border-[#262626]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-[#F5F5F5]">{gene.label}</span>
                        <span className="text-[10px] text-[#737373] font-mono">Variant</span>
                      </div>
                      <p className="text-[10px] text-[#737373] mb-2 truncate">{gene.desc}</p>
                      <select
                        id={`genetic-select-${gene.key}`}
                        value={formData.genetic[gene.key as keyof GeneticFeatures] as string}
                        onChange={(e) => updateGenetic(gene.key as any, e.target.value as VariantStatus)}
                        className="w-full px-2 py-1.5 bg-[#080808] border border-[#262626] rounded text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option value="untested">Untested</option>
                        <option value="negative">Negative (Wild Type)</option>
                        <option value="positive">Pathogenic / Likely Pathogenic</option>
                        <option value="variant_uncertain">VUS (Uncertain Significance)</option>
                      </select>
                    </div>
                  ))}

                  {/* Polygenic Risk Score */}
                  <div className="p-3 rounded-md bg-[#121212] border border-[#262626]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-[#F5F5F5]">Polygenic Score (PRS)</span>
                      <span className="text-[10px] text-[#737373] font-mono">Percentile</span>
                    </div>
                    <p className="text-[10px] text-[#737373] mb-2 truncate">GWAS common SNP composite</p>
                    <input
                      id="genetic-prs-input"
                      type="number"
                      placeholder="e.g. 68"
                      min="1"
                      max="99"
                      value={formData.genetic.polygenicRiskScorePercentile ?? ''}
                      onChange={(e) => updateGenetic('polygenicRiskScorePercentile', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-2 py-1.5 bg-[#080808] border border-[#262626] rounded text-xs text-[#F5F5F5] focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center rounded-lg bg-[#121212]/50 border border-dashed border-[#262626] space-y-2">
                <Dna className="w-8 h-8 text-[#737373] mx-auto opacity-50" />
                <p className="text-xs text-[#A1A1A1] font-medium">Genetic Information Flagged as Missing</p>
                <p className="text-[11px] text-[#737373] max-w-md mx-auto">
                  No genetic test data provided. The research framework will evaluate predictions under the "Without Genetics" condition (Test B / Model 3).
                </p>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: MAMMOGRAM UPLOAD */}
        {currentStep === 3 && (
          <div id="step-3-mammogram-container" className="space-y-6">
            <div className="border-b border-[#262626] pb-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#F59E0B] mb-1">
                <span>STEP 3 OF 5</span>
                <span>•</span>
                <span className="bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">OPTIONAL MODALITY</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#F5F5F5]">Mammogram Imaging Upload</h3>
                  <p className="text-xs text-[#A1A1A1]">
                    Digital mammographic views (CC or MLO projections). Formats: JPG, JPEG, PNG.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#181818] border border-[#262626] text-[10px] font-mono text-[#3B82F6] self-start sm:self-auto">
                  DEMO / RESEARCH MODE
                </span>
              </div>
            </div>

            {uploadError && (
              <div className="p-3 rounded-md bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {formData.mammogram.imageUploaded ? (
              /* Image Uploaded Preview Card */
              <div className="p-4 rounded-lg bg-[#121212] border border-[#262626] space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-lg bg-[#080808] border border-[#262626] flex items-center justify-center overflow-hidden shrink-0">
                      {formData.mammogram.fileUrl ? (
                        <img
                          src={formData.mammogram.fileUrl}
                          alt="Mammogram thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-7 h-7 text-[#3B82F6]" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#F5F5F5] block truncate max-w-xs sm:max-w-md">
                        {formData.mammogram.fileName || 'Uploaded Mammogram Image'}
                      </span>
                      <div className="flex items-center space-x-2 text-[11px] text-[#737373] mt-0.5 font-mono">
                        <span>{formData.mammogram.fileSize || 'Standard Matrix'}</span>
                        <span>•</span>
                        <span>View: {formData.mammogram.viewType}</span>
                        <span>•</span>
                        <span>Laterality: {formData.mammogram.breastLaterality}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    id="remove-mammogram-btn"
                    onClick={handleRemoveImage}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#181818] hover:bg-[#EF4444]/20 text-[#A1A1A1] hover:text-[#EF4444] border border-[#262626] hover:border-[#EF4444]/30 text-xs transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Image</span>
                  </button>
                </div>

                {/* Simulated radiological features */}
                {formData.mammogram.demoImageFeatures && (
                  <div className="p-3 rounded-md bg-[#080808] border border-[#1f1f1f] text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#A1A1A1] mb-2 font-mono">
                      <span>RAD-FEATURE EXTRACTION (DEMO VISION EMBEDDING)</span>
                      <span className="text-[#10B981]">Connected</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="text-[#737373]">
                        Parenchymal Pattern:{' '}
                        <span className="text-[#F5F5F5]">{formData.mammogram.demoImageFeatures.tissueDensityPattern}</span>
                      </div>
                      <div className="text-[#737373]">
                        Microcalcification Score:{' '}
                        <span className="text-[#F5F5F5] font-mono">
                          {formData.mammogram.demoImageFeatures.calcificationScore.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[#737373]">
                        Structural Asymmetry Index:{' '}
                        <span className="text-[#F5F5F5] font-mono">
                          {formData.mammogram.demoImageFeatures.structuralAsymmetryIndex.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[#737373]">
                        Image Quality Metric:{' '}
                        <span className="text-[#F5F5F5] font-mono">
                          {formData.mammogram.demoImageFeatures.radiologicalQualityScore.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Drag & Drop Area */
              <div
                id="mammogram-dropzone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="p-8 rounded-lg bg-[#121212]/40 border-2 border-dashed border-[#262626] hover:border-[#3B82F6]/50 text-center transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
                <UploadCloud className="w-10 h-10 text-[#3B82F6] mx-auto mb-3 opacity-80" />
                <h4 className="text-sm font-semibold text-[#F5F5F5] mb-1">Upload Mammogram Image</h4>
                <p className="text-xs text-[#A1A1A1] mb-3">
                  Drag and drop your DICOM/PNG/JPG image here, or{' '}
                  <span className="text-[#3B82F6] underline">browse files</span>
                </p>
                <p className="text-[10px] text-[#737373] font-mono">
                  Supported formats: JPG, JPEG, PNG (Max 15MB)
                </p>
              </div>
            )}

            {/* Research Sample Images for Instant Demonstration */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-[#A1A1A1] block">
                Or select an anonymized research cohort sample:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRESET_MAMMOGRAM_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    id={`select-sample-${sample.id}`}
                    onClick={() => handleSelectPresetSample(sample.id)}
                    className={`p-3 rounded-lg text-left transition-all border ${
                      formData.mammogram.presetSampleId === sample.id
                        ? 'bg-[#181818] border-[#3B82F6] ring-1 ring-[#3B82F6]'
                        : 'bg-[#121212] border-[#262626] hover:border-[#3B82F6]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-[#F5F5F5]">{sample.title}</span>
                      <span className="text-[9px] font-mono text-[#737373]">{sample.view}</span>
                    </div>
                    <p className="text-[11px] text-[#3B82F6] mb-1">{sample.category}</p>
                    <p className="text-[10px] text-[#737373] truncate">{sample.features.tissueDensityPattern}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: INFORMATION REVIEW */}
        {currentStep === 4 && (
          <div id="step-4-review-container" className="space-y-6">
            <div className="border-b border-[#262626] pb-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#3B82F6] mb-1">
                <span>STEP 4 OF 5</span>
                <span>•</span>
                <span>COMPLETENESS AUDIT</span>
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5]">Information Availability Audit</h3>
              <p className="text-xs text-[#A1A1A1]">
                Verification of active vs missing modalities prior to running research prediction.
              </p>
            </div>

            {/* Information Availability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Clinical */}
              <div className="p-4 rounded-lg bg-[#121212] border border-[#262626]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#F5F5F5]">Clinical Information</span>
                  <span className="inline-flex items-center space-x-1 text-[11px] text-[#10B981] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Available</span>
                  </span>
                </div>
                <div className="text-[11px] text-[#737373] space-y-1">
                  <div>Age: {formData.clinical.age} yrs</div>
                  <div>Family History: {formData.clinical.familyHistoryBreastCancer.replace('_', ' ')}</div>
                  <div>Biopsy: {formData.clinical.priorBreastBiopsy.replace('_', ' ')}</div>
                  <div>Density: {formData.clinical.breastDensityCategory.replace('_', ' ')}</div>
                </div>
              </div>

              {/* Genetic */}
              <div className="p-4 rounded-lg bg-[#121212] border border-[#262626]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#F5F5F5]">Genetic Information</span>
                  {hasGenetic ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] text-[#10B981] font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Available</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[11px] text-[#EF4444] font-mono">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Missing</span>
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#737373] space-y-1">
                  {hasGenetic ? (
                    <>
                      <div>Tested: Yes</div>
                      <div>BRCA1: {formData.genetic.brca1}</div>
                      <div>BRCA2: {formData.genetic.brca2}</div>
                      <div>PALB2: {formData.genetic.palb2}</div>
                    </>
                  ) : (
                    <div className="italic text-[#737373]">No hereditary genetic testing recorded</div>
                  )}
                </div>
              </div>

              {/* Mammogram */}
              <div className="p-4 rounded-lg bg-[#121212] border border-[#262626]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#F5F5F5]">Mammogram Imaging</span>
                  {hasMammogram ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] text-[#10B981] font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Available</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[11px] text-[#EF4444] font-mono">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Missing</span>
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#737373] space-y-1">
                  {hasMammogram ? (
                    <>
                      <div className="truncate">File: {formData.mammogram.fileName}</div>
                      <div>View: {formData.mammogram.viewType}</div>
                      <div>Texture analysis: Extracted</div>
                    </>
                  ) : (
                    <div className="italic text-[#737373]">No mammogram imaging uploaded</div>
                  )}
                </div>
              </div>
            </div>

            {/* Information Completeness Summary Box */}
            <div className="p-4 rounded-lg bg-[#181818] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-semibold text-[#F5F5F5]">Information Completeness</span>
                  <span className="text-xs font-mono font-bold text-[#3B82F6]">
                    {completenessCount} of 3 information sources available
                  </span>
                </div>
                <p className="text-xs text-[#A1A1A1] leading-relaxed">
                  The model will use only the information currently available.
                </p>
                <p className="text-[11px] text-[#737373] mt-1">
                  This section is critical because missing-information degradation is the central research inquiry of this project.
                </p>
              </div>

              {/* Visual Completeness Pills */}
              <div className="flex items-center space-x-1.5 shrink-0">
                <span className={`w-3 h-3 rounded-full ${hasClinical ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`} title="Clinical" />
                <span className={`w-3 h-3 rounded-full ${hasGenetic ? 'bg-[#10B981]' : 'bg-[#262626]'}`} title="Genetic" />
                <span className={`w-3 h-3 rounded-full ${hasMammogram ? 'bg-[#10B981]' : 'bg-[#262626]'}`} title="Mammogram" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: READY FOR PREDICTION */}
        {currentStep === 5 && (
          <div id="step-5-predict-container" className="space-y-6 text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-[#181818] border border-[#262626] flex items-center justify-center text-[#3B82F6] mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-xl font-bold text-[#F5F5F5]">Ready to Compute Research Prediction</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                The AI risk engine will compute estimated research risk, categorical classification, SHAP-style feature attributions, and evaluate uncertainty intervals based on {completenessCount} of 3 available modalities.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#121212] border border-[#262626] max-w-sm mx-auto text-left text-xs text-[#737373] space-y-1">
              <div className="flex justify-between">
                <span>Model Target:</span>
                <span className="font-mono text-[#F5F5F5]">Multimodal-Risk-v0.8.2</span>
              </div>
              <div className="flex justify-between">
                <span>Active Input Vectors:</span>
                <span className="font-mono text-[#F5F5F5]">{completenessCount} / 3 Modalities</span>
              </div>
              <div className="flex justify-between">
                <span>Execution Mode:</span>
                <span className="font-mono text-[#10B981]">Demo Research Engine</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="run-research-prediction-btn"
                onClick={() => onSubmit(formData)}
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-[#F5F5F5] font-semibold text-sm transition-colors shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Computing Research Risk...' : 'Run Research Prediction'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="pt-6 border-t border-[#262626] flex items-center justify-between mt-6">
          {currentStep > 1 ? (
            <button
              id="wizard-prev-btn"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-md bg-[#121212] hover:bg-[#181818] border border-[#262626] text-xs font-medium text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 && (
            <button
              id="wizard-next-btn"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md bg-[#3B82F6] hover:bg-[#2563EB] text-xs font-semibold text-[#F5F5F5] transition-colors"
            >
              <span>{currentStep === 4 ? 'Review & Predict' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
