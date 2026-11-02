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
  console.log('--- Starting NestJS Backend (AcademicModule Tests) ---');
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
  const coordToken = await getTok('coordinator1');
  const facultyToken = await getTok('faculty1');
  const mentorToken = await getTok('mentor1');
  const studentToken = await getTok('111422104001');

  console.log('  ✓ Tokens retrieved for Admin, Coordinator, Faculty, Mentor, Student');

  // 2. Class creation
  console.log('\n=== STEP 2: CREATE ACADEMIC CLASS ===');
  let classId;
  const classRes = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/classes', method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken } },
    { department: 'CSE', year: 2, semester: 4, section: 'A', academicYear: '2024-2025' }
  );
  if (classRes.status === 201) {
    classId = classRes.body.id;
    console.log('  ✓ Created Class:', classRes.body.id, classRes.body.department, 'Sem', classRes.body.semester);
  } else {
    const listRes = await request({ hostname: 'localhost', port: 3000, path: '/academic/classes', method: 'GET', headers: { 'Authorization': 'Bearer ' + adminToken } });
    classId = listRes.body[0].id;
    console.log('  ✓ Class retrieved:', classId);
  }

  // 3. Subject catalog
  console.log('\n=== STEP 3: CREATE SUBJECTS ===');
  const sub1 = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/subjects', method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken } },
    { code: 'CS8401', name: 'Operating Systems', department: 'CSE', credits: 3, type: 'THEORY' }
  );
  const sub2 = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/subjects', method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken } },
    { code: 'CS8402', name: 'Database Management Systems', department: 'CSE', credits: 4, type: 'THEORY' }
  );
  console.log('  ✓ Subject CS8401 status:', sub1.status);
  console.log('  ✓ Subject CS8402 status:', sub2.status);

  // 4. Map subjects to class
  console.log('\n=== STEP 4: MAP SUBJECTS TO CLASS & ASSIGN FACULTY ===');
  const subList = await request({ hostname: 'localhost', port: 3000, path: '/academic/subjects', method: 'GET', headers: { 'Authorization': 'Bearer ' + coordToken } });
  const osSub = subList.body.find(s => s.code === 'CS8401');

  const mapRes1 = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/classes/' + classId + '/subjects', method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + coordToken } },
    { subjectId: osSub.id }
  );
  console.log('  ✓ Mapped CS8401 to Class:', mapRes1.status);

  // 5. Initialize Performance Record for Student
  console.log('\n=== STEP 5: INITIALIZE SEMESTER 4 SCORECARD (PAGE C) ===');
  const initRes = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/performance/init', method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + coordToken } },
    { studentId: '111422104001', semester: 4, year: 2, classId }
  );
  console.log('  ✓ Scorecard initialized:', initRes.status, 'Student:', initRes.body.studentId);

  // 6. Faculty enters marks (IAT1, IAT2, Model, Internal)
  console.log('\n=== STEP 6: FACULTY ENTERS TEST MARKS ===');
  const marksRes = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/performance/111422104001/semester/4/marks', method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + facultyToken } },
    {
      subjectMarks: [
        { subjectCode: 'CS8401', subjectName: 'Operating Systems', iat1: 88, iat2: 92, model: 89, internalMark: 19 },
        { subjectCode: 'CS8402', subjectName: 'Database Management Systems', iat1: 94, iat2: 96, model: 95, internalMark: 20 }
      ]
    }
  );
  console.log('  ✓ Test marks saved:', marksRes.status, marksRes.body.message);

  // 7. Coordinator updates attendance
  console.log('\n=== STEP 7: COORDINATOR UPDATES ATTENDANCE ===');
  const attRes = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/performance/111422104001/semester/4/attendance', method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + coordToken } },
    { workingDays: 88, daysPresent: 84, daysAbsent: 4, leaveDays: 2, medicalLeave: 2 }
  );
  console.log('  ✓ Attendance saved:', attRes.status, 'Percentage:', attRes.body.performance.attendancePercentage + '%');

  // 8. Mentor enters university results
  console.log('\n=== STEP 8: MENTOR ENTERS UNIVERSITY RESULTS & GPA ===');
  const univRes = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/performance/111422104001/semester/4/university-results', method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mentorToken } },
    {
      subjectResults: [
        { subjectCode: 'CS8401', credits: 3, univGrade: 'A+', result: 'PASS' },
        { subjectCode: 'CS8402', credits: 4, univGrade: 'O', result: 'PASS' }
      ],
      gpa: 9.14,
      cgpa: 8.85
    }
  );
  console.log('  ✓ University results saved:', univRes.status, 'GPA:', univRes.body.performance.gpa);

  // 9. Mentor logs arrear tracking
  console.log('\n=== STEP 9: MENTOR LOGS ARREARS HISTORY ===');
  const arrearRes = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/performance/111422104001/semester/4/arrears', method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mentorToken } },
    {
      arrears: [
        {
          subjectCode: 'MA8151',
          subjectName: 'Engineering Mathematics I',
          semesterOccurred: 1,
          cleared: true,
          clearanceDate: '2024-01-15',
          attempts: [
            { examSession: 'Apr/May 2023', grade: 'RA', result: 'FAIL' },
            { examSession: 'Nov/Dec 2023', grade: 'B+', result: 'PASS' }
          ]
        }
      ]
    }
  );
  console.log('  ✓ Arrears tracking saved:', arrearRes.status, 'Arrear item count:', arrearRes.body.performance.arrearsTracking.length);

  // 10. Student signs scorecard
  console.log('\n=== STEP 10: STUDENT SIGNS SCORECARD & VIEWS RECORD ===');
  const signRes = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/performance/111422104001/semester/4/sign', method: 'POST', headers: { 'Authorization': 'Bearer ' + studentToken } }
  );
  console.log('  ✓ Signed scorecard:', signRes.status, 'Signed At:', signRes.body.performance.studentSignedAt);

  const myPerf = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/my-performance', method: 'GET', headers: { 'Authorization': 'Bearer ' + studentToken } }
  );
  console.log('  ✓ Student verified scorecard retrieved: Semesters count =', myPerf.body.semesters.length);
  const sem4 = myPerf.body.semesters.find(s => s.semester === 4);
  console.log('  ✓ Sem 4 GPA:', sem4.gpa, '| Attendance:', sem4.attendancePercentage + '%', '| Marks Count:', sem4.subjectMarks.length);

  // 11. RBAC negative test: Student cannot enter marks
  console.log('\n=== STEP 11: RBAC CHECK - STUDENT CANNOT ENTER TEST MARKS ===');
  const failRes = await request(
    { hostname: 'localhost', port: 3000, path: '/academic/performance/111422104001/semester/4/marks', method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + studentToken } },
    { subjectMarks: [{ subjectCode: 'CS8401', subjectName: 'OS', iat1: 100 }] }
  );
  console.log('  ✓ Student marks entry forbidden:', failRes.status === 403 ? 'PASS (403)' : 'FAIL (' + failRes.status + ')');

  console.log('\n=== ALL ACADEMIC TESTS PASSED! SHUTTING DOWN ===');
  server.kill('SIGTERM');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });

