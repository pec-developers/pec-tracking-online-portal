import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Badge } from '../common/Badge';
import {
  LogOut,
  User as UserIcon,
  BookOpen,
} from 'lucide-react';

interface HeaderProps {
  selectedStudentId?: string;
  onSelectStudent?: (id: string) => void;
  activeTab: 'booklet' | 'dashboard';
  setActiveTab: (tab: 'booklet' | 'dashboard') => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedStudentId,
  onSelectStudent,
  activeTab,
  setActiveTab,
}) => {
  const { user, logout } = useAuthStore();

  const isStaff =
    user &&
    [
      'MENTOR',
      'FACULTY',
      'CLASS_COORDINATOR',
      'HOD',
      'PRINCIPAL',
      'ADMIN',
    ].includes(user.role);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#a61612] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              PEC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-lg">
                  PECTOP
                </span>
                <span className="hidden sm:inline-block text-xs bg-red-100 text-[#a61612] font-semibold px-2 py-0.5 rounded-full">
                  Mentoring Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Prathyusha Engineering College • Student Record of Mentoring
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Dashboard vs Booklet) */}
          {isStaff && (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                My Dashboard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('booklet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'booklet'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Digital Booklet
              </button>
            </div>
          )}

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            {/* Student Search for Staff */}
            {isStaff && activeTab === 'booklet' && (
              <div className="hidden lg:flex items-center gap-1 text-xs">
                <span className="text-slate-500">Student Reg:</span>
                <input
                  type="text"
                  value={selectedStudentId || ''}
                  onChange={(e) => onSelectStudent?.(e.target.value)}
                  placeholder="e.g. 111422104001"
                  className="px-2 py-1 text-xs border border-slate-300 rounded-md bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#a61612] w-32"
                />
              </div>
            )}

            {/* User Info */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-800">
                  {user?.name}
                </div>
                <div className="flex items-center justify-end gap-1.5">
                  <Badge variant="maroon" size="sm">
                    {user?.role}
                  </Badge>
                  {user?.department && (
                    <span className="text-[10px] text-slate-400">
                      {user.department}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
