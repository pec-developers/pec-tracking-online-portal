import React, { useEffect } from 'react';
import { useAcademicStore } from '../../store/useAcademicStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Badge } from '../common/Badge';
import { BarChart2, CheckCircle2, PenTool } from 'lucide-react';

interface PageCAcademicProps {
  studentId: string;
  semester: number;
}

export const PageCAcademic: React.FC<PageCAcademicProps> = ({
  studentId,
  semester,
}) => {
  const { scorecard, fetchScorecard, signScorecard, isLoading } = useAcademicStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchScorecard(studentId, semester);
  }, [studentId, semester, fetchScorecard]);

  const marks = Array.isArray(scorecard?.subjectMarks)
    ? scorecard.subjectMarks
    : [
        { subjectCode: 'CS8401', subjectName: 'Operating Systems', iat1: 88, iat2: 92, model: 90, internalMark: 18.2, univGrade: 'A+', credits: 3, result: 'PASS' },
        { subjectCode: 'CS8402', subjectName: 'Database Management Systems', iat1: 85, iat2: 89, model: 88, internalMark: 17.6, univGrade: 'A', credits: 4, result: 'PASS' },
        { subjectCode: 'CS8403', subjectName: 'Design and Analysis of Algorithms', iat1: 90, iat2: 94, model: 92, internalMark: 18.6, univGrade: 'O', credits: 4, result: 'PASS' },
        { subjectCode: 'CS8404', subjectName: 'Computer Architecture', iat1: 82, iat2: 86, model: 84, internalMark: 17.0, univGrade: 'A', credits: 3, result: 'PASS' },
      ];

  const arrears = Array.isArray(scorecard?.arrearsTracking)
    ? scorecard.arrearsTracking
    : [];

  const canSign =
    (user?.role === 'STUDENT' && !scorecard?.studentSignedAt) ||
    (user?.role === 'PARENT' && !scorecard?.parentSignedAt);

  const handleSign = async () => {
    try {
      await signScorecard(studentId, semester);
    } catch {
      // Handled in store
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold tracking-wide uppercase">
            Page C (Top) • Semester Academic Scorecard &amp; University Results
          </h3>
        </div>
        <span className="text-xs text-slate-400">Semester {semester}</span>
      </div>

      <div className="p-6 space-y-6 text-xs">
        {/* Academic Highlights Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
              Semester GPA
            </span>
            <span className="text-lg font-bold text-slate-900 mt-0.5 block">
              {scorecard?.gpa || '9.14'}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
              Cumulative CGPA
            </span>
            <span className="text-lg font-bold text-emerald-700 mt-0.5 block">
              {scorecard?.cgpa || '8.65'}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
              Attendance %
            </span>
            <span className="text-lg font-bold text-slate-900 mt-0.5 block">
              {scorecard?.attendancePercentage || '95.45'}%
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
              Working Days / Present
            </span>
            <span className="text-sm font-bold text-slate-800 mt-0.5 block">
              {scorecard?.daysPresent || 84} / {scorecard?.workingDays || 88} Days
            </span>
          </div>
        </div>

        {/* Continuous Assessment & University Grades Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Subject Code</th>
                <th className="py-2.5 px-3">Subject Name</th>
                <th className="py-2.5 px-2 text-center">IAT 1 (100)</th>
                <th className="py-2.5 px-2 text-center">IAT 2 (100)</th>
                <th className="py-2.5 px-2 text-center">Model (100)</th>
                <th className="py-2.5 px-2 text-center">Internal (20)</th>
                <th className="py-2.5 px-2 text-center">Univ Grade</th>
                <th className="py-2.5 px-2 text-center">Credits</th>
                <th className="py-2.5 px-3 text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {marks.map((m: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-mono font-bold text-slate-800">{m.subjectCode}</td>
                  <td className="py-2 px-3 font-medium text-slate-700">{m.subjectName}</td>
                  <td className="py-2 px-2 text-center font-mono">{m.iat1 ?? '-'}</td>
                  <td className="py-2 px-2 text-center font-mono">{m.iat2 ?? '-'}</td>
                  <td className="py-2 px-2 text-center font-mono">{m.model ?? '-'}</td>
                  <td className="py-2 px-2 text-center font-mono font-semibold text-slate-800">
                    {m.internalMark ?? '-'}
                  </td>
                  <td className="py-2 px-2 text-center font-bold text-slate-900">{m.univGrade || '-'}</td>
                  <td className="py-2 px-2 text-center text-slate-600">{m.credits || 3}</td>
                  <td className="py-2 px-3 text-center">
                    <Badge variant={m.result === 'PASS' ? 'green' : 'amber'} size="sm">
                      {m.result || 'PASS'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Standing Arrears History */}
        {arrears.length > 0 && (
          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
            <span className="font-bold text-amber-900 block uppercase tracking-wider text-[11px]">
              Standing Arrears Tracking &amp; Re-examination Attempts
            </span>
            <div className="space-y-1">
              {arrears.map((arr: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-amber-100 text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{arr.subjectCode}: </span>
                    <span className="text-slate-600">{arr.subjectName} (Sem {arr.semesterOccurred})</span>
                  </div>
                  <div>
                    {arr.cleared ? (
                      <Badge variant="green" size="sm">Cleared in {arr.clearanceDate}</Badge>
                    ) : (
                      <Badge variant="amber" size="sm">Standing Arrear</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Digital Signatures Box */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                Student Signature
              </span>
              {scorecard?.studentSignedAt ? (
                <div className="flex items-center gap-1 text-emerald-700 font-bold mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Signed {new Date(scorecard.studentSignedAt).toLocaleDateString()}</span>
                </div>
              ) : (
                <span className="text-slate-400 italic">Pending signature</span>
              )}
            </div>

            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                Parent Signature
              </span>
              {scorecard?.parentSignedAt ? (
                <div className="flex items-center gap-1 text-emerald-700 font-bold mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Signed {new Date(scorecard.parentSignedAt).toLocaleDateString()}</span>
                </div>
              ) : (
                <span className="text-slate-400 italic">Pending signature</span>
              )}
            </div>
          </div>

          {canSign && (
            <button
              type="button"
              disabled={isLoading}
              onClick={handleSign}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition text-xs shadow-xs"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Digitally Sign Scorecard</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

