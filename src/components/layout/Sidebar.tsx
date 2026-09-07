import React from 'react';
import {
  Home,
  Sliders,
  Activity,
  FlaskConical,
  FileQuestion,
  GitCompare,
  Target,
  ShieldAlert,
  Sparkles,
  Database,
  Cpu,
  FileText,
  Info,
  X,
  AlertCircle
} from 'lucide-react';
import { PageId } from '../../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate?: (page: PageId) => void;
  onSelectPage?: (page: PageId) => void;
  isMobileOpen?: boolean;
  mobileOpen?: boolean;
  onCloseMobile: () => void;
  hasActivePrediction?: boolean;
}

interface NavGroup {
  title: string;
  items: { id: PageId; label: string; icon: React.ElementType; badge?: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Main',
    items: [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'assessment', label: 'Risk Assessment', icon: Sliders },
      { id: 'results', label: 'Research Results', icon: Activity, badge: 'Active' },
    ],
  },
  {
    title: 'Analysis',
    items: [
      { id: 'experiments', label: 'Experiments', icon: FlaskConical },
      { id: 'missing-info', label: 'Missing Information', icon: FileQuestion },
      { id: 'model-comparison', label: 'Model Comparison', icon: GitCompare },
      { id: 'calibration', label: 'Calibration', icon: Target },
      { id: 'false-negatives', label: 'False-Negative Safety', icon: ShieldAlert },
      { id: 'explainability', label: 'Explainability', icon: Sparkles },
    ],
  },
  {
    title: 'Research & Ethics',
    items: [
      { id: 'methodology', label: 'Dataset & Methodology', icon: Database },
      { id: 'architecture', label: 'Model Architecture', icon: Cpu },
      { id: 'findings', label: 'Research Findings', icon: FileText },
      { id: 'about', label: 'About & Governance', icon: Info },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onSelectPage,
  isMobileOpen,
  mobileOpen,
  onCloseMobile,
  hasActivePrediction,
}) => {
  const isOpen = isMobileOpen ?? mobileOpen ?? false;
  const handleSelect = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
    } else if (onSelectPage) {
      onSelectPage(page);
    }
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          id="mobile-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0D0D0D] border-r border-[#262626] flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div id="sidebar-header" className="p-6 border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-md flex items-center justify-center text-white shadow-[0_0_10px_rgba(59,130,246,0.35)] shrink-0">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base md:text-lg tracking-tight text-[#F5F5F5] leading-tight">
                BC-AI Research
              </h1>
              <p className="text-[10px] text-[#737373] uppercase tracking-widest font-mono">
                Multimodal Lab
              </p>
            </div>
          </div>
          <button
            id="close-mobile-sidebar-btn"
            onClick={onCloseMobile}
            className="lg:hidden text-[#A1A1A1] hover:text-[#F5F5F5] p-1 rounded hover:bg-[#181818]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List grouped by category */}
        <nav id="sidebar-nav" className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
          {NAV_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              <div className="text-[11px] font-semibold text-[#737373] uppercase mb-2 px-3 tracking-widest">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  const showActiveDot = item.id === 'results' && hasActivePrediction;

                  return (
                    <button
                      key={item.id}
                      id={`nav-item-${item.id}`}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all ${
                        isActive
                          ? 'bg-[#181818] text-[#3B82F6] border-l-2 border-[#3B82F6] font-medium shadow-xs'
                          : 'text-[#A1A1A1] hover:bg-[#181818] hover:text-[#F5F5F5]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-[#3B82F6]' : 'text-[#737373]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {showActiveDot && (
                        <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Research Badge / Spec Panel */}
        <div id="sidebar-footer" className="mt-auto p-5 bg-[#0A0A0A] border-t border-[#262626]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-[#737373] uppercase tracking-widest">
              System Status
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              Active
            </span>
          </div>
          <div className="text-[10px] text-[#737373] leading-relaxed uppercase tracking-wider font-mono">
            Research Prototype v1.2.0<br />
            <span className="text-amber-500/80">Not for Clinical Use</span>
          </div>
        </div>
      </aside>
    </>
  );
};

