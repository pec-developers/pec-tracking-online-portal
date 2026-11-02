import React from 'react';
import {
  BookOpen,
  BarChart2,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface SemesterNavigatorProps {
  currentSemester: number;
  onSelectSemester: (sem: number) => void;
  currentSubTab: 'activity' | 'chart' | 'academic' | 'sessions' | 'review';
  onSelectSubTab: (
    tab: 'activity' | 'chart' | 'academic' | 'sessions' | 'review',
  ) => void;
}

export const SemesterNavigator: React.FC<SemesterNavigatorProps> = ({
  currentSemester,
  onSelectSemester,
  currentSubTab,
  onSelectSubTab,
}) => {
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const subTabs = [
    { id: 'academic', label: 'Page C: Academic Marks & Arrears', icon: BarChart2 },
    { id: 'sessions', label: 'Page C: 1-on-1 Counseling Sessions', icon: Clock },
    { id: 'activity', label: 'Page A: Mentoring Activity', icon: BookOpen },
    { id: 'chart', label: 'Page B: Routine Chart', icon: Sparkles },
    { id: 'review', label: 'Page D: Review & 4-Tier Sign-off', icon: CheckCircle2 },
  ] as const;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 mb-6 space-y-4">
      {/* 1. Semester Selector Bar */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Select Academic Semester</span>
          <span className="text-[#a61612]">
            Viewing Semester {currentSemester} (Year {Math.ceil(currentSemester / 2)})
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {semesters.map((sem) => (
            <button
              key={sem}
              type="button"
              onClick={() => onSelectSemester(sem)}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all border ${
                currentSemester === sem
                  ? 'bg-[#a61612] text-white border-[#a61612] shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Sub-Tabs Bar (Page A, B, C, D) */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex flex-wrap gap-2">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

