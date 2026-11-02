import React, { useEffect, useState } from 'react';
import { useEndProgramStore } from '../../store/useEndProgramStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Badge } from '../common/Badge';
import {
  GraduationCap,
  Briefcase,
  FolderGit2,
  PhoneCall,
  CheckCircle2,
  Plus,
  PenTool,
} from 'lucide-react';

interface Page35ExitProps {
  studentId: string;
}

export const Page35Exit: React.FC<Page35ExitProps> = ({ studentId }) => {
  const {
    summary,
    fetchEndProgramSummary,
    addProject,
    addPlacement,
    signOff,
    isLoading,
  } = useEndProgramStore();

  const { user } = useAuthStore();
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddPlacement, setShowAddPlacement] = useState(false);

  // Forms state
  const [newProject, setNewProject] = useState({
    year: 4,
    semester: 7,
    title: 'IoT-Based Smart Energy Monitoring & Grid Analytics',
    guideName: 'Dr. Ramesh Kumar',
    presentationOutside: 'IEEE International Conference on Smart Grids 2025',
    recognitionReceived: 'Best Innovation Paper Award',
    institutionalSupport: 'Seed Grant of Rs. 25,000 from Prathyusha R&D Cell',
  });

  const [newPlacement, setNewPlacement] = useState({
    year: 4,
    semester: 7,
    date: '2025-10-18',
    venue: 'College Placement Cell Auditorium',
    companyName: 'Zoho Corporation',
    role: 'Software Development Engineer',
    packageLpa: 8.5,
    outcome: 'PLACED',
  });

  useEffect(() => {
    fetchEndProgramSummary(studentId);
  }, [studentId, fetchEndProgramSummary]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProject(studentId, newProject);
      setShowAddProject(false);
    } catch {
      // Handled in store
    }
  };

  const handleAddPlacement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPlacement(studentId, newPlacement);
      setShowAddPlacement(false);
    } catch {
      // Handled in store
    }
  };

  const isMentor = user?.role === 'MENTOR' || user?.role === 'ADMIN';
  const isHOD = user?.role === 'HOD' || user?.role === 'ADMIN';

  const semData = Array.isArray(summary?.semesterWiseData)
    ? summary.semesterWiseData
    : [
        { semester: 1, year: 1, sgpa: 8.25, cgpa: 8.25, attendancePercentage: 94.5 },
        { semester: 2, year: 1, sgpa: 8.40, cgpa: 8.32, attendancePercentage: 96.0 },
        { semester: 3, year: 2, sgpa: 8.30, cgpa: 8.31, attendancePercentage: 91.5 },
        { semester: 4, year: 2, sgpa: 8.75, cgpa: 8.42, attendancePercentage: 95.0 },
        { semester: 5, year: 3, sgpa: 8.60, cgpa: 8.46, attendancePercentage: 97.2 },
        { semester: 6, year: 3, sgpa: 8.90, cgpa: 8.53, attendancePercentage: 98.0 },
        { semester: 7, year: 4, sgpa: 9.10, cgpa: 8.61, attendancePercentage: 99.0 },
        { semester: 8, year: 4, sgpa: 9.20, cgpa: 8.68, attendancePercentage: 100.0 },
      ];

  const projects = Array.isArray(summary?.miniProjects) ? summary.miniProjects : [];
  const placements = Array.isArray(summary?.placements) ? summary.placements : [];

  return (
    <div className="space-y-6">
      {/* 1. Header & Graduation Status */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-900 px-6 py-4 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Page 35 • Program Exit &amp; 8-Semester Completion Dossier
              </h2>
              <p className="text-xs text-slate-400">
                Consolidated Academic Record, Innovations, Placements &amp; Alumni Contact
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={summary?.graduationStatus === 'GRADUATED' ? 'green' : 'amber'}
            >
              {summary?.graduationStatus === 'GRADUATED' ? 'OFFICIALLY GRADUATED' : 'IN PROGRESS'}
            </Badge>
          </div>
        </div>

        {/* Graduation Key Metrics */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Final CGPA</span>
            <span className="text-xl font-extrabold text-emerald-700 block mt-0.5">
              {summary?.finalCgpa || 8.68} / 10.0
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Total Credits</span>
            <span className="text-xl font-extrabold text-slate-900 block mt-0.5">
              {summary?.totalCreditsEarned || 164} Credits
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl sm:col-span-2">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Degree Classification</span>
            <span className="text-sm font-bold text-slate-800 block mt-1">
              {summary?.graduationClassification?.replace(/_/g, ' ') || 'FIRST CLASS WITH DISTINCTION'}
            </span>
          </div>
        </div>

        {/* 8-Semester Consolidated Table */}
        <div className="px-6 pb-6 overflow-x-auto text-xs">
          <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Semester</th>
                <th className="py-2.5 px-3">Year</th>
                <th className="py-2.5 px-3">SGPA</th>
                <th className="py-2.5 px-3">CGPA</th>
                <th className="py-2.5 px-3">Attendance %</th>
                <th className="py-2.5 px-3">Fee Status</th>
                <th className="py-2.5 px-3">Scholarships</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {semData.map((s: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-bold text-slate-800">Sem {s.semester}</td>
                  <td className="py-2 px-3 text-slate-600">Year {s.year}</td>
                  <td className="py-2 px-3 font-mono font-bold text-slate-800">{s.sgpa || '-'}</td>
                  <td className="py-2 px-3 font-mono font-semibold text-emerald-700">{s.cgpa || '-'}</td>
                  <td className="py-2 px-3 font-mono">{s.attendancePercentage ? `${s.attendancePercentage}%` : '-'}</td>
                  <td className="py-2 px-3">
                    <Badge variant="green" size="sm">Cleared</Badge>
                  </td>
                  <td className="py-2 px-3 text-slate-600">
                    {s.scholarships?.length > 0 ? 'Merit Scholar' : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Mini-Projects & Innovations */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Mini-Projects, Publications &amp; Outside Presentations
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowAddProject(!showAddProject)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          {showAddProject && (
            <form onSubmit={handleAddProject} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-800 text-xs">Record Project Details</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Guide Name</label>
                  <input
                    type="text"
                    required
                    value={newProject.guideName}
                    onChange={(e) => setNewProject({ ...newProject, guideName: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Outside Presentation (IEEE / Conference)</label>
                <input
                  type="text"
                  value={newProject.presentationOutside}
                  onChange={(e) => setNewProject({ ...newProject, presentationOutside: e.target.value })}
                  className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-3 py-1.5 text-slate-600 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-1.5 bg-[#a61612] text-white rounded-lg text-xs font-semibold"
                >
                  Save Project
                </button>
              </div>
            </form>
          )}

          {projects.length === 0 ? (
            <p className="text-slate-400 italic">No projects recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {projects.map((proj: any, idx: number) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{proj.title}</span>
                    <Badge variant="blue" size="sm">Sem {proj.semester}</Badge>
                  </div>
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-700">Guide: </span>{proj.guideName}
                  </div>
                  {proj.presentationOutside && (
                    <div className="text-slate-600">
                      <span className="font-semibold text-slate-700">Presentation: </span>{proj.presentationOutside}
                    </div>
                  )}
                  {proj.recognitionReceived && (
                    <div className="text-emerald-700 font-semibold">
                      <span>Award / Recognition: </span>{proj.recognitionReceived}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Campus Placements & Offers */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Campus Placements &amp; Career Milestones
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowAddPlacement(!showAddPlacement)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Placement</span>
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          {showAddPlacement && (
            <form onSubmit={handleAddPlacement} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-800 text-xs">Record Placement Offer</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newPlacement.companyName}
                    onChange={(e) => setNewPlacement({ ...newPlacement, companyName: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={newPlacement.role}
                    onChange={(e) => setNewPlacement({ ...newPlacement, role: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Package (LPA)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newPlacement.packageLpa}
                    onChange={(e) => setNewPlacement({ ...newPlacement, packageLpa: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Outcome</label>
                  <select
                    value={newPlacement.outcome}
                    onChange={(e) => setNewPlacement({ ...newPlacement, outcome: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="PLACED">PLACED</option>
                    <option value="HIGHER_STUDIES">HIGHER STUDIES</option>
                    <option value="ENTREPRENEUR">ENTREPRENEUR</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPlacement(false)}
                  className="px-3 py-1.5 text-slate-600 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-1.5 bg-[#a61612] text-white rounded-lg text-xs font-semibold"
                >
                  Save Placement
                </button>
              </div>
            </form>
          )}

          {placements.length === 0 ? (
            <p className="text-slate-400 italic">No placement offers recorded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {placements.map((plc: any, idx: number) => (
                <div key={idx} className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{plc.companyName}</span>
                    <Badge variant="green" size="sm">₹{plc.packageLpa} LPA</Badge>
                  </div>
                  <div className="text-slate-700">
                    <span className="font-semibold text-slate-500">Designation: </span>
                    {plc.role}
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1">
                    <span>Date: {plc.date}</span>
                    <span className="font-semibold text-emerald-800">{plc.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Alumni Exit Contact & Graduation Clearances */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase">
              Permanent Alumni Exit Contact &amp; 2-Tier Degree Clearance
            </h3>
          </div>
          <span className="text-xs text-slate-400">Institutional Exit</span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Permanent Alumni Address */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">
              Alumni Communication Address
            </span>
            <p className="text-slate-700 font-medium">
              {summary?.exitAddress || 'Plot No. 42, Annai Nagar, 3rd Cross Street'}
            </p>
            <p className="text-slate-600">
              {summary?.exitCity || 'Tiruvallur'}, {summary?.exitState || 'Tamil Nadu'} - {summary?.exitPincode || '602025'}
            </p>
            <div className="pt-2 border-t border-slate-200 text-slate-600 space-y-1">
              <div><span className="font-semibold text-slate-700">Mobile: </span>{summary?.exitMobile || '+91 98401 23456'}</div>
              <div><span className="font-semibold text-slate-700">Permanent Email: </span>{summary?.exitEmail || 'aravind.swe@gmail.com'}</div>
            </div>
          </div>

          {/* 2-Tier Graduation Clearance Chain */}
          <div className="space-y-3">
            <span className="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">
              Graduation Sign-Off Chain
            </span>

            {/* Mentor Sign-off */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Mentor Clearance</span>
                {summary?.mentorSignedAt ? (
                  <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Signed {new Date(summary.mentorSignedAt).toLocaleDateString()}</span>
                  </span>
                ) : (
                  <span className="text-slate-400 italic text-[11px]">Awaiting Mentor clearance</span>
                )}
              </div>
              {isMentor && !summary?.mentorSignedAt && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => signOff(studentId, 'MENTOR', 'Exemplary academic record')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 text-xs"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Sign Mentor Clearance</span>
                </button>
              )}
            </div>

            {/* HOD Sign-off */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">HOD Degree Clearance</span>
                {summary?.hodSignedAt ? (
                  <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Endorsed {new Date(summary.hodSignedAt).toLocaleDateString()}</span>
                  </span>
                ) : (
                  <span className="text-slate-400 italic text-[11px]">Awaiting HOD clearance</span>
                )}
              </div>
              {isHOD && !summary?.hodSignedAt && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => signOff(studentId, 'HOD', 'Degree awarded with Distinction')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#a61612] text-white font-bold rounded-lg hover:bg-[#82100d] text-xs"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Endorse Degree Clearance</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
