/**
 * Research Domain Types for Multimodal Breast Cancer Risk Stratification
 * 3rd-Year Engineering Research Prototype
 */

export type PageId =
  | 'home'
  | 'assessment'
  | 'results'
  | 'experiments'
  | 'missing-info'
  | 'model-comparison'
  | 'calibration'
  | 'false-negatives'
  | 'explainability'
  | 'methodology'
  | 'architecture'
  | 'findings'
  | 'about';

export type RiskCategory = 'Low' | 'Moderate' | 'Higher';

export interface ClinicalFeatures {
  age: number;
  familyHistoryBreastCancer: 'none' | 'first_degree' | 'second_degree' | 'multiple_relatives';
  priorBreastBiopsy: 'none' | 'benign' | 'atypical_hyperplasia' | 'lcis';
  ageAtMenarche: number;
  ageAtFirstBirth: 'nulliparous' | 'under_20' | '20_29' | '30_or_older';
  menopausalStatus: 'premenopausal' | 'perimenopausal' | 'postmenopausal';
  breastDensityCategory: 'almost_entirely_fatty' | 'scattered_fibroglandular' | 'heterogeneously_dense' | 'extremely_dense';
  hormoneReplacementTherapy: 'never' | 'past' | 'current';
  bmi: number;
}

export type VariantStatus = 'negative' | 'positive' | 'variant_uncertain' | 'untested';

export interface GeneticFeatures {
  testingPerformed: boolean;
  brca1: VariantStatus;
  brca2: VariantStatus;
  palb2: VariantStatus;
  tp53: VariantStatus;
  chek2: VariantStatus;
  atm: VariantStatus;
  pten: VariantStatus;
  polygenicRiskScorePercentile?: number;
}

export interface MammogramData {
  imageUploaded: boolean;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  viewType: 'CC' | 'MLO' | 'Both';
  breastLaterality: 'Left' | 'Right' | 'Bilateral';
  presetSampleId?: string;
  demoImageFeatures?: {
    tissueDensityPattern: string;
    calcificationScore: number;
    structuralAsymmetryIndex: number;
    radiologicalQualityScore: number;
  };
}

export interface AssessmentInput {
  clinical: ClinicalFeatures;
  genetic: GeneticFeatures;
  mammogram: MammogramData;
}

export interface FeatureContribution {
  feature: string;
  modality: 'Clinical' | 'Genetic' | 'Mammogram';
  direction: 'increases_risk' | 'decreases_risk';
  shapValue: number; // positive increases risk, negative decreases risk
  relativeImpactPercent: number;
  description: string;
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  estimatedRiskPercent: number;
  riskCategory: RiskCategory;
  fiveYearRiskPercent: number;
  lifetimeRiskPercent: number;
  modalitiesUsed: {
    clinical: boolean;
    genetic: boolean;
    mammogram: boolean;
  };
  missingModalities: string[];
  completenessCount: number; // e.g. 2
  completenessTotal: number; // 3
  modelVersion: string;
  isDemoMode: boolean;
  confidenceInterval: [number, number];
  featureContributions: FeatureContribution[];
  modalityWeights: {
    clinical: number;
    mammogram: number;
    genetic: number;
  };
  reliabilityNotice: string;
}

export interface ModelPerformanceMetric {
  id: 'model_1_clinical' | 'model_2_mammogram' | 'model_3_clinical_mammogram' | 'model_4_multimodal_all';
  name: string;
  code: string;
  modalities: string[];
  description: string;
  auc: number;
  sensitivity: number;
  specificity: number;
  accuracy: number;
  f1Score: number;
  falseNegatives: number;
  falsePositives: number;
  totalPositiveCases: number;
  totalNegativeCases: number;
  brierScore: number;
  ece: number; // Expected Calibration Error
  connectedStatus: 'connected' | 'demo_benchmark' | 'unconnected';
}

export interface MissingInfoExperimentItem {
  id: 'test_a' | 'test_b' | 'test_c' | 'test_d';
  title: string;
  condition: string;
  includedModalities: string[];
  missingModalities: string[];
  auc: number;
  sensitivity: number;
  specificity: number;
  falseNegatives: number;
  falseNegativeRate: number;
  calibrationError: number;
  performanceRetention: number; // e.g. 100%, 94%, 82%, 71%
}

export interface CalibrationCurvePoint {
  bin: number; // 1 to 10
  predictedRiskDecile: number; // e.g. 0.05, 0.15, ...
  observedOutcomeRate: number;
  confidenceLow: number;
  confidenceHigh: number;
  sampleCount: number;
}

export interface ResearchFindingItem {
  id: number;
  question: string;
  findingSummary: string;
  evidence: string;
  implication: string;
  quantitativeDelta: string;
  status: 'supported_by_data' | 'partial_evidence' | 'inconclusive';
}
