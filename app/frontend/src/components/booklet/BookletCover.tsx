import React from 'react';
import { Badge } from '../common/Badge';
import { User, Image as ImageIcon } from 'lucide-react';

interface BookletCoverProps {
  student: any;
}

export const BookletCover: React.FC<BookletCoverProps> = ({ student }) => {
  if (!student) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      {/* College Header Bar */}
      <div className="bg-[#a61612] px-6 py-4 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xl">
            PEC
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              PRATHYUSHA ENGINEERING COLLEGE
            </h1>
            <p className="text-xs text-white/80">
              ESTD. 2001 • Approved by AICTE &amp; Affiliated to Anna University • NBA &amp; NAAC 'A' Grade
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Student Mentoring Record
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 4 Photo Slots */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Identification Photos
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 aspect-3/4 text-center">
                {student.studentPhotoUrl ? (
                  <img
                    src={student.studentPhotoUrl}
                    alt="Student"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <User className="w-8 h-8 text-slate-400 mb-1" />
                    <span className="text-[10px] font-semibold text-slate-600">
                      Student
                    </span>
                  </>
                )}
              </div>
              <div className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 aspect-3/4 text-center">
                <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                <span className="text-[10px] font-semibold text-slate-500">
                  Father
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 aspect-3/4 text-center">
                <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                <span className="text-[10px] font-semibold text-slate-500">
                  Mother
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 aspect-3/4 text-center">
                <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                <span className="text-[10px] font-semibold text-slate-500">
                  Passout
                </span>
              </div>
            </div>
          </div>

          {/* Student Dossier Overview */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {student.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-slate-600">
                      Reg No: <span className="text-[#a61612] font-mono">{student.registerNumber}</span>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm text-slate-500">
                      Adm No: <span className="font-mono">{student.admissionNumber}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="maroon">{student.branch}</Badge>
                  <Badge variant="blue">Sec {student.section}</Badge>
                  {student.lateralEntry && (
                    <Badge variant="purple">Lateral Entry</Badge>
                  )}
                </div>
              </div>

              {/* Booklet Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Academic Batch
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {student.batchStart} - {student.batchEnd}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Admission Type
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {student.admissionType}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Blood Group
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {student.personalDetails?.bloodGroup || 'B+'}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Food Habit
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {student.personalDetails?.foodHabit || 'VEG'}
                  </div>
                </div>
              </div>

              {/* Contact Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Mobile: </span>
                  {student.personalDetails?.contactMobile || '+91 98401 23456'}
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Email: </span>
                  {student.personalDetails?.email || 'student@prathyusha.edu.in'}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Booklet Format: Rev. 2024</span>
              <span>Prathyusha Campus Tracking Online Portal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

