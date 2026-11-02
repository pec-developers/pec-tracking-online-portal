import React from 'react';
import { Target, Compass, Award, Dumbbell } from 'lucide-react';

interface AmbitionSwotProps {
  student: any;
}

export const AmbitionSwot: React.FC<AmbitionSwotProps> = ({ student }) => {
  if (!student) return null;
  const ap = student.ambitionAndProfile || {};

  return (
    <div className="space-y-6">
      {/* 1. Goals & Career Ambition */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Page 2 • Career Ambition &amp; Objectives
            </h3>
          </div>
          <span className="text-xs text-slate-400">Future Roadmap</span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Personal Aim or Goal:
              </span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">
                {ap.personalAimOrGoal || 'To become a Principal Cloud Solutions Architect in a leading global technology firm.'}
              </p>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Career Option &amp; Preparation:
              </span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">
                {ap.careerOption || 'Software Product Engineering / Campus Recruitment in Tier-1 product firms.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Plans to Achieve Aim:
              </span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">
                {ap.plansToAchieveAim || 'Rigorous daily practice of data structures, competitive programming, and IEEE project papers.'}
              </p>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Support Required from College:
              </span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">
                {ap.collegeHelpRequired || 'Hands-on advanced cloud laboratory facilities and specialized placement training sessions.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Living Style & Routine */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Page 2 • Living Style, Commute &amp; Routine
            </h3>
          </div>
          <span className="text-xs text-slate-400">Campus &amp; Home Habits</span>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider">Stay Type</span>
            <span className="text-sm font-bold text-slate-800 mt-1 block">
              {ap.stayType || 'Day Scholar (College Bus Route 14)'}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider">Parent Communication</span>
            <span className="text-sm font-bold text-slate-800 mt-1 block">
              {ap.parentCommFrequencyStudent || 'Daily Evening Discussions'}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider">Weekend Routine</span>
            <span className="text-sm font-bold text-slate-800 mt-1 block">
              {ap.holidayAndWeekendRoutine || 'Course revisions & coding club projects'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. SWOT Analysis & Sports */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Page 2 • SWOT Analysis &amp; Extra-Curriculars
            </h3>
          </div>
          <span className="text-xs text-slate-400">Self-Evaluation</span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Strengths & Core Skills */}
          <div className="space-y-3">
            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px] block">
                Key Strengths
              </span>
              <p className="text-slate-700">
                <span className="font-semibold">Academic: </span>
                {ap.strengthsAcademic || 'Exceptional grasp of computer science logic and mathematical abstractions.'}
              </p>
              <p className="text-slate-700">
                <span className="font-semibold">General: </span>
                {ap.strengthsGeneral || 'Consistent discipline, leadership in team mini-projects, and punctuality.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Math Fundamentals</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">{ap.mathFundamentalsRating || 'EXCELLENT'}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Core Engineering</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">{ap.coreEngineeringRating || 'VERY_GOOD'}</div>
              </div>
            </div>
          </div>

          {/* Weaknesses & Sports */}
          <div className="space-y-3">
            <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-xl space-y-1">
              <span className="font-bold text-amber-800 uppercase tracking-wider text-[11px] block">
                Areas for Improvement
              </span>
              <p className="text-slate-700">
                {ap.weaknesses || 'Over-analyzing problems under timed exams; actively practicing timed mock tests with mentor guidance.'}
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Sports &amp; Games</div>
                <div className="text-xs font-bold text-slate-800">
                  {Array.isArray(ap.sportsAndGames) ? ap.sportsAndGames.join(', ') : 'Table Tennis (Zonal Runner-Up), Badminton, Chess'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
