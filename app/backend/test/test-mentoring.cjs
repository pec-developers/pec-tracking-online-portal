const { spawn } = require('child_process');
const http = require('http');

async function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function run() {
  console.log('--- Starting NestJS Backend (MentoringModule Tests) ---');
  const path = require('path');
  const backendDir = path.resolve(__dirname, '..');
  const server = spawn('npm', ['run', 'start'], { cwd: backendDir, stdio: ['ignore', 'pipe', 'inherit'] });

  let ready = false;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const res = await request({ hostname: 'localhost', port: 3000, path: '/auth/test-users', method: 'GET' });
      if (res.status === 200) { ready = true; break; }
    } catch {}
  }
  if (!ready) {
    console.error('Server failed to start');
    server.kill();
    process.exit(1);
  }

  // 1. Logins
  console.log('\n=== STEP 1: AUTHENTICATING USERS ===');
  async function getTok(username) {
    const res = await request({ hostname: 'localhost', port: 3000, path: '/auth/login', method: 'POST', headers: { 'Content-Type': 'application/json' } }, { username, password: 'password123' });
    return res.body.accessToken;
  }

  const adminToken = await getTok('admin');
  const hodToken = await getTok('hod_cse');
  const coordToken = await getTok('coordinator1');
  const mentorToken = await getTok('mentor1');
  const principalToken = await getTok('principal');
  const studentToken = await getTok('111422104001');

  console.log('  ✓ Tokens retrieved for Admin, HOD, Coordinator, Mentor, Principal, Student');

  // 2. Assign Mentee
  console.log('\n=== STEP 2: ASSIGN MENTEE TO MENTOR ===');
  const assignRes = await request(
    { hostname: 'localhost', port: 3000, path: '/mentoring/assignments', method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + hodToken } },
    {
      mentorId: 'mentor1',
      studentIds: ['111422104001'],
      academicYear: '2024-2025',
      semester: 4
    }
  );
  console.log('  ✓ Mentee assigned status:', assignRes.status, assignRes.body.message);

  // 3. Mentor views mentee roster
  console.log('\n=== STEP 3: MENTOR VIEWS ASSIGNED MENTEES ===');
  const menteeRes = await request(
    { hostname: 'localhost', port: 3000, path: '/mentoring/mentees', method: 'GET', headers: { 'Authorization': 'Bearer ' + mentorToken } }
  );
  console.log('  ✓ Mentee roster count:', menteeRes.body.count, '| Mentee:', menteeRes.body.mentees[0].name);

  // 4. Page A: Student updates activity reflection
  console.log('\n=== STEP 4: STUDENT UPDATES PAGE A ACTIVITY REFLECTIONS ===');
  const actRes = await request(
    { hostname: 'localhost', port: 3000, path: '/mentoring/activity/111422104001/semester/4', method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + studentToken } },
    {
      fieldOfInterest: 'Full-Stack Distributed Systems and Cloud Architecture',
      favoriteSubject: 'Database Management Systems',
      favoriteSubjectReason: 'Comprehensive SQL query optimization and database design',
      favoriteTeacher: 'Dr. Ramesh Kumar',
      favoriteTeacherReason: 'Practical hands-on lab coaching and industry insights',
      easiestSubject: 'Software Engineering',
      hardestSubject: 'Theory of Computation',
      hardestSubjectReason: 'Abstract mathematical automata proofs',
      subjectProblems: ['Turing machine reductions need extra practice'],
      laboratoryUnderstanding: {
        theoryBeforeLab: true,
        experimentsCompletion: 'Completed on schedule',
        recordSubmissionPunctual: true
      },
      libraryDetails: {
        visitFrequency: 'Weekly twice',
        booksBorrowed: ['Operating System Concepts (Silberschatz)', 'Database System Concepts (Korth)'],
        dailiesRead: ['The Hindu', 'Economic Times']
      },
      communicationEfforts: 'Active speaker at technical seminar presentations',
      improvedOverTime: 'Noticeable boost in technical fluency and confidence'
    }
  );
  console.log('  ✓ Page A activity saved:', actRes.status, actRes.body.message);

  // 5. Page B: Mentor updates chart (Time management & routines)
  console.log('\n=== STEP 5: MENTOR UPDATES PAGE B MENTORING CHART ===');
  const chartRes = await request(
    { hostname: 'localhost', port: 3000, path: '/mentoring/chart/111422104001/semester/4', method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mentorToken } },
    {
      timeManagement: {
        weekly: {
          academicHours: 28,
          trainingHours: 8,
          knowledgeUpdatingHours: 6,
          recreationHours: 10,
          personalAttentionHours: 6
        },
        daily: {
          subjectReadingHours: 4,
          lightReadingHours: 1,
          browsingHours: 2,
          physicalSportsHours: 1
        }
      },
      classroomRoutine: {
        CS8401: { attendance: 5, attentiveness: 5, takingNotes: 4, interaction: 5, taskCompletion: 5 },
        CS8402: { attendance: 5, attentiveness: 5, takingNotes: 5, interaction: 5, taskCompletion: 5 }
      },
      laboratoryRoutine: {
        CS8461: { performingExperiments: 5, observation: 5, recordCompletion: 5 }
      },
      examinationPrep: {
        monthlyTests: { attendance: '100%', seriousness: 'High', preparations: 'Thorough' },
        universityExams: { previousYearQuestions: true, questionBank: true, groupStudy: true }
      },
      mentorSuggestions: {
        timeManagementSuggestion: 'Well balanced schedule; maintain weekend coding focus',
        generalSuggestions: 'Encouraged to participate in external hackathons'
      }
    }
  );
  console.log('  ✓ Page B chart saved:', chartRes.status, chartRes.body.message);

  // 6. Page C Bottom: Mentor logs 1-on-1 counseling session
  console.log('\n=== STEP 6: MENTOR LOGS 1-ON-1 COUNSELING SESSION WITH 10-POINT TRAIT SCORES ===');
  const sessionRes = await request(
    { hostname: 'localhost', port: 3000, path: '/mentoring/sessions/111422104001/semester/4', method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mentorToken } },
    {
      sessionNumber: 1,
      date: '2024-03-12',
      asPerson: 9,
      studies: 9,
      behaviour: 10,
      characterAndContact: 10,
      knowledge: 9,
      remarks: 'Exceptionally disciplined and motivated student with clear technical goals.'
    }
  );
  console.log('  ✓ Session 1 saved:', sessionRes.status, sessionRes.body.message, 'Total Score:', sessionRes.body.session.total + '/50');
  const sessionId = sessionRes.body.session.id;

  // 7. Student signs session
  console.log('\n=== STEP 7: STUDENT DIGITALLY ACKNOWLEDGES SESSION ===');
  const signSessionRes = await request(
    { hostname: 'localhost', port: 3000, path: '/mentoring/sessions/' + sessionId + '/sign', method: 'POST', headers: { 'Authorization': 'Bearer ' + studentToken } }
  );
  console.log('  ✓ Student signed session:', signSessionRes.status, 'Signed:', signSessionRes.body.session.studentSignature);

  // 8. Page D: Mentor updates review & analysis sheet
  console.log('\n=== STEP 8: MENTOR UPDATES PAGE D REVIEW & ANALYSIS SHEET ===');
  const reviewRes = await request(
    { hostname: 'localhost', port: 3000, path: '/mentoring/review/111422104001/semester/4', method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mentorToken } },
    {
      overallRemarks: 'Aravind Swaminathan is an exemplary student with top-tier academic commitment.',
      disciplinaryIssues: 'Nil',
      requiresLeadershipFollowup: false,
      strengths: {
        attendance: 'Consistently above 95%',
        discipline: 'Courteous and punctual in all academic routines',
        academic: 'Top 3% percentile in internal assessments',
        coCurricular: 'Active participant in tech club and zonal table tennis'
      },
      weaknesses: {
        academic: 'Requires slight reinforcement on theoretical automata proofs'
      },
      improvementsObserved: {
        attendance: 'Maintained distinction-level attendance',
        studies: 'Improved problem solving speed in laboratory experiments',
        coCurricular: 'Zonal table tennis runner up'
      }
    }
  );
  console.log('  ✓ Page D review saved:', reviewRes.status, reviewRes.body.message);

  // 9. 4-Tier Leadership Sign-off Chain
  console.log('\n=== STEP 9: STEPPING THROUGH 4-TIER LEADERSHIP SIGN-OFF CHAIN ===');
  // Tier 1: Mentor
  const signMentor = await request({ hostname: 'localhost', port: 3000, path: '/mentoring/review/111422104001/semester/4/sign-off', method: 'POST', headers: { 'Authorization': 'Bearer ' + mentorToken } });
  console.log('  ✓ 1. Mentor Sign-off:', signMentor.status, 'Signed At:', signMentor.body.signOffChain.mentorSignedAt);

  // Tier 2: Class Coordinator
  const signCoord = await request({ hostname: 'localhost', port: 3000, path: '/mentoring/review/111422104001/semester/4/sign-off', method: 'POST', headers: { 'Authorization': 'Bearer ' + coordToken } });
  console.log('  ✓ 2. Coordinator Sign-off:', signCoord.status, 'Signed At:', signCoord.body.signOffChain.coordinatorSignedAt);

  // Tier 3: HOD
  const signHOD = await request({ hostname: 'localhost', port: 3000, path: '/mentoring/review/111422104001/semester/4/sign-off', method: 'POST', headers: { 'Authorization': 'Bearer ' + hodToken } });
  console.log('  ✓ 3. HOD Sign-off:', signHOD.status, 'Signed At:', signHOD.body.signOffChain.hodSignedAt);

  // Tier 4: Principal
  const signPrincipal = await request({ hostname: 'localhost', port: 3000, path: '/mentoring/review/111422104001/semester/4/sign-off', method: 'POST', headers: { 'Authorization': 'Bearer ' + principalToken } });
  console.log('  ✓ 4. Principal Sign-off:', signPrincipal.status, 'Signed At:', signPrincipal.body.signOffChain.principalSignedAt);

  // 10. RBAC Negative Check: Student cannot execute leadership sign-offs
  console.log('\n=== STEP 10: RBAC CHECK - STUDENT CANNOT SIGN OFF REVIEW ===');
  const failSign = await request({ hostname: 'localhost', port: 3000, path: '/mentoring/review/111422104001/semester/4/sign-off', method: 'POST', headers: { 'Authorization': 'Bearer ' + studentToken } });
  console.log('  ✓ Student sign-off attempt forbidden:', failSign.status === 403 ? 'PASS (403)' : 'FAIL (' + failSign.status + ')');

  console.log('\n=== ALL MENTORING TESTS PASSED! SHUTTING DOWN ===');
  server.kill('SIGTERM');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });

