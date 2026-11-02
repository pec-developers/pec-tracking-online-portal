import { useEffect, useState } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { useStudentStore } from './store/useStudentStore';
import { Header } from './components/layout/Header';
import { LoginModal } from './components/auth/LoginModal';
import { BookletCover } from './components/booklet/BookletCover';
import { PersonalProfile } from './components/booklet/PersonalProfile';
import { AmbitionSwot } from './components/booklet/AmbitionSwot';
import { SemesterNavigator } from './components/booklet/SemesterNavigator';
import { PageAActivity } from './components/booklet/PageAActivity';
import { PageBChart } from './components/booklet/PageBChart';
import { PageCAcademic } from './components/booklet/PageCAcademic';
import { PageCSessions } from './components/booklet/PageCSessions';
import { PageDReview } from './components/booklet/PageDReview';
import { Page35Exit } from './components/booklet/Page35Exit';
import { MentorDashboard } from './components/dashboards/MentorDashboard';
import { FacultyDashboard } from './components/dashboards/FacultyDashboard';
import { LeadershipDashboard } from './components/dashboards/LeadershipDashboard';
import { Layers, Award, User } from 'lucide-react';

function App() {
  const { user, isAuthenticated, initialize } = useAuthStore();
  const { currentStudent, fetchStudent } = useStudentStore();

  const [activeTab, setActiveTab] = useState<'booklet' | 'dashboard'>('booklet');
  const [selectedStudentId, setSelectedStudentId] = useState('111422104001');

  // Booklet Navigation
  const [bookletSection, setBookletSection] = useState<'profile' | 'semesters' | 'exit'>('semesters');
  const [profileSubTab, setProfileSubTab] = useState<'personal' | 'ambition'>('personal');
  const [currentSemester, setCurrentSemester] = useState(4);
  const [semesterSubTab, setSemesterSubTab] = useState<
    'activity' | 'chart' | 'academic' | 'sessions' | 'review'
  >('academic');

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'STUDENT') {
        setSelectedStudentId(user.username);
        setActiveTab('booklet');
      } else if (user.role === 'PARENT') {
        const studentReg = user.username.replace('parent_', '');
        setSelectedStudentId(studentReg);
        setActiveTab('booklet');
      } else {
        // Staff roles default to dashboard
        setActiveTab('dashboard');
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (selectedStudentId) {
      fetchStudent(selectedStudentId);
    }
  }, [selectedStudentId, fetchStudent]);

  if (!isAuthenticated) {
    return <LoginModal />;
  }

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
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Header */}
      <Header
        selectedStudentId={selectedStudentId}
        onSelectStudent={setSelectedStudentId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: Role Dashboard */}
        {activeTab === 'dashboard' && isStaff && (
          <div>
            {user.role === 'MENTOR' && (
              <MentorDashboard
                onSelectStudent={(id) => {
                  setSelectedStudentId(id);
                  setActiveTab('booklet');
                }}
              />
            )}
            {user.role === 'FACULTY' && <FacultyDashboard />}
            {(user.role === 'CLASS_COORDINATOR' ||
              user.role === 'HOD' ||
              user.role === 'PRINCIPAL' ||
              user.role === 'ADMIN') && (
              <LeadershipDashboard
                onSelectStudent={(id) => {
                  setSelectedStudentId(id);
                  setActiveTab('booklet');
                }}
              />
            )}
          </div>
        )}

        {/* VIEW 2: Digital Mentoring Booklet */}
        {(activeTab === 'booklet' || !isStaff) && (
          <div>
            {/* Student Cover Card */}
            <BookletCover student={currentStudent} />

            {/* Booklet Major Sections Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-2 mb-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setBookletSection('profile')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                  bookletSection === 'profile'
                    ? 'bg-[#a61612] text-white border-[#a61612] shadow-xs'
                    : 'bg-white text-slate-600 border-transparent hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>General Profile (Cover, Inside Cover &amp; Pages 1–2)</span>
              </button>

              <button
                type="button"
                onClick={() => setBookletSection('semesters')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                  bookletSection === 'semesters'
                    ? 'bg-[#a61612] text-white border-[#a61612] shadow-xs'
                    : 'bg-white text-slate-600 border-transparent hover:bg-slate-50'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Semester Tracker (Pages A, B, C &amp; D for Sem 1–8)</span>
              </button>

              <button
                type="button"
                onClick={() => setBookletSection('exit')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                  bookletSection === 'exit'
                    ? 'bg-[#a61612] text-white border-[#a61612] shadow-xs'
                    : 'bg-white text-slate-600 border-transparent hover:bg-slate-50'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Program Exit &amp; Placements (Page 35)</span>
              </button>
            </div>

            {/* SECTION 1: General Profile */}
            {bookletSection === 'profile' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setProfileSubTab('personal')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      profileSubTab === 'personal'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Personal, Family &amp; Schooling (Inside Cover &amp; Page 1)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileSubTab('ambition')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      profileSubTab === 'ambition'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Career Ambition, Living Style &amp; SWOT (Page 2)
                  </button>
                </div>

                {profileSubTab === 'personal' && (
                  <PersonalProfile student={currentStudent} />
                )}
                {profileSubTab === 'ambition' && (
                  <AmbitionSwot student={currentStudent} />
                )}
              </div>
            )}

            {/* SECTION 2: Semester Tracker (Pages A, B, C & D) */}
            {bookletSection === 'semesters' && (
              <div>
                <SemesterNavigator
                  currentSemester={currentSemester}
                  onSelectSemester={setCurrentSemester}
                  currentSubTab={semesterSubTab}
                  onSelectSubTab={setSemesterSubTab}
                />

                {semesterSubTab === 'activity' && (
                  <PageAActivity
                    studentId={selectedStudentId}
                    semester={currentSemester}
                  />
                )}
                {semesterSubTab === 'chart' && (
                  <PageBChart
                    studentId={selectedStudentId}
                    semester={currentSemester}
                  />
                )}
                {semesterSubTab === 'academic' && (
                  <PageCAcademic
                    studentId={selectedStudentId}
                    semester={currentSemester}
                  />
                )}
                {semesterSubTab === 'sessions' && (
                  <PageCSessions
                    studentId={selectedStudentId}
                    semester={currentSemester}
                  />
                )}
                {semesterSubTab === 'review' && (
                  <PageDReview
                    studentId={selectedStudentId}
                    semester={currentSemester}
                  />
                )}
              </div>
            )}

            {/* SECTION 3: Program Exit (Page 35) */}
            {bookletSection === 'exit' && (
              <Page35Exit studentId={selectedStudentId} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Prathyusha Engineering College • PECTOP Student Mentoring Portal • Digital Booklet System
      </footer>
    </div>
  );
}

export default App;
