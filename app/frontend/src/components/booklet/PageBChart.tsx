import React, { useEffect, useState } from 'react';
import { useMentoringStore } from '../../store/useMentoringStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Sparkles, Save, Check } from 'lucide-react';

interface PageBChartProps {
  studentId: string;
  semester: number;
}

export const PageBChart: React.FC<PageBChartProps> = ({
  studentId,
  semester,
}) => {
  const { chart, fetchChart, updateChart, isLoading } = useMentoringStore();
  const { user } = useAuthStore();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [timeManagement, setTimeManagement] = useState({
    collegeHours: 7,
    studyHoursDaily: 3,
    sleepHoursDaily: 7,
    sportsHoursDaily: 1.5,
    relaxationHoursDaily: 1.5,
    commuteHoursDaily: 1,
  });

  const [ratings, setRatings] = useState({
    punctuality: 5,
    homeworkTimeliness: 4,
    classAttentiveness: 5,
    labWorkDedication: 5,
    examPreparation: 4,
  });

  const [mentorSuggestions, setMentorSuggestions] = useState(
    'Keep up the strong daily study routine. Dedicate an additional 30 minutes on weekend mornings to automata proofs.',
  );

  useEffect(() => {
    fetchChart(studentId, semester);
  }, [studentId, semester, fetchChart]);

  useEffect(() => {
    if (chart) {
      if (chart.timeManagement && Object.keys(chart.timeManagement).length > 0) {
        setTimeManagement((prev) => ({ ...prev, ...chart.timeManagement }));
      }
      if (chart.classroomRoutine && Object.keys(chart.classroomRoutine).length > 0) {
        setRatings((prev) => ({ ...prev, ...chart.classroomRoutine }));
      }
      if (chart.mentorSuggestions?.notes) {
        setMentorSuggestions(chart.mentorSuggestions.notes);
      }
    }
  }, [chart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateChart(studentId, semester, {
        timeManagement,
        classroomRoutine: ratings,
        laboratoryRoutine: { labAttentiveness: ratings.labWorkDedication },
        mentorSuggestions: { notes: mentorSuggestions },
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      // Handled in store
    }
  };

  const isMentor = user?.role === 'MENTOR' || user?.role === 'ADMIN';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold tracking-wide uppercase">
            Page B • Mentoring Chart &amp; Time Management (Semester {semester})
          </h3>
        </div>
        <span className="text-xs text-slate-400">Mentor Evaluation</span>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs">
        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Page B mentoring chart saved successfully!</span>
          </div>
        )}

        {/* 1. Daily Hours Breakdown */}
        <div>
          <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-3 text-[11px]">
            1. Daily Time Allocation (Hours per day)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 font-semibold block">College Classes</span>
              <input
                type="number"
                disabled={!isMentor}
                value={timeManagement.collegeHours}
                onChange={(e) => setTimeManagement({ ...timeManagement, collegeHours: Number(e.target.value) })}
                className="mt-1 w-full font-bold text-sm bg-white border border-slate-200 rounded-md px-2 py-1"
              />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 font-semibold block">Self-Study</span>
              <input
                type="number"
                disabled={!isMentor}
                value={timeManagement.studyHoursDaily}
                onChange={(e) => setTimeManagement({ ...timeManagement, studyHoursDaily: Number(e.target.value) })}
                className="mt-1 w-full font-bold text-sm bg-white border border-slate-200 rounded-md px-2 py-1 text-emerald-700"
              />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 font-semibold block">Sleep</span>
              <input
                type="number"
                disabled={!isMentor}
                value={timeManagement.sleepHoursDaily}
                onChange={(e) => setTimeManagement({ ...timeManagement, sleepHoursDaily: Number(e.target.value) })}
                className="mt-1 w-full font-bold text-sm bg-white border border-slate-200 rounded-md px-2 py-1"
              />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 font-semibold block">Sports / Gym</span>
              <input
                type="number"
                disabled={!isMentor}
                value={timeManagement.sportsHoursDaily}
                onChange={(e) => setTimeManagement({ ...timeManagement, sportsHoursDaily: Number(e.target.value) })}
                className="mt-1 w-full font-bold text-sm bg-white border border-slate-200 rounded-md px-2 py-1"
              />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 font-semibold block">Relaxation</span>
              <input
                type="number"
                disabled={!isMentor}
                value={timeManagement.relaxationHoursDaily}
                onChange={(e) => setTimeManagement({ ...timeManagement, relaxationHoursDaily: Number(e.target.value) })}
                className="mt-1 w-full font-bold text-sm bg-white border border-slate-200 rounded-md px-2 py-1"
              />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 font-semibold block">Commute</span>
              <input
                type="number"
                disabled={!isMentor}
                value={timeManagement.commuteHoursDaily}
                onChange={(e) => setTimeManagement({ ...timeManagement, commuteHoursDaily: Number(e.target.value) })}
                className="mt-1 w-full font-bold text-sm bg-white border border-slate-200 rounded-md px-2 py-1"
              />
            </div>
          </div>
        </div>

        {/* 2. Qualitative Ratings (Scale 1 - 5) */}
        <div>
          <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-3 text-[11px]">
            2. Qualitative Routine Ratings (Scale 1 to 5)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { label: 'Punctuality', key: 'punctuality' as const },
              { label: 'Homework / Assignments', key: 'homeworkTimeliness' as const },
              { label: 'Class Attentiveness', key: 'classAttentiveness' as const },
              { label: 'Lab Work Dedication', key: 'labWorkDedication' as const },
              { label: 'Exam Preparation', key: 'examPreparation' as const },
            ].map((item) => (
              <div key={item.key} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-slate-600 font-semibold block text-[11px] mb-1">{item.label}</span>
                <select
                  disabled={!isMentor}
                  value={ratings[item.key]}
                  onChange={(e) => setRatings({ ...ratings, [item.key]: Number(e.target.value) })}
                  className="font-bold text-sm bg-white border border-slate-200 rounded-md px-2 py-1 w-full text-center"
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Satisfactory</option>
                  <option value={2}>2 - Needs Attention</option>
                  <option value={1}>1 - Poor</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Mentor Suggestions */}
        <div>
          <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-2 text-[11px]">
            3. Mentor Suggestions &amp; Corrective Guidance
          </h4>
          <textarea
            disabled={!isMentor}
            rows={2}
            value={mentorSuggestions}
            onChange={(e) => setMentorSuggestions(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-xs"
          />
        </div>

        {isMentor && (
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#a61612] text-white font-semibold rounded-lg hover:bg-[#82100d] transition text-xs shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Chart (Page B)</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
