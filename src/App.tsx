import { useState } from "react";
import {
  Activity,
  BarChart3,
  Brain,
  Check,
  ChevronRight,
  CircleAlert,
  Database,
  FileImage,
  FlaskConical,
  Home,
  Info,
  Layers3,
  Menu,
  Microscope,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

type Page =
  | "home"
  | "assessment"
  | "results"
  | "experiments"
  | "missing"
  | "comparison"
  | "calibration"
  | "explainability"
  | "dataset"
  | "findings"
  | "about";

const navItems: { id: Page; label: string; icon: any }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "assessment", label: "Risk Assessment", icon: Activity },
  { id: "results", label: "Results", icon: BarChart3 },
  { id: "experiments", label: "Research Experiments", icon: FlaskConical },
  { id: "missing", label: "Missing Information", icon: Layers3 },
  { id: "comparison", label: "Model Comparison", icon: SlidersHorizontal },
  { id: "calibration", label: "Calibration", icon: Activity },
  { id: "explainability", label: "Explainability", icon: Brain },
  { id: "dataset", label: "Dataset & Methodology", icon: Database },
  { id: "findings", label: "Research Findings", icon: Microscope },
  { id: "about", label: "About", icon: Info },
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (next: Page) => {
    setPage(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Brain size={22} />
          </div>
          <div>
            <div className="brand-title">Breast Cancer AI</div>
            <div className="brand-subtitle">Research Platform</div>
          </div>
        </div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-item ${page === item.id ? "active" : ""}`}
                onClick={() => navigate(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="research-badge">
            <ShieldCheck size={17} />
            <div>
              <strong>Research Mode</strong>
              <span>Prototype</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu size={21} />
          </button>

          <div>
            <span className="topbar-label">ACADEMIC RESEARCH PROTOTYPE</span>
          </div>

          <div className="demo-pill">
            <span className="status-dot" />
            Demo / Research Mode
          </div>
        </header>

        <div className="content">
          {page === "home" && <HomePage navigate={navigate} />}
          {page === "assessment" && <AssessmentPage navigate={navigate} />}
          {page === "results" && <ResultsPage />}
          {page === "experiments" && <ExperimentsPage />}
          {page === "missing" && <MissingPage />}
          {page === "comparison" && <ComparisonPage />}
          {page === "calibration" && <CalibrationPage />}
          {page === "explainability" && <ExplainabilityPage />}
          {page === "dataset" && <DatasetPage />}
          {page === "findings" && <FindingsPage />}
          {page === "about" && <AboutPage />}
        </div>
      </main>
    </div>
  );
}

/* ---------------- HOME ---------------- */

function HomePage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={15} />
            Multimodal AI Research
          </div>

          <h1>
            Understanding the
            <span> reliability </span>
            of breast-cancer risk AI.
          </h1>

          <p>
            A research platform studying whether combining clinical, imaging,
            and genetic information can improve risk estimation — and what
            happens when some information is unavailable.
          </p>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => navigate("assessment")}
            >
              Start Assessment
              <ChevronRight size={17} />
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("experiments")}
            >
              View Research
            </button>
          </div>

          <div className="hero-note">
            <CircleAlert size={15} />
            Research prototype only. This system does not diagnose cancer.
          </div>
        </div>

        <div className="hero-visual">
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <div className="ai-card">
            <div className="ai-card-top">
              <span>AI RESEARCH MODEL</span>
              <Brain size={18} />
            </div>

            <div className="risk-number">12.4%</div>
            <div className="risk-label">Estimated research risk</div>

            <div className="risk-bar">
              <div />
            </div>

            <div className="ai-card-footer">
              <span>Model status</span>
              <strong>Demo</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">RESEARCH STRUCTURE</span>
            <h2>Three information sources. One research question.</h2>
          </div>
        </div>

        <div className="source-grid">
          <SourceCard
            number="01"
            icon={<Activity />}
            title="Clinical"
            description="Age, family history and other research features."
          />

          <SourceCard
            number="02"
            icon={<FileImage />}
            title="Mammogram"
            description="Medical imaging input when available."
          />

          <SourceCard
            number="03"
            icon={<Layers3 />}
            title="Genetic"
            description="Existing genetic-test or research-dataset information."
          />
        </div>
      </section>

      <section className="research-callout">
        <div>
          <span className="eyebrow">THE RESEARCH QUESTION</span>
          <h2>
            Does more information always make an AI model more reliable?
          </h2>
          <p>
            We compare different model configurations and deliberately remove
            information to study how performance changes.
          </p>
        </div>

        <button
          className="secondary-btn"
          onClick={() => navigate("comparison")}
        >
          Compare Models
          <ChevronRight size={17} />
        </button>
      </section>
    </>
  );
}

function SourceCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="source-card">
      <div className="source-number">{number}</div>
      <div className="source-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

/* ---------------- ASSESSMENT ---------------- */

function AssessmentPage({ navigate }: { navigate: (page: Page) => void }) {
  const [age, setAge] = useState("");
  const [familyHistory, setFamilyHistory] = useState("No");
  const [genetics, setGenetics] = useState(false);
  const [mammogram, setMammogram] = useState<File | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="RISK ASSESSMENT"
        title="Research assessment"
        description="Enter available research information. All fields are designed for demonstration and future ML integration."
      />

      <div className="stepper">
        <Step active number="1" label="Clinical" />
        <Step number="2" label="Genetic" />
        <Step number="3" label="Mammogram" />
        <Step number="4" label="Review" />
      </div>

      <div className="form-layout">
        <div className="form-main">
          <div className="panel">
            <PanelTitle
              number="01"
              title="Clinical information"
              description="Basic research features used by the model."
            />

            <div className="form-grid">
              <label>
                Age
                <input
                  type="number"
                  min="18"
                  max="100"
                  placeholder="e.g. 45"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label>
                Family history
                <select
                  value={familyHistory}
                  onChange={(e) => setFamilyHistory(e.target.value)}
                >
                  <option>No</option>
                  <option>Yes</option>
                  <option>Unknown</option>
                </select>
              </label>

              <label>
                Previous breast-related condition
                <select>
                  <option>No</option>
                  <option>Yes</option>
                  <option>Unknown</option>
                </select>
              </label>

              <label>
                Other research risk factor
                <select>
                  <option>Not available</option>
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                </select>
              </label>
            </div>
          </div>

          <div className="panel">
            <PanelTitle
              number="02"
              title="Genetic information"
              description="Optional. For an existing genetic test or research dataset."
            />

            <div className="optional-row">
              <div>
                <strong>Use genetic information</strong>
                <p>
                  The app does not perform DNA testing or collect biological
                  samples.
                </p>
              </div>

              <button
                className={`toggle ${genetics ? "on" : ""}`}
                onClick={() => setGenetics(!genetics)}
                aria-label="Toggle genetic information"
              >
                <span />
              </button>
            </div>

            {genetics && (
              <div className="gene-grid">
                {["BRCA1", "BRCA2", "PALB2", "TP53", "CHEK2", "ATM"].map(
                  (gene) => (
                    <label key={gene}>
                      {gene}
                      <select>
                        <option>Not available</option>
                        <option>No variant reported</option>
                        <option>Variant reported</option>
                      </select>
                    </label>
                  )
                )}
              </div>
            )}
          </div>

          <div className="panel">
            <PanelTitle
              number="03"
              title="Mammogram"
              description="Optional imaging input for the research model."
            />

            <label className="upload-box">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  setMammogram(e.target.files?.[0] || null)
                }
              />

              {mammogram ? (
                <>
                  <div className="upload-icon success">
                    <Check />
                  </div>
                  <strong>{mammogram.name}</strong>
                  <span>Image selected successfully</span>
                </>
              ) : (
                <>
                  <div className="upload-icon">
                    <Upload />
                  </div>
                  <strong>Upload mammogram</strong>
                  <span>JPG, JPEG or PNG</span>
                </>
              )}
            </label>

            <div className="demo-warning">
              <CircleAlert size={16} />
              <span>
                Mammogram AI is not connected yet. This interface is ready for
                future model integration.
              </span>
            </div>
          </div>
        </div>

        <aside className="assessment-side">
          <div className="panel sticky">
            <span className="eyebrow">INFORMATION STATUS</span>

            <div className="status-list">
              <StatusRow label="Clinical" available={!!age} />
              <StatusRow label="Genetic" available={genetics} />
              <StatusRow label="Mammogram" available={!!mammogram} />
            </div>

            <div className="completeness">
              <div>
                <span>Information completeness</span>
                <strong>
                  {[!!age, genetics, !!mammogram].filter(Boolean).length}/3
                </strong>
              </div>

              <div className="mini-progress">
                <div
                  style={{
                    width: `${
                      ([!!age, genetics, !!mammogram].filter(Boolean).length /
                        3) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <button
              className="primary-btn full"
              onClick={() => navigate("results")}
            >
              Run Research Prediction
              <ChevronRight size={17} />
            </button>

            <p className="tiny-note">
              Demo prediction only until the trained research model is
              connected.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Step({
  number,
  label,
  active = false,
}: {
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className={`step ${active ? "active" : ""}`}>
      <span>{number}</span>
      {label}
    </div>
  );
}

function StatusRow({
  label,
  available,
}: {
  label: string;
  available: boolean;
}) {
  return (
    <div className="status-row">
      <span>{label}</span>
      {available ? (
        <span className="available">
          <Check size={14} /> Available
        </span>
      ) : (
        <span className="missing">Missing</span>
      )}
    </div>
  );
}

/* ---------------- RESULTS ---------------- */

function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="RESEARCH RESULTS"
        title="Estimated research risk"
        description="This screen demonstrates how the final trained model can present its output."
      />

      <div className="results-grid">
        <div className="panel risk-panel">
          <div className="result-label">ESTIMATED RESEARCH RISK</div>

          <div className="big-risk">12.4%</div>

          <div className="risk-category">
            <span>MODERATE</span>
          </div>

          <p>
            This is an example research-model output. It is not a diagnosis
            and does not predict an individual's future with certainty.
          </p>

          <div className="result-divider" />

          <div className="used-information">
            <strong>Information used</strong>
            <div>
              <span className="chip positive">
                <Check size={13} /> Clinical
              </span>
              <span className="chip positive">
                <Check size={13} /> Mammogram
              </span>
              <span className="chip negative">
                <X size={13} /> Genetics unavailable
              </span>
            </div>
          </div>
        </div>

        <div className="panel">
          <PanelTitle
            number="01"
            title="Model explanation"
            description="Example of how feature contributions can be displayed."
          />

          <div className="feature-bars">
            <FeatureBar label="Age" value={76} />
            <FeatureBar label="Family history" value={61} />
            <FeatureBar label="Mammogram features" value={52} />
            <FeatureBar label="Other clinical factors" value={29} />
          </div>

          <p className="tiny-note">
            Explanations show how the model used input information. They do not
            prove that a factor caused the outcome.
          </p>
        </div>
      </div>

      <div className="panel disclaimer-panel">
        <ShieldCheck size={20} />
        <div>
          <strong>Research Prototype — Not a Medical Diagnosis</strong>
          <p>
            Do not use this result to make medical decisions. Professional
            medical evaluation is required for real-world healthcare
            decisions.
          </p>
        </div>
      </div>
    </>
  );
}

function FeatureBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="feature-row">
      <div className="feature-label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="feature-track">
        <div style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

/* ---------------- EXPERIMENTS ---------------- */

function ExperimentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="RESEARCH EXPERIMENTS"
        title="Testing different information combinations"
        description="The experiment compares models rather than assuming that more information automatically means better performance."
      />

      <div className="experiment-grid">
        <ExperimentCard
          number="01"
          title="Clinical only"
          description="Uses clinical and basic research information."
        />
        <ExperimentCard
          number="02"
          title="Mammogram only"
          description="Uses imaging information."
        />
        <ExperimentCard
          number="03"
          title="Clinical + Mammogram"
          description="Combines clinical and imaging information."
        />
        <ExperimentCard
          number="04"
          title="All information"
          description="Clinical + mammogram + genetic information."
        />
      </div>

      <div className="panel">
        <PanelTitle
          number="METRICS"
          title="Experimental measurements"
          description="Real values will be added after the ML experiments are completed."
        />

        <MetricTable />
      </div>
    </>
  );
}

function ExperimentCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="experiment-card">
      <span className="experiment-number">{number}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="not-connected">Model not connected</div>
    </div>
  );
}

function MetricTable() {
  const metrics = [
    "AUC",
    "Sensitivity",
    "Specificity",
    "Accuracy",
    "False Negatives",
    "False Positives",
    "F1 Score",
    "Calibration",
  ];

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Clinical</th>
            <th>Mammogram</th>
            <th>Clinical + Mammogram</th>
            <th>All</th>
          </tr>
        </thead>

        <tbody>
          {metrics.map((metric) => (
            <tr key={metric}>
              <td>{metric}</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- MISSING ---------------- */

function MissingPage() {
  return (
    <>
      <PageHeader
        eyebrow="MISSING INFORMATION"
        title="What happens when data is unavailable?"
        description="A central part of the research is testing how model reliability changes when information sources are removed."
      />

      <div className="missing-grid">
        <MissingCard
          title="All information"
          items={["Clinical", "Mammogram", "Genetic"]}
        />
        <MissingCard
          title="Without genetics"
          items={["Clinical", "Mammogram"]}
        />
        <MissingCard title="Without mammogram" items={["Clinical", "Genetic"]} />
        <MissingCard title="Clinical only" items={["Clinical"]} />
      </div>

      <div className="panel">
        <PanelTitle
          number="COMPARISON"
          title="Missing-information results"
          description="These values will be populated from the real research experiments."
        />

        <MetricTable />
      </div>
    </>
  );
}

function MissingCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="missing-card">
      <div className="missing-card-icon">
        <Layers3 size={20} />
      </div>

      <h3>{title}</h3>

      <div className="mini-chips">
        {items.map((item) => (
          <span key={item}>
            <Check size={12} /> {item}
          </span>
        ))}
      </div>

      <div className="not-connected">Experiment not connected</div>
    </div>
  );
}

/* ---------------- COMPARISON ---------------- */

function ComparisonPage() {
  return (
    <>
      <PageHeader
        eyebrow="MODEL COMPARISON"
        title="Does adding information improve the model?"
        description="Compare the performance of different information configurations."
      />

      <div className="comparison-highlight">
        <div>
          <span className="eyebrow">RESEARCH QUESTION</span>
          <h2>More information ≠ automatically better information.</h2>
          <p>
            The experiment will determine which information sources actually
            provide useful improvement.
          </p>
        </div>

        <div className="comparison-icon">
          <SlidersHorizontal size={28} />
        </div>
      </div>

      <div className="panel">
        <MetricTable />
      </div>
    </>
  );
}

/* ---------------- CALIBRATION ---------------- */

function CalibrationPage() {
  return (
    <>
      <PageHeader
        eyebrow="CALIBRATION"
        title="Can we trust the predicted percentage?"
        description="Calibration compares predicted risk with what is actually observed in the research dataset."
      />

      <div className="panel calibration-panel">
        <div className="chart-header">
          <div>
            <h3>Predicted risk vs observed outcome</h3>
            <p>Real experiment data will populate this chart.</p>
          </div>
          <span className="not-connected">Awaiting model</span>
        </div>

        <div className="calibration-chart">
          <div className="y-axis">Observed outcome</div>

          <div className="chart-area">
            <div className="diagonal" />
            <div className="chart-placeholder">
              <Activity size={30} />
              <span>Calibration plot</span>
            </div>

            <div className="x-axis">Predicted risk</div>
          </div>
        </div>
      </div>

      <div className="info-grid">
        <InfoCard
          title="Well calibrated"
          text="Predicted percentages are reasonably close to the outcomes observed in the research data."
        />

        <InfoCard
          title="Poor calibration"
          text="The model may give percentages that are consistently too high or too low."
        />
      </div>
    </>
  );
}

/* ---------------- EXPLAINABILITY ---------------- */

function ExplainabilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="EXPLAINABILITY"
        title="Why did the model make this prediction?"
        description="The explanation layer is designed to make the model's use of input information easier to understand."
      />

      <div className="panel">
        <PanelTitle
          number="01"
          title="Example feature contribution"
          description="This interface can later be connected to SHAP or another explainability method."
        />

        <div className="feature-bars large">
          <FeatureBar label="Age" value={78} />
          <FeatureBar label="Family history" value={63} />
          <FeatureBar label="Mammogram features" value={51} />
          <FeatureBar label="Clinical factors" value={34} />
          <FeatureBar label="Genetic features" value={18} />
        </div>
      </div>

      <div className="info-card-wide">
        <Brain size={22} />
        <div>
          <strong>Important</strong>
          <p>
            Model explanations describe how the model used its inputs. They do
            not establish medical causation.
          </p>
        </div>
      </div>
    </>
  );
}

/* ---------------- DATASET ---------------- */

function DatasetPage() {
  return (
    <>
      <PageHeader
        eyebrow="DATASET & METHODOLOGY"
        title="Research methodology"
        description="The final dataset and model details will be added after the research dataset has been selected."
      />

      <div className="dataset-grid">
        <InfoCard
          title="Dataset"
          text="Dataset name, source and number of samples will be added here."
        />
        <InfoCard
          title="Clinical features"
          text="Only features actually available in the selected dataset will be used."
        />
        <InfoCard
          title="Imaging"
          text="Mammogram details and image preprocessing will be documented here."
        />
        <InfoCard
          title="Genetics"
          text="Genetic features will be included only when compatible research data is available."
        />
      </div>

      <div className="architecture panel">
        <span className="eyebrow">MODEL ARCHITECTURE</span>

        <div className="architecture-flow">
          <ArchitectureBox title="Clinical" />
          <ChevronRight />
          <ArchitectureBox title="Clinical ML" />
          <ChevronRight />
          <ArchitectureBox title="Fusion" />
          <ChevronRight />
          <ArchitectureBox title="Risk" />
        </div>

        <div className="architecture-flow second">
          <ArchitectureBox title="Mammogram" />
          <ChevronRight />
          <ArchitectureBox title="Image AI" />
        </div>

        <div className="architecture-flow second">
          <ArchitectureBox title="Genetic" />
          <ChevronRight />
          <ArchitectureBox title="Feature Model" />
        </div>
      </div>
    </>
  );
}

function ArchitectureBox({ title }: { title: string }) {
  return <div className="architecture-box">{title}</div>;
}

/* ---------------- FINDINGS ---------------- */

function FindingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="RESEARCH FINDINGS"
        title="What did the experiment discover?"
        description="This page is intentionally empty until real experiments have been completed."
      />

      <div className="findings-empty">
        <div className="findings-icon">
          <Microscope size={28} />
        </div>

        <h2>Results will appear here</h2>

        <p>
          We do not assume the answer before running the experiments. The final
          conclusion must be based on the actual research data.
        </p>

        <div className="finding-steps">
          <span>01 Data</span>
          <ChevronRight />
          <span>02 Experiments</span>
          <ChevronRight />
          <span>03 Analysis</span>
          <ChevronRight />
          <span>04 Conclusion</span>
        </div>
      </div>
    </>
  );
}

/* ---------------- ABOUT ---------------- */

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT THE PROJECT"
        title="What are we actually researching?"
        description="A simple explanation of the project."
      />

      <div className="about-layout">
        <div className="panel">
          <span className="eyebrow">THE IDEA</span>
          <h2>We are not trying to build another “cancer detector.”</h2>

          <p>
            The project studies whether different types of information can be
            combined to make breast-cancer risk estimation more useful and
            reliable.
          </p>

          <p>
            We compare models using different information sources and
            deliberately remove information to understand how the system
            behaves when complete information is unavailable.
          </p>
        </div>

        <div className="panel">
          <span className="eyebrow">RESEARCH OUTPUT</span>

          <div className="about-list">
            <div>
              <Check />
              Compare different models
            </div>
            <div>
              <Check />
              Study missing information
            </div>
            <div>
              <Check />
              Analyze false negatives
            </div>
            <div>
              <Check />
              Evaluate calibration
            </div>
            <div>
              <Check />
              Study model explanations
            </div>
          </div>
        </div>
      </div>

      <div className="disclaimer-large">
        <CircleAlert size={22} />

        <div>
          <h3>Research Prototype — Not a Medical Diagnosis</h3>
          <p>
            This application is intended for academic research and
            demonstration. It does not diagnose breast cancer, replace
            professional medical evaluation, or provide treatment
            recommendations.
          </p>
        </div>
      </div>
    </>
  );
}

/* ---------------- SHARED ---------------- */

function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-header">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function PanelTitle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="panel-title">
      <span className="panel-number">{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="info-card">
      <div className="info-card-dot" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default App;
