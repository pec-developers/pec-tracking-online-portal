import React, { useEffect, useState } from 'react';
import { useMentoringStore } from '../../store/useMentoringStore';
import { useAuthStore } from '../../store/useAuthStore';
import { CheckCircle2, ShieldCheck, PenTool, Check, Save } from 'lucide-react';

interface PageDReviewProps {
  studentId: string;
  semester: number;
}

export const PageDReview: React.FC<PageDReviewProps> = ({
  studentId,
  semester,
}) => {
  const { review, fetchReview, updateReview, signOffReview, isLoading } = useMentoringStore();
  const { user } = useAuthStore();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    overallRemarks: 'Aravind Swaminathan is an exemplary student with top-tier academic commitment.',
    disciplinaryIssues: 'Nil',
    requiresLeadershipFollowup: false,
    leadershipFollowupTarget: '',
    leadershipFollowupDetails: '',
  });

  useEffect(() => {
    fetchReview(studentId, semester);
  }, [studentId, semester, fetchReview]);

  useEffect(() => {
    if (review) {
      setFormData({
        overallRemarks: review.overallRemarks || 'Aravind Swaminathan is an exemplary student with top-tier academic commitment.',
        disciplinaryIssues: review.disciplinaryIssues || 'Nil',
        requiresLeadershipFollowup: review.requiresLeadershipFollowup || false,
        leadershipFollowupTarget: review.leadershipFollowupTarget || '',
        leadershipFollowupDetails: review.leadershipFollowupDetails || '',
      });
    }
  }, [review]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateReview(studentId, semester, formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      // Handled in store
    }
  };

  const handleSignOff = async () => {
    try {
      await signOffReview(studentId, semester);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      // Handled in store
    }
  };

  const isMentor = user?.role === 'MENTOR' || user?.role === 'ADMIN';
  const isEligibleSigner =
    user && ['MENTOR', 'CLASS_COORDINATOR', 'HOD', 'PRINCIPAL', 'ADMIN'].includes(user.role);

  const tiers = [
    { name: '1. Mentor', signedAt: review?.mentorSignedAt, role: 'MENTOR' },
    { name: '2. Class Coordinator', signedAt: review?.coordinatorSignedAt, role: 'CLASS_COORDINATOR' },
    { name: '3. HOD', signedAt: review?.hodSignedAt, role: 'HOD' },
    { name: '4. Principal', signedAt: review?.principalSignedAt, role: 'PRINCIPAL' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold tracking-wide uppercase">
            Page D • Semester Review &amp; 4-Tier Leadership Sign-off Chain (Semester {semester})
          </h3>
        </div>
        <span className="text-xs text-slate-400">Institutional Governance</span>
      </div>

      <div className="p-6 space-y-6 text-xs">
        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Review updated &amp; sign-off recorded successfully!</span>
          </div>
        )}

        {/* 1. 4-Tier Visual Sign-Off Chain */}
        <div>
          <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-3 text-[11px]">
            Leadership Sign-off Chain Status
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  tier.signedAt
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{tier.name}</span>
                    {tier.signedAt ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold">Pending</span>
                    )}
                  </div>
                  <div className="mt-2 text-[11px]">
                    {tier.signedAt ? (
                      <span className="text-emerald-700 font-semibold block">
                        Signed: {new Date(tier.signedAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic block">Awaiting sign-off</span>
                    )}
                  </div>
                </div>

                {isEligibleSigner && (user.role === tier.role || user.role === 'ADMIN') && !tier.signedAt && (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleSignOff}
                    className="mt-3 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-emerald-700 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-800 transition"
                  >
                    <PenTool className="w-3 h-3" />
                    <span>Sign Off as {tier.role}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Review Form */}
        <form onSubmit={handleUpdate} className="space-y-4 pt-4 border-t border-slate-200">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Overall Mentor Review &amp; Academic Analysis</label>
            <textarea
              rows={3}
              disabled={!isMentor}
              value={formData.overallRemarks}
              onChange={(e) => setFormData({ ...formData, overallRemarks: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Disciplinary Observations</label>
              <input
                type="text"
                disabled={!isMentor}
                value={formData.disciplinaryIssues}
                onChange={(e) => setFormData({ ...formData, disciplinaryIssues: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="followup"
                disabled={!isMentor}
                checked={formData.requiresLeadershipFollowup}
                onChange={(e) => setFormData({ ...formData, requiresLeadershipFollowup: e.target.checked })}
                className="h-4 w-4 text-[#a61612] rounded-sm border-slate-300"
              />
              <label htmlFor="followup" className="font-semibold text-slate-700">
                Flag for Leadership Followup (HOD / Principal)
              </label>
            </div>
          </div>

          {isMentor && (
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#a61612] text-white font-semibold rounded-lg hover:bg-[#82100d] transition text-xs shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Review (Page D)</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
