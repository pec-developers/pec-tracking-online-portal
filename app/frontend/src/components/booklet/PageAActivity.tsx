import React, { useEffect, useState } from 'react';
import { useMentoringStore } from '../../store/useMentoringStore';
import { useAuthStore } from '../../store/useAuthStore';
import { BookOpen, Save, Check } from 'lucide-react';

interface PageAActivityProps {
  studentId: string;
  semester: number;
}

export const PageAActivity: React.FC<PageAActivityProps> = ({
  studentId,
  semester,
}) => {
  const { activity, fetchActivity, updateActivity, isLoading } = useMentoringStore();
  const { user } = useAuthStore();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fieldOfInterest: '',
    favoriteSubject: '',
    favoriteSubjectReason: '',
    favoriteTeacher: '',
    favoriteTeacherReason: '',
    easiestSubject: '',
    easiestSubjectReason: '',
    hardestSubject: '',
    hardestSubjectReason: '',
    specialAttentionRequired: '',
    distractions: '',
    arrearsExplanation: '',
  });

  useEffect(() => {
    fetchActivity(studentId, semester);
  }, [studentId, semester, fetchActivity]);

  useEffect(() => {
    if (activity) {
      setFormData({
        fieldOfInterest: activity.fieldOfInterest || 'Cloud Computing & Distributed Systems',
        favoriteSubject: activity.favoriteSubject || 'CS8401 - Operating Systems',
        favoriteSubjectReason: activity.favoriteSubjectReason || 'Hands-on concurrency, threads, and memory scheduling',
        favoriteTeacher: activity.favoriteTeacher || 'Prof. Suresh Balan',
        favoriteTeacherReason: activity.favoriteTeacherReason || 'Practical industry examples & clear code walkthroughs',
        easiestSubject: activity.easiestSubject || 'Software Engineering',
        easiestSubjectReason: activity.easiestSubjectReason || 'Clear conceptual methodologies and design patterns',
        hardestSubject: activity.hardestSubject || 'Theory of Computation',
        hardestSubjectReason: activity.hardestSubjectReason || 'Abstract mathematical proofs and automata state reductions',
        specialAttentionRequired: activity.specialAttentionRequired || 'Extra coaching for automata problem sets',
        distractions: activity.distractions || 'None',
        arrearsExplanation: activity.arrearsExplanation || 'Nil - Cleared all courses in first attempt',
      });
    }
  }, [activity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateActivity(studentId, semester, formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      // Handled in store
    }
  };

  const isEditable = user?.role === 'STUDENT' || user?.role === 'MENTOR' || user?.role === 'ADMIN';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-rose-400" />
          <h3 className="text-sm font-bold tracking-wide uppercase">
            Page A • Mentoring Activity &amp; Self-Reflections (Semester {semester})
          </h3>
        </div>
        <span className="text-xs text-slate-400">Student Entry</span>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Page A mentoring activities saved successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Field of Interest</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.fieldOfInterest}
              onChange={(e) => setFormData({ ...formData, fieldOfInterest: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Favorite Subject &amp; Code</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.favoriteSubject}
              onChange={(e) => setFormData({ ...formData, favoriteSubject: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Reason for Favorite Subject</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.favoriteSubjectReason}
              onChange={(e) => setFormData({ ...formData, favoriteSubjectReason: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Favorite Teacher</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.favoriteTeacher}
              onChange={(e) => setFormData({ ...formData, favoriteTeacher: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Reason for Favorite Teacher</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.favoriteTeacherReason}
              onChange={(e) => setFormData({ ...formData, favoriteTeacherReason: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Most Challenging / Hardest Subject</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.hardestSubject}
              onChange={(e) => setFormData({ ...formData, hardestSubject: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Reason for Difficulty</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.hardestSubjectReason}
              onChange={(e) => setFormData({ ...formData, hardestSubjectReason: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Special Attention / Coaching Required</label>
            <input
              type="text"
              disabled={!isEditable}
              value={formData.specialAttentionRequired}
              onChange={(e) => setFormData({ ...formData, specialAttentionRequired: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
            />
          </div>
        </div>

        {isEditable && (
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#a61612] text-white font-semibold rounded-lg hover:bg-[#82100d] transition text-xs shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Reflections (Page A)</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

