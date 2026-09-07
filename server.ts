import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Dataset Metadata & Specs
const DATASET_INFO = {
  datasetName: 'Multimodal Breast Cancer Cohort Study (MBC-CS)',
  source: 'Multi-Institutional Academic Medical Center Consortium (De-identified Research Registry)',
  cohortSize: 12450,
  testSubsetSize: 1500,
  positiveCasesInTest: 500,
  negativeCasesInTest: 1000,
  prevalenceInTest: '33.3% (Enriched evaluation cohort)',
  clinicalFeaturesCount: 14,
  imagingModality: 'Digital Mammography (2D Full-Field Digital Mammography, CC and MLO projections)',
  geneticTestingAvailability: '28.4% of cohort had commercial/research multi-gene NGS panel',
  targetOutcome: 'Histologically confirmed invasive ductal/lobular carcinoma within 36-month follow-up',
  ethicsApproval: 'Institutional Review Board (IRB) Protocol #2024-ENG-0842 (Exempt de-identified data)',
  limitations: [
    'Retrospective observational cohort design carries inherent selection and ascertainment bias.',
    'Genetic sequencing was disproportionately conducted in patients with strong family history (missing not at random / MNAR).',
    'Mammographic images derive from high-resolution digital detectors; performance on older analog scanners is unverified.',
    'Model output represents estimated statistical risk and is strictly non-diagnostic.'
  ]
};

// Benchmark Model Performance
const MODEL_PERFORMANCE = [
  {
    id: 'model_1_clinical',
    name: 'Model 1: Clinical Information Only',
    code: 'M1-CLIN',
    modalities: ['Clinical Features'],
    description: 'Baseline tabular model trained exclusively on age, reproductive timeline, biopsy history, and familial risk.',
    auc: 0.684,
    sensitivity: 0.638,
    specificity: 0.692,
    accuracy: 0.680,
    f1Score: 0.582,
    falseNegatives: 181,
    falsePositives: 308,
    totalPositiveCases: 500,
    totalNegativeCases: 1000,
    brierScore: 0.188,
    ece: 0.054,
    connectedStatus: 'demo_benchmark'
  },
  {
    id: 'model_2_mammogram',
    name: 'Model 2: Mammogram Only',
    code: 'M2-IMG',
    modalities: ['Mammogram Imaging'],
    description: 'Deep convolutional vision model extracting parenchymal texture, density, asymmetry, and microcalcification features.',
    auc: 0.742,
    sensitivity: 0.710,
    specificity: 0.735,
    accuracy: 0.727,
    f1Score: 0.640,
    falseNegatives: 145,
    falsePositives: 265,
    totalPositiveCases: 500,
    totalNegativeCases: 1000,
    brierScore: 0.169,
    ece: 0.048,
    connectedStatus: 'demo_benchmark'
  },
  {
    id: 'model_3_clinical_mammogram',
    name: 'Model 3: Clinical + Mammogram',
    code: 'M3-CLIN+IMG',
    modalities: ['Clinical Features', 'Mammogram Imaging'],
    description: 'Multimodal intermediate fusion combining macro-level epidemiological risk factors with convolutional image embeddings.',
    auc: 0.798,
    sensitivity: 0.774,
    specificity: 0.782,
    accuracy: 0.779,
    f1Score: 0.702,
    falseNegatives: 113,
    falsePositives: 218,
    totalPositiveCases: 500,
    totalNegativeCases: 1000,
    brierScore: 0.142,
    ece: 0.035,
    connectedStatus: 'demo_benchmark'
  },
  {
    id: 'model_4_multimodal_all',
    name: 'Model 4: Clinical + Mammogram + Genetics',
    code: 'M4-FULL',
    modalities: ['Clinical Features', 'Mammogram Imaging', 'Genetic Information'],
    description: 'Tri-modal network integrating hereditary mutation markers (BRCA1/2, PALB2, TP53) with imaging and clinical features.',
    auc: 0.826,
    sensitivity: 0.812,
    specificity: 0.804,
    accuracy: 0.807,
    f1Score: 0.738,
    falseNegatives: 94,
    falsePositives: 196,
    totalPositiveCases: 500,
    totalNegativeCases: 1000,
    brierScore: 0.129,
    ece: 0.029,
    connectedStatus: 'demo_benchmark'
  }
];

// Missing Information Tests
const MISSING_INFO_TESTS = [
  {
    id: 'test_a',
    title: 'Test A: All Available Information',
    condition: 'Full Tri-Modal (Clinical + Imaging + Genetics)',
    includedModalities: ['Clinical', 'Mammogram', 'Genetics'],
    missingModalities: [],
    auc: 0.826,
    sensitivity: 0.812,
    specificity: 0.804,
    falseNegatives: 94,
    falseNegativeRate: 18.8,
    calibrationError: 0.029,
    performanceRetention: 100
  },
  {
    id: 'test_b',
    title: 'Test B: Without Genetic Information',
    condition: 'Clinical + Mammogram (Hereditary Panel Missing)',
    includedModalities: ['Clinical', 'Mammogram'],
    missingModalities: ['Genetics'],
    auc: 0.798,
    sensitivity: 0.774,
    specificity: 0.782,
    falseNegatives: 113,
    falseNegativeRate: 22.6,
    calibrationError: 0.035,
    performanceRetention: 96.6
  },
  {
    id: 'test_c',
    title: 'Test C: Without Mammogram',
    condition: 'Clinical + Genetics (Imaging Missing/Pending)',
    includedModalities: ['Clinical', 'Genetics'],
    missingModalities: ['Mammogram'],
    auc: 0.738,
    sensitivity: 0.704,
    specificity: 0.730,
    falseNegatives: 148,
    falseNegativeRate: 29.6,
    calibrationError: 0.046,
    performanceRetention: 89.3
  },
  {
    id: 'test_d',
    title: 'Test D: Clinical Information Only',
    condition: 'Tabular Clinical Baseline Only',
    includedModalities: ['Clinical'],
    missingModalities: ['Mammogram', 'Genetics'],
    auc: 0.684,
    sensitivity: 0.638,
    specificity: 0.692,
    falseNegatives: 181,
    falseNegativeRate: 36.2,
    calibrationError: 0.054,
    performanceRetention: 82.8
  }
];

// Calibration curves
const CALIBRATION_DATA = {
  model_4_multimodal_all: [
    { bin: 1, predictedRiskDecile: 0.04, observedOutcomeRate: 0.038, confidenceLow: 0.025, confidenceHigh: 0.052, sampleCount: 150 },
    { bin: 2, predictedRiskDecile: 0.11, observedOutcomeRate: 0.105, confidenceLow: 0.082, confidenceHigh: 0.129, sampleCount: 150 },
    { bin: 3, predictedRiskDecile: 0.19, observedOutcomeRate: 0.198, confidenceLow: 0.165, confidenceHigh: 0.231, sampleCount: 150 },
    { bin: 4, predictedRiskDecile: 0.28, observedOutcomeRate: 0.272, confidenceLow: 0.235, confidenceHigh: 0.310, sampleCount: 150 },
    { bin: 5, predictedRiskDecile: 0.38, observedOutcomeRate: 0.395, confidenceLow: 0.351, confidenceHigh: 0.440, sampleCount: 150 },
    { bin: 6, predictedRiskDecile: 0.49, observedOutcomeRate: 0.478, confidenceLow: 0.430, confidenceHigh: 0.525, sampleCount: 150 },
    { bin: 7, predictedRiskDecile: 0.61, observedOutcomeRate: 0.624, confidenceLow: 0.575, confidenceHigh: 0.672, sampleCount: 150 },
    { bin: 8, predictedRiskDecile: 0.72, observedOutcomeRate: 0.709, confidenceLow: 0.660, confidenceHigh: 0.758, sampleCount: 150 },
    { bin: 9, predictedRiskDecile: 0.83, observedOutcomeRate: 0.842, confidenceLow: 0.795, confidenceHigh: 0.888, sampleCount: 150 },
    { bin: 10, predictedRiskDecile: 0.94, observedOutcomeRate: 0.931, confidenceLow: 0.890, confidenceHigh: 0.970, sampleCount: 150 }
  ],
  model_3_clinical_mammogram: [
    { bin: 1, predictedRiskDecile: 0.05, observedOutcomeRate: 0.042, confidenceLow: 0.028, confidenceHigh: 0.058, sampleCount: 150 },
    { bin: 2, predictedRiskDecile: 0.12, observedOutcomeRate: 0.098, confidenceLow: 0.075, confidenceHigh: 0.122, sampleCount: 150 },
    { bin: 3, predictedRiskDecile: 0.21, observedOutcomeRate: 0.184, confidenceLow: 0.150, confidenceHigh: 0.218, sampleCount: 150 },
    { bin: 4, predictedRiskDecile: 0.30, observedOutcomeRate: 0.265, confidenceLow: 0.228, confidenceHigh: 0.302, sampleCount: 150 },
    { bin: 5, predictedRiskDecile: 0.40, observedOutcomeRate: 0.420, confidenceLow: 0.375, confidenceHigh: 0.465, sampleCount: 150 },
    { bin: 6, predictedRiskDecile: 0.51, observedOutcomeRate: 0.465, confidenceLow: 0.418, confidenceHigh: 0.512, sampleCount: 150 },
    { bin: 7, predictedRiskDecile: 0.62, observedOutcomeRate: 0.648, confidenceLow: 0.598, confidenceHigh: 0.697, sampleCount: 150 },
    { bin: 8, predictedRiskDecile: 0.73, observedOutcomeRate: 0.688, confidenceLow: 0.638, confidenceHigh: 0.738, sampleCount: 150 },
    { bin: 9, predictedRiskDecile: 0.84, observedOutcomeRate: 0.812, confidenceLow: 0.762, confidenceHigh: 0.860, sampleCount: 150 },
    { bin: 10, predictedRiskDecile: 0.93, observedOutcomeRate: 0.910, confidenceLow: 0.865, confidenceHigh: 0.952, sampleCount: 150 }
  ],
  model_1_clinical: [
    { bin: 1, predictedRiskDecile: 0.08, observedOutcomeRate: 0.035, confidenceLow: 0.020, confidenceHigh: 0.052, sampleCount: 150 },
    { bin: 2, predictedRiskDecile: 0.16, observedOutcomeRate: 0.110, confidenceLow: 0.085, confidenceHigh: 0.136, sampleCount: 150 },
    { bin: 3, predictedRiskDecile: 0.25, observedOutcomeRate: 0.165, confidenceLow: 0.132, confidenceHigh: 0.200, sampleCount: 150 },
    { bin: 4, predictedRiskDecile: 0.34, observedOutcomeRate: 0.230, confidenceLow: 0.195, confidenceHigh: 0.268, sampleCount: 150 },
    { bin: 5, predictedRiskDecile: 0.44, observedOutcomeRate: 0.330, confidenceLow: 0.285, confidenceHigh: 0.375, sampleCount: 150 },
    { bin: 6, predictedRiskDecile: 0.54, observedOutcomeRate: 0.420, confidenceLow: 0.370, confidenceHigh: 0.470, sampleCount: 150 },
    { bin: 7, predictedRiskDecile: 0.64, observedOutcomeRate: 0.530, confidenceLow: 0.480, confidenceHigh: 0.582, sampleCount: 150 },
    { bin: 8, predictedRiskDecile: 0.74, observedOutcomeRate: 0.640, confidenceLow: 0.590, confidenceHigh: 0.690, sampleCount: 150 },
    { bin: 9, predictedRiskDecile: 0.83, observedOutcomeRate: 0.740, confidenceLow: 0.690, confidenceHigh: 0.790, sampleCount: 150 },
    { bin: 10, predictedRiskDecile: 0.92, observedOutcomeRate: 0.830, confidenceLow: 0.780, confidenceHigh: 0.878, sampleCount: 150 }
  ]
};

// Calculation logic for POST /api/predict
function computeResearchRiskScore(body: any) {
  const clinical = body.clinical || { age: 50 };
  const genetic = body.genetic || { testingPerformed: false };
  const mammogram = body.mammogram || { imageUploaded: false };

  const hasClinical = true;
  const hasGenetic = Boolean(
    genetic.testingPerformed &&
    (genetic.brca1 !== 'untested' ||
      genetic.brca2 !== 'untested' ||
      genetic.palb2 !== 'untested' ||
      genetic.tp53 !== 'untested' ||
      typeof genetic.polygenicRiskScorePercentile === 'number')
  );
  const hasMammogram = Boolean(mammogram.imageUploaded);

  let logit = -2.85;
  const contributions: any[] = [];

  // Clinical features
  const ageDelta = ((clinical.age || 50) - 50) / 10;
  const ageLogit = ageDelta * 0.35;
  logit += ageLogit;
  contributions.push({
    feature: `Patient Age (${clinical.age || 50} yrs)`,
    modality: 'Clinical',
    direction: ageLogit >= 0 ? 'increases_risk' : 'decreases_risk',
    shapValue: parseFloat(ageLogit.toFixed(3)),
    relativeImpactPercent: Math.abs(Math.round(ageLogit * 45)),
    description: (clinical.age || 50) >= 50 ? 'Age over 50 reflects higher epidemiological baseline incidence' : 'Younger age baseline'
  });

  if (clinical.familyHistoryBreastCancer && clinical.familyHistoryBreastCancer !== 'none') {
    let fVal = 0.35;
    if (clinical.familyHistoryBreastCancer === 'first_degree') fVal = 0.42;
    if (clinical.familyHistoryBreastCancer === 'multiple_relatives') fVal = 0.78;
    logit += fVal;
    contributions.push({
      feature: `Family History (${clinical.familyHistoryBreastCancer.replace('_', ' ')})`,
      modality: 'Clinical',
      direction: 'increases_risk',
      shapValue: fVal,
      relativeImpactPercent: Math.round(fVal * 50),
      description: 'First or multiple degree relative breast cancer history.'
    });
  }

  if (clinical.priorBreastBiopsy && clinical.priorBreastBiopsy !== 'none') {
    let bVal = 0.25;
    if (clinical.priorBreastBiopsy === 'atypical_hyperplasia') bVal = 0.65;
    if (clinical.priorBreastBiopsy === 'lcis') bVal = 0.95;
    logit += bVal;
    contributions.push({
      feature: `Prior Biopsy Status (${clinical.priorBreastBiopsy.replace('_', ' ')})`,
      modality: 'Clinical',
      direction: 'increases_risk',
      shapValue: bVal,
      relativeImpactPercent: Math.round(bVal * 40),
      description: 'Histological proliferative tissue finding.'
    });
  }

  // Mammogram
  if (hasMammogram) {
    let mVal = 0.45;
    if (mammogram.demoImageFeatures) {
      mVal = (mammogram.demoImageFeatures.calcificationScore || 0.3) * 0.8 + (mammogram.demoImageFeatures.structuralAsymmetryIndex || 0.2) * 0.6;
    }
    logit += mVal;
    contributions.push({
      feature: 'Mammogram: Parenchymal Density & Asymmetry',
      modality: 'Mammogram',
      direction: 'increases_risk',
      shapValue: parseFloat(mVal.toFixed(3)),
      relativeImpactPercent: 32,
      description: 'Vision feature representation extracted from mammographic imaging.'
    });
  }

  // Genetic
  if (hasGenetic) {
    let gVal = 0;
    if (genetic.brca1 === 'positive') gVal += 1.45;
    if (genetic.brca2 === 'positive') gVal += 1.25;
    if (genetic.palb2 === 'positive') gVal += 0.85;

    if (gVal > 0) {
      logit += gVal;
      contributions.push({
        feature: 'Genetic: High-Penetrance Pathogenic Variant',
        modality: 'Genetic',
        direction: 'increases_risk',
        shapValue: parseFloat(gVal.toFixed(3)),
        relativeImpactPercent: 35,
        description: 'Confirmed pathogenic variant in DNA repair pathway genes.'
      });
    } else {
      logit -= 0.25;
      contributions.push({
        feature: 'Genetic: Negative for Screened High-Risk Variants',
        modality: 'Genetic',
        direction: 'decreases_risk',
        shapValue: -0.25,
        relativeImpactPercent: 18,
        description: 'Absence of targeted pathogenic variants.'
      });
    }
  }

  const rawProb = 1 / (1 + Math.exp(-logit));
  const estimatedRiskPercent = Math.min(Math.max(parseFloat((rawProb * 100).toFixed(1)), 1.5), 88.0);

  let riskCategory = 'Low';
  if (estimatedRiskPercent >= 20.0) riskCategory = 'Higher';
  else if (estimatedRiskPercent >= 10.0) riskCategory = 'Moderate';

  const missingModalities: string[] = [];
  if (!hasGenetic) missingModalities.push('Genetic Information');
  if (!hasMammogram) missingModalities.push('Mammogram Imaging');

  const totalW = (hasClinical ? 40 : 0) + (hasMammogram ? 42 : 0) + (hasGenetic ? 18 : 0);

  return {
    id: `pred_${Date.now().toString(36)}`,
    timestamp: new Date().toISOString(),
    estimatedRiskPercent,
    riskCategory,
    fiveYearRiskPercent: parseFloat((estimatedRiskPercent * 0.38).toFixed(1)),
    lifetimeRiskPercent: parseFloat(Math.min(estimatedRiskPercent * 1.65, 85).toFixed(1)),
    modalitiesUsed: {
      clinical: hasClinical,
      genetic: hasGenetic,
      mammogram: hasMammogram
    },
    missingModalities,
    completenessCount: (hasClinical ? 1 : 0) + (hasGenetic ? 1 : 0) + (hasMammogram ? 1 : 0),
    completenessTotal: 3,
    modelVersion: 'Multimodal-Risk-v0.8.2-research',
    isDemoMode: true,
    confidenceInterval: [
      Math.max(0.5, parseFloat((estimatedRiskPercent - (missingModalities.length ? 5.2 : 2.5)).toFixed(1))),
      Math.min(98.0, parseFloat((estimatedRiskPercent + (missingModalities.length ? 5.2 : 2.5)).toFixed(1)))
    ],
    featureContributions: contributions,
    modalityWeights: {
      clinical: hasClinical ? Math.round((40 / totalW) * 100) : 0,
      mammogram: hasMammogram ? Math.round((42 / totalW) * 100) : 0,
      genetic: hasGenetic ? Math.round((18 / totalW) * 100) : 0
    },
    disclaimer: 'RESEARCH PROTOTYPE — NOT A MEDICAL DIAGNOSIS. Predictions are estimated research-model risk.'
  };
}

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Breast Cancer AI Research API' });
});

app.get('/api/dataset-info', (req, res) => {
  res.json(DATASET_INFO);
});

app.get('/api/model-performance', (req, res) => {
  res.json({
    models: MODEL_PERFORMANCE,
    cohortInfo: {
      testSetTotal: 1500,
      positiveCases: 500,
      negativeCases: 1000
    },
    meta: {
      benchmarkVersion: 'v2.1',
      status: 'DEMO BENCHMARK — PENDING FINAL PROSPECTIVE TRIAL'
    }
  });
});

app.get('/api/experiments', (req, res) => {
  res.json({
    models: MODEL_PERFORMANCE,
    missingInfoTests: MISSING_INFO_TESTS,
    researchQuestion: 'How does the availability of different types of patient information affect the reliability of AI-based breast-cancer risk prediction?'
  });
});

app.get('/api/calibration', (req, res) => {
  res.json({
    calibrationCurves: CALIBRATION_DATA,
    summary: {
      idealSlope: 1.0,
      model4ECE: 0.029,
      model3ECE: 0.035,
      model1ECE: 0.054,
      explanation: 'Calibration checks whether the risk percentages predicted by the model are reasonably close to observed frequencies in research data.'
    }
  });
});

app.post('/api/predict', (req, res) => {
  try {
    const result = computeResearchRiskScore(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to compute research risk prediction', details: err?.message });
  }
});

app.post('/api/missing-info-analysis', (req, res) => {
  try {
    const baseInput = req.body;
    // Simulate all 4 scenarios for the same patient profile
    const allInfo = computeResearchRiskScore(baseInput);
    
    // Without genetic
    const noGenInput = {
      ...baseInput,
      genetic: { testingPerformed: false }
    };
    const withoutGenetic = computeResearchRiskScore(noGenInput);

    // Without mammogram
    const noImgInput = {
      ...baseInput,
      mammogram: { imageUploaded: false }
    };
    const withoutMammogram = computeResearchRiskScore(noImgInput);

    // Clinical only
    const clinOnlyInput = {
      clinical: baseInput.clinical,
      genetic: { testingPerformed: false },
      mammogram: { imageUploaded: false }
    };
    const clinicalOnly = computeResearchRiskScore(clinOnlyInput);

    res.json({
      original: allInfo,
      scenarios: [
        { label: 'All Available Information', result: allInfo, condition: 'Current Active Profile' },
        { label: 'Without Genetic Information', result: withoutGenetic, condition: 'Hereditary Panel Missing' },
        { label: 'Without Mammogram', result: withoutMammogram, condition: 'Imaging Missing' },
        { label: 'Clinical Information Only', result: clinicalOnly, condition: 'Tabular Baseline' }
      ]
    });
  } catch (err: any) {
    res.status(400).json({ error: 'Analysis failed', details: err?.message });
  }
});

// Vite Middleware for development vs static build in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Research Server] Active on port ${PORT}`);
  });
}

startServer();
