import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import {
  GraduationCap,
  Lock,
  User,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { login, isLoading, error } = useAuthStore();
  const [username, setUsername] = useState('111422104001');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch {
      // Handled in store
    }
  };

  const quickRoles = [
    { role: 'Student', username: '111422104001', desc: 'Aravind Swaminathan (CSE Sem 4)', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { role: 'Mentor', username: 'mentor1', desc: 'Dr. Ramesh Kumar (Faculty Mentor)', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { role: 'Coordinator', username: 'coordinator1', desc: 'Dr. S. K. Sharma (Class Coord)', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { role: 'HOD', username: 'hod_cse', desc: 'Dr. Priya V. (HOD - CSE)', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { role: 'Principal', username: 'principal', desc: 'Dr. K. R. Raman (Principal)', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { role: 'Faculty', username: 'faculty1', desc: 'Prof. Suresh Balan (Teaching)', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { role: 'Parent', username: 'parent_111422104001', desc: 'Swaminathan M. (Parent)', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { role: 'Admin', username: 'admin', desc: 'Super Administrator', color: 'bg-red-50 text-red-700 border-red-200' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-[#a61612] flex items-center justify-center text-white shadow-lg mb-4">
          <GraduationCap className="w-9 h-9" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Prathyusha Engineering College
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-medium">
          PECTOP: Student Mentoring Online Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Username / Register Number
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#a61612] focus:border-transparent transition"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#a61612] focus:border-transparent transition"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#a61612] hover:bg-[#82100d] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#a61612] transition disabled:opacity-50"
            >
              {isLoading ? (
                'Signing in...'
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Role Switcher */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>1-Click Test Login as Role</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickRoles.map((qr) => (
                <button
                  key={qr.role}
                  type="button"
                  onClick={() => {
                    setUsername(qr.username);
                    setPassword('password123');
                    login(qr.username, 'password123');
                  }}
                  className={`flex flex-col items-start p-2 rounded-lg border text-left transition hover:shadow-xs hover:scale-[1.02] ${qr.color}`}
                >
                  <span className="text-xs font-bold leading-none">
                    {qr.role}
                  </span>
                  <span className="text-[10px] opacity-80 truncate max-w-full mt-0.5">
                    {qr.username}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
