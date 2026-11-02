import React, { useEffect, useState } from 'react';
import { useMentoringStore } from '../../store/useMentoringStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Badge } from '../common/Badge';
import { Clock, Plus, CheckCircle2, UserCheck } from 'lucide-react';

interface PageCSessionsProps {
  studentId: string;
  semester: number;
}

export const PageCSessions: React.FC<PageCSessionsProps> = ({
  studentId,
  semester,
}) => {
  const { sessions, fetchSessions, logSession, signSession, isLoading } = useMentoringStore();
  const { user } = useAuthStore();
  const [showLogModal, setShowLogModal] = useState(false);

  const [newSession, setNewSession] = useState({
    sessionNumber: 1,
    date: '2025-10-18',
    asPerson: 9,
    studies: 9,
    behaviour: 10,
    characterAndContact: 10,
    knowledge: 9,
    remarks: 'Consistent enthusiasm in cloud laboratory exercises and peer mentoring.',
  });

  useEffect(() => {
    fetchSessions(studentId, semester);
  }, [studentId, semester, fetchSessions]);

  const handleLog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logSession(studentId, {
        semester,
        ...newSession,
      });
      setShowLogModal(false);
    } catch {
      // Handled in store
    }
  };

  const isMentor = user?.role === 'MENTOR' || user?.role === 'ADMIN';
  const isStudent = user?.role === 'STUDENT';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold tracking-wide uppercase">
            Page C (Bottom) • 1-on-1 Counseling Sessions &amp; 10-Point Trait Evaluation
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">5 Sessions / Semester</span>
          {isMentor && (
            <button
              type="button"
              onClick={() => setShowLogModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Session</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4 text-xs">
        {sessions.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
            <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 font-medium">No counseling sessions recorded yet for Semester {semester}.</p>
            {isMentor && (
              <button
                type="button"
                onClick={() => setShowLogModal(true)}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#a61612] text-white font-semibold rounded-lg text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Record Session #1</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map((sess: any) => (
              <div
                key={sess.id || sess.sessionNumber}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      Session #{sess.sessionNumber}
                    </span>
                    <Badge variant="blue" size="sm">
                      {new Date(sess.date).toLocaleDateString()}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Trait Score</span>
                    <span className="text-base font-extrabold text-[#a61612]">
                      {sess.total} / 50
                    </span>
                  </div>
                </div>

                {/* 5 Trait Scores */}
                <div className="grid grid-cols-5 gap-1 text-center">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Person</span>
                    <span className="font-bold text-slate-800 text-xs">{sess.asPerson}/10</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Studies</span>
                    <span className="font-bold text-slate-800 text-xs">{sess.studies}/10</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Behav.</span>
                    <span className="font-bold text-slate-800 text-xs">{sess.behaviour}/10</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Char.</span>
                    <span className="font-bold text-slate-800 text-xs">{sess.characterAndContact}/10</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Knowl.</span>
                    <span className="font-bold text-slate-800 text-xs">{sess.knowledge}/10</span>
                  </div>
                </div>

                {/* Remarks & Signatures */}
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-700">Mentor Remarks: </span>
                  {sess.remarks || 'Satisfactory academic and routine performance.'}
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <div>
                    {sess.studentSignature ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Acknowledged by Student</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Pending student acknowledgement</span>
                    )}
                  </div>

                  {isStudent && !sess.studentSignature && (
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => signSession(studentId, semester, sess.sessionNumber)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition"
                    >
                      <UserCheck className="w-3 h-3" />
                      <span>Acknowledge</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for logging a new session */}
        {showLogModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase">
                  Log 1-on-1 Counseling Session (Sem {semester})
                </h3>
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleLog} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Session Number</label>
                    <select
                      value={newSession.sessionNumber}
                      onChange={(e) => setNewSession({ ...newSession, sessionNumber: Number(e.target.value) })}
                      className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>Session #{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Date</label>
                    <input
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                      className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                {/* 5 Trait Inputs (1-10) */}
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: 'Person', key: 'asPerson' as const },
                    { label: 'Studies', key: 'studies' as const },
                    { label: 'Behaviour', key: 'behaviour' as const },
                    { label: 'Character', key: 'characterAndContact' as const },
                    { label: 'Knowledge', key: 'knowledge' as const },
                  ].map((t) => (
                    <div key={t.key}>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase">{t.label}</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={newSession[t.key]}
                        onChange={(e) => setNewSession({ ...newSession, [t.key]: Number(e.target.value) })}
                        className="w-full mt-1 px-2 py-1 text-center font-bold border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Mentor Remarks &amp; Counseling Guidance</label>
                  <textarea
                    rows={2}
                    value={newSession.remarks}
                    onChange={(e) => setNewSession({ ...newSession, remarks: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLogModal(false)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-1.5 bg-[#a61612] text-white rounded-lg text-xs font-semibold hover:bg-[#82100d]"
                  >
                    Save Session
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
