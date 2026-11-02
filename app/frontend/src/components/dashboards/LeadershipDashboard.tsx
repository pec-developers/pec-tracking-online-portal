import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Badge } from '../common/Badge';
import { ShieldCheck, BookOpen, Users, Award, TrendingUp } from 'lucide-react';

interface LeadershipDashboardProps {
  onSelectStudent: (studentId: string) => void;
}

export const LeadershipDashboard: React.FC<LeadershipDashboardProps> = ({
  onSelectStudent,
}) => {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Total Enrolled Students', value: '180', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Overall Pass Percentage', value: '96.2%', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Final Year Placements', value: '91.5%', icon: Award, color: 'text-amber-600 bg-amber-50' },
    { label: 'Pending Sign-offs', value: '1 Student', icon: ShieldCheck, color: 'text-rose-600 bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className={`p-3 rounded-xl ${s.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                  {s.label}
                </span>
                <span className="text-2xl font-extrabold text-slate-900 block mt-0.5">
                  {s.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leadership Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#a61612]" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {user?.role} Governance &amp; Digital Sign-Off Queue
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Pending 4-tier semester reviews &amp; graduation clearances awaiting leadership action
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto text-xs">
          <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Register Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-3">Branch &amp; Sec</th>
                <th className="py-3 px-3">Current Sem</th>
                <th className="py-3 px-3">Sign-off Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-mono font-bold text-slate-900">111422104001</td>
                <td className="py-3 px-4 font-semibold text-slate-800">Aravind Swaminathan</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    <Badge variant="maroon" size="sm">CSE</Badge>
                    <Badge variant="gray" size="sm">Sec A</Badge>
                  </div>
                </td>
                <td className="py-3 px-3 font-bold text-slate-800">Sem 4</td>
                <td className="py-3 px-3">
                  <Badge variant="green" size="sm">Chain Active</Badge>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectStudent('111422104001')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#a61612] text-white font-semibold rounded-lg hover:bg-[#82100d] text-xs transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Review Booklet &amp; Sign</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
