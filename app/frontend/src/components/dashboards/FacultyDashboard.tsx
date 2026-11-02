import React, { useState } from 'react';
import { useAcademicStore } from '../../store/useAcademicStore';
import { Badge } from '../common/Badge';
import { BookOpen, Save, Check } from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const { updateMarks, isLoading } = useAcademicStore();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [marks, setMarks] = useState([
    {
      regNo: '111422104001',
      name: 'Aravind Swaminathan',
      iat1: 88,
      iat2: 92,
      model: 90,
      internalMark: 18.2,
    },
  ]);

  const handleSave = async (regNo: string, m: any) => {
    try {
      await updateMarks(regNo, 4, [
        {
          subjectCode: 'CS8401',
          subjectName: 'Operating Systems',
          iat1: m.iat1,
          iat2: m.iat2,
          model: m.model,
          internalMark: m.internalMark,
        },
      ]);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      // Handled in store
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#a61612]" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Faculty Continuous Assessment &amp; Marks Entry Grid
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Course: <span className="font-bold text-slate-800">CS8401 - Operating Systems</span> (Semester 4, CSE Section A)
          </p>
        </div>

        <Badge variant="maroon">Semester 4 • 2024-2025</Badge>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2 text-xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Internal Assessment Marks saved to database!</span>
        </div>
      )}

      <div className="overflow-x-auto text-xs">
        <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Register Number</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-2 text-center">IAT 1 (100)</th>
              <th className="py-3 px-2 text-center">IAT 2 (100)</th>
              <th className="py-3 px-2 text-center">Model Exam (100)</th>
              <th className="py-3 px-2 text-center">Internal (20)</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {marks.map((m, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-mono font-bold text-slate-900">{m.regNo}</td>
                <td className="py-3 px-4 font-semibold text-slate-800">{m.name}</td>
                <td className="py-3 px-2 text-center">
                  <input
                    type="number"
                    value={m.iat1}
                    onChange={(e) => {
                      const newMarks = [...marks];
                      newMarks[idx].iat1 = Number(e.target.value);
                      setMarks(newMarks);
                    }}
                    className="w-16 px-2 py-1 text-center font-mono border border-slate-200 rounded-md"
                  />
                </td>
                <td className="py-3 px-2 text-center">
                  <input
                    type="number"
                    value={m.iat2}
                    onChange={(e) => {
                      const newMarks = [...marks];
                      newMarks[idx].iat2 = Number(e.target.value);
                      setMarks(newMarks);
                    }}
                    className="w-16 px-2 py-1 text-center font-mono border border-slate-200 rounded-md"
                  />
                </td>
                <td className="py-3 px-2 text-center">
                  <input
                    type="number"
                    value={m.model}
                    onChange={(e) => {
                      const newMarks = [...marks];
                      newMarks[idx].model = Number(e.target.value);
                      setMarks(newMarks);
                    }}
                    className="w-16 px-2 py-1 text-center font-mono border border-slate-200 rounded-md"
                  />
                </td>
                <td className="py-3 px-2 text-center">
                  <input
                    type="number"
                    step="0.1"
                    value={m.internalMark}
                    onChange={(e) => {
                      const newMarks = [...marks];
                      newMarks[idx].internalMark = Number(e.target.value);
                      setMarks(newMarks);
                    }}
                    className="w-16 px-2 py-1 text-center font-mono font-bold text-emerald-800 border border-slate-200 rounded-md"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSave(m.regNo, m)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#a61612] text-white rounded-lg font-semibold hover:bg-[#82100d] text-xs transition"
                  >
                    <Save className="w-3 h-3" />
                    <span>Save Marks</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

