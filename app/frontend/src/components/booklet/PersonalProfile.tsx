import React from 'react';
import { User, Users, GraduationCap, Home } from 'lucide-react';

interface PersonalProfileProps {
  student: any;
}

export const PersonalProfile: React.FC<PersonalProfileProps> = ({ student }) => {
  if (!student) return null;

  const pd = student.personalDetails || {};
  const fd = student.familyDetails || {};
  const ah = student.academicHistory || {};

  return (
    <div className="space-y-6">
      {/* 1. Inside Cover: Personal Particulars */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Inside Cover • Personal Particulars
            </h3>
          </div>
          <span className="text-xs text-slate-400">Pre-Semester Entry</span>
        </div>

        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block">Date of Birth:</span>
            <span className="font-bold text-slate-800">
              {pd.dob ? new Date(pd.dob).toLocaleDateString() : '15/06/2004'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Age / Sex:</span>
            <span className="font-bold text-slate-800">
              {pd.age || 20} Yrs / {pd.sex || 'Male'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Nationality / State:</span>
            <span className="font-bold text-slate-800">
              {pd.nationality || 'Indian'} ({pd.state || 'Tamil Nadu'})
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Community / Caste:</span>
            <span className="font-bold text-slate-800">
              {pd.community || 'OBC'} - {pd.caste || 'Brahmin'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Mother Tongue:</span>
            <span className="font-bold text-slate-800">{pd.motherTongue || 'Tamil'}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Known Languages:</span>
            <span className="font-bold text-slate-800">
              {Array.isArray(pd.otherLanguages) ? pd.otherLanguages.join(', ') : 'English, Tamil, Hindi'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Chronic Illness:</span>
            <span className="font-bold text-slate-800">{pd.chronicIllness || 'None'}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block">Vision Problem:</span>
            <span className="font-bold text-slate-800">
              {pd.visionProblem ? 'Spectacles' : 'Normal Vision'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Page 1: Family Details & Addresses */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Page 1 • Family Details &amp; Socio-Economic Background
            </h3>
          </div>
          <span className="text-xs text-slate-400">Parent / Guardian</span>
        </div>

        <div className="p-6 space-y-6">
          {/* Parents Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Particulars</th>
                  <th className="py-2.5 px-3">Father</th>
                  <th className="py-2.5 px-3">Mother</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-500">Name</td>
                  <td className="py-2 px-3 font-bold text-slate-800">{fd.fatherName || 'Swaminathan M.'}</td>
                  <td className="py-2 px-3 font-bold text-slate-800">{fd.motherName || 'Meenakshi S.'}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-500">Education</td>
                  <td className="py-2 px-3 text-slate-700">{fd.fatherEducation || 'B.Com'}</td>
                  <td className="py-2 px-3 text-slate-700">{fd.motherEducation || 'B.Sc Maths'}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-500">Occupation</td>
                  <td className="py-2 px-3 text-slate-700">{fd.fatherOccupation || 'Senior Accountant'}</td>
                  <td className="py-2 px-3 text-slate-700">{fd.motherOccupation || 'Home Maker'}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-500">Mobile</td>
                  <td className="py-2 px-3 text-slate-700">{fd.fatherMobile || '+91 98400 11223'}</td>
                  <td className="py-2 px-3 text-slate-700">{fd.motherMobile || '+91 98400 22334'}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-500">Annual Income</td>
                  <td className="py-2 px-3 font-semibold text-emerald-700">₹{fd.fatherAnnualIncome?.toLocaleString() || '6,50,000'}</td>
                  <td className="py-2 px-3 text-slate-700">₹{fd.motherAnnualIncome?.toLocaleString() || '0'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Addresses and Guardian */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Home className="w-3.5 h-3.5 text-slate-400" />
                <span>Permanent Address</span>
              </div>
              <p className="text-slate-600">
                {fd.studentPermanentAddress || 'Plot 12, Anna Nagar, Tiruvallur, Tamil Nadu 602001'}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Local Guardian</span>
              </div>
              <p className="text-slate-600">
                {fd.localGuardian?.name ? `${fd.localGuardian.name} (${fd.localGuardian.contactNumber})` : 'K. Ramanathan (+91 94440 12345) - Tiruvallur'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Page 1: Academic History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Page 1 • Academic History (Schooling &amp; Admission)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Verified Credentials</span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* 10th SSLC */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-800 text-sm">10th Std / SSLC</span>
              <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-sm">
                {ah.sslcPercentage || 94.2}%
              </span>
            </div>
            <div className="space-y-1 text-slate-600">
              <div><span className="font-semibold text-slate-500">School: </span>{ah.sslcSchoolName || 'Vivekananda Vidyalaya Matriculation HSS'}</div>
              <div><span className="font-semibold text-slate-500">Board: </span>{ah.sslcBoard || 'State Board'} ({ah.sslcMedium || 'English'} Medium)</div>
              <div><span className="font-semibold text-slate-500">Total Marks: </span>{ah.sslcMarks || 471}/500</div>
              <div><span className="font-semibold text-slate-500">Year of Passing: </span>{ah.sslcYearOfPassing || 2020}</div>
            </div>
          </div>

          {/* 12th HSC */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-800 text-sm">12th Std / HSC</span>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-sm">
                Cutoff: {ah.hscCutoff || 193.5}/200
              </span>
            </div>
            <div className="space-y-1 text-slate-600">
              <div><span className="font-semibold text-slate-500">School: </span>{ah.hscSchoolName || 'Vivekananda Vidyalaya Matriculation HSS'}</div>
              <div><span className="font-semibold text-slate-500">Board: </span>{ah.hscBoard || 'State Board'}</div>
              <div className="grid grid-cols-4 gap-1 text-[11px] pt-1">
                <div className="p-1.5 bg-white rounded-sm border border-slate-200 text-center">
                  <div className="text-slate-400 font-bold">Maths</div>
                  <div className="font-bold text-slate-800">{ah.hscMathsMark || 98}</div>
                </div>
                <div className="p-1.5 bg-white rounded-sm border border-slate-200 text-center">
                  <div className="text-slate-400 font-bold">Physics</div>
                  <div className="font-bold text-slate-800">{ah.hscPhysicsMark || 96}</div>
                </div>
                <div className="p-1.5 bg-white rounded-sm border border-slate-200 text-center">
                  <div className="text-slate-400 font-bold">Chemistry</div>
                  <div className="font-bold text-slate-800">{ah.hscChemistryMark || 95}</div>
                </div>
                <div className="p-1.5 bg-white rounded-sm border border-slate-200 text-center">
                  <div className="text-slate-400 font-bold">CS / Bio</div>
                  <div className="font-bold text-slate-800">{ah.hscBiologyOrCsMark || 99}</div>
                </div>
              </div>
              <div className="pt-2 flex justify-between text-slate-500 font-medium">
                <span>Overall: {ah.hscPercentage || 96.5}%</span>
                <span>{ah.hscClass || 'First Class with Distinction'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
