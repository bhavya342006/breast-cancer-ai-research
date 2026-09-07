import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id="research-disclaimer-banner"
      className="bg-[#0D0D0D] border-b border-[#262626] px-4 py-2 text-xs transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-start md:items-center space-x-2.5">
          <div className="p-1 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] shrink-0 mt-0.5 md:mt-0">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-[#F5F5F5] uppercase tracking-wider text-[11px] mr-2">
              Research Prototype — Not a Medical Diagnosis
            </span>
            <span className="text-[#A1A1A1] hidden sm:inline">
              Academic demonstration only. Predictions are estimated research-model risks, not clinical diagnoses.
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0 self-end md:self-auto">
          <button
            id="toggle-disclaimer-details-btn"
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] text-[#3B82F6] hover:text-[#60A5FA] flex items-center space-x-1"
          >
            <span>{expanded ? 'Hide Safety Notice' : 'View Safety Notice'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div
          id="disclaimer-expanded-details"
          className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[#262626] grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-[#A1A1A1]"
        >
          <div className="p-2.5 rounded bg-[#121212] border border-[#262626]">
            <p className="font-semibold text-[#F5F5F5] mb-1">Strictly Non-Diagnostic</p>
            <p className="text-[#737373] leading-relaxed">
              This application does not diagnose breast cancer, does not claim presence or absence of disease, and does not replace certified healthcare professionals.
            </p>
          </div>
          <div className="p-2.5 rounded bg-[#121212] border border-[#262626]">
            <p className="font-semibold text-[#F5F5F5] mb-1">No Medical Interventions</p>
            <p className="text-[#737373] leading-relaxed">
              The application never prescribes medications, dosages, or surgical therapies. For medical concerns, consult a licensed physician or clinical geneticist.
            </p>
          </div>
          <div className="p-2.5 rounded bg-[#121212] border border-[#262626]">
            <p className="font-semibold text-[#F5F5F5] mb-1">De-Identified Research Data</p>
            <p className="text-[#737373] leading-relaxed">
              Designed under IRB guidelines. Do not upload personally identifiable medical records, protected health information (PHI), or confidential data.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
