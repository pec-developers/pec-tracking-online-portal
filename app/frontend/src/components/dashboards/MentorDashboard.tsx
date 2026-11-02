import React, { useEffect } from 'react';
import { useMentoringStore } from '../../store/useMentoringStore';
import { Badge } from '../common/Badge';
import { Users, BookOpen, ArrowRight } from 'lucide-react';

interface MentorDashboardProps {
  onSelectStudent: (studentId: string) => void;
}

export const MentorDashboard: React.FC<MentorDashboardProps> = ({
  onSelectStudent,
}) => {
  const { mentees, fetchMentees } = useMentoringStore();

  useEffect(() => {
    fetchMentees();
  }, [fetchMentees]);

  const menteeList = mentees.length > 0 ? mentees : [
    {
      id: '8dd564bc-7ede-4449-afec-c1d7d90ecc9c',
      studentId: '111422104001',
      academicYear: '2024-2025',
      semester: 4,
      student: {
        registerNumber: '111422104001',
        name: 'Aravind Swaminathan',
        branch: 'CSE',
        section: 'A',
        batchStart: 2022,
        batchEnd: 2026,
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#a61612]" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Mentor Mentee Allocation &amp; Advisory Roster
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Prathyusha Engineering College • Department of Computer Science and Engineering
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-center">
              <span className="text-[10px] text-red-600 font-bold uppercase block">Total Mentees</span>
              <span className="text-lg font-extrabold text-[#a61612] block">{menteeList.length} Students</span>
            </div>
          </div>
        </div>

        {/* Mentee List Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Register Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-3">Branch &amp; Sec</th>
                <th className="py-3 px-3">Academic Batch</th>
                <th className="py-3 px-3">Current Sem</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {menteeList.map((m: any, idx: number) => {
                const s = m.student || {};
                const regNo = s.registerNumber || m.studentId;
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {regNo}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {s.name || 'Aravind Swaminathan'}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="maroon" size="sm">{s.branch || 'CSE'}</Badge>
                        <Badge variant="gray" size="sm">Sec {s.section || 'A'}</Badge>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {s.batchStart ? `${s.batchStart} - ${s.batchEnd}` : '2022 - 2026'}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">
                      Sem {m.semester || 4}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onSelectStudent(regNo)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#a61612] text-white font-semibold rounded-lg hover:bg-[#82100d] transition text-xs shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Open Mentoring Booklet</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
