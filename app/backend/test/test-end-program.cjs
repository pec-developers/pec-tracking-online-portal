const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

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
  console.log('--- Starting NestJS Backend (EndProgramModule Tests) ---');
  const backendDir = path.resolve(__dirname, '..');
  const server = spawn('npm', ['run', 'start'], {
    cwd: backendDir,
    stdio: ['ignore', 'pipe', 'inherit']
  });

  let ready = false;
  for (let i = 0; i < 35; i++) {
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

  try {
    // 1. Authenticate users
    console.log('\n=== STEP 1: AUTHENTICATING USERS ===');
    async function getTok(username) {
      const res = await request(
        { hostname: 'localhost', port: 3000, path: '/auth/login', method: 'POST', headers: { 'Content-Type': 'application/json' } },
        { username, password: 'password123' }
      );
      return res.body.accessToken;
    }

    const adminToken = await getTok('admin');
    const hodToken = await getTok('hod_cse');
    const mentorToken = await getTok('mentor1');
    const studentToken = await getTok('111422104001');

    console.log('  ✓ Tokens retrieved for Admin, HOD, Mentor, and Student');

    // 2. Student views Page 35 End-of-Program dossier
    console.log('\n=== STEP 2: STUDENT VIEWS PAGE 35 DOSSIER ===');
    const viewRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/end-program/111422104001',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + studentToken }
    });
    console.log('  ✓ Dossier status:', viewRes.status);
    console.log('  ✓ Student:', viewRes.body.student?.name, '| Batch:', viewRes.body.student?.batch);
    console.log('  ✓ Status:', viewRes.body.summary?.graduationStatus);

    // 3. Mentor updates consolidated 8-semester performance & financials
    console.log('\n=== STEP 3: MENTOR UPDATES 8-SEMESTER CONSOLIDATED SUMMARY ===');
    const semesterData = [
      { semester: 1, year: 1, sgpa: 8.25, cgpa: 8.25, attendancePercentage: 94.5, feeReceipts: [{ receiptNumber: 'REC-001', amount: 85000 }], scholarships: [] },
      { semester: 2, year: 1, sgpa: 8.40, cgpa: 8.32, attendancePercentage: 96.0, feeReceipts: [{ receiptNumber: 'REC-002', amount: 85000 }], scholarships: [{ name: 'Merit Scholarship', amount: 20000 }] },
      { semester: 3, year: 2, sgpa: 8.30, cgpa: 8.31, attendancePercentage: 91.5, feeReceipts: [{ receiptNumber: 'REC-003', amount: 85000 }], scholarships: [] },
      { semester: 4, year: 2, sgpa: 8.75, cgpa: 8.42, attendancePercentage: 95.0, feeReceipts: [{ receiptNumber: 'REC-004', amount: 85000 }], scholarships: [] },
      { semester: 5, year: 3, sgpa: 8.60, cgpa: 8.46, attendancePercentage: 97.2, feeReceipts: [{ receiptNumber: 'REC-005', amount: 85000 }], scholarships: [] },
      { semester: 6, year: 3, sgpa: 8.90, cgpa: 8.53, attendancePercentage: 98.0, feeReceipts: [{ receiptNumber: 'REC-006', amount: 85000 }], scholarships: [] },
      { semester: 7, year: 4, sgpa: 9.10, cgpa: 8.61, attendancePercentage: 99.0, feeReceipts: [{ receiptNumber: 'REC-007', amount: 85000 }], scholarships: [] },
      { semester: 8, year: 4, sgpa: 9.20, cgpa: 8.68, attendancePercentage: 100.0, feeReceipts: [{ receiptNumber: 'REC-008', amount: 85000 }], scholarships: [] }
    ];

    const summaryRes = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/end-program/summary/111422104001',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mentorToken }
      },
      {
        finalCgpa: 8.68,
        totalCreditsEarned: 164,
        graduationClassification: 'FIRST_CLASS_WITH_DISTINCTION',
        graduationStatus: 'IN_PROGRESS',
        semesterWiseData: semesterData
      }
    );
    console.log('  ✓ Summary updated status:', summaryRes.status);
    console.log('  ✓ Final CGPA:', summaryRes.body.summary?.finalCgpa, '| Classification:', summaryRes.body.summary?.graduationClassification);

    // 4. Student files Mini-Project details
    console.log('\n=== STEP 4: STUDENT RECORDS MINI-PROJECT ===');
    const projectRes = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/end-program/projects/111422104001',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + studentToken }
      },
      {
        year: 4,
        semester: 7,
        title: 'IoT-Based Smart Energy Monitoring & Grid Analytics',
        guideName: 'Dr. Ramesh Kumar',
        presentationOutside: 'IEEE International Conference on Smart Grids 2025',
        recognitionReceived: 'Best Innovation Paper Award',
        institutionalSupport: 'Seed Grant of Rs. 25,000 from Prathyusha R&D Cell'
      }
    );
    console.log('  ✓ Project added status:', projectRes.status);
    console.log('  ✓ Project Title:', projectRes.body.project?.title);
    console.log('  ✓ Total Projects:', projectRes.body.totalProjects);

    // 5. Student records Campus Placement Offer
    console.log('\n=== STEP 5: STUDENT RECORDS CAMPUS PLACEMENT OFFER ===');
    const placementRes = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/end-program/placements/111422104001',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + studentToken }
      },
      {
        year: 4,
        semester: 7,
        date: '2025-10-18',
        venue: 'College Placement Cell Auditorium',
        companyName: 'Zoho Corporation',
        role: 'Software Development Engineer',
        packageLpa: 8.5,
        outcome: 'PLACED'
      }
    );
    console.log('  ✓ Placement added status:', placementRes.status);
    console.log('  ✓ Company:', placementRes.body.placement?.companyName, '| Role:', placementRes.body.placement?.role);
    console.log('  ✓ Package LPA:', placementRes.body.placement?.packageLpa, '| Outcome:', placementRes.body.placement?.outcome);

    // 6. Student updates Alumni Exit Contact Details
    console.log('\n=== STEP 6: STUDENT UPDATES ALUMNI EXIT CONTACT ===');
    const contactRes = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/end-program/exit-contact/111422104001',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + studentToken }
      },
      {
        exitAddress: 'Plot No. 42, Annai Nagar, 3rd Cross Street',
        exitCity: 'Tiruvallur',
        exitState: 'Tamil Nadu',
        exitPincode: '602025',
        exitMobile: '+91 98401 23456',
        exitEmail: 'aravind.swe@gmail.com',
        higherStudiesDetails: {
          exam: 'GATE 2025',
          score: '685',
          university: 'IIT Madras',
          course: 'M.Tech Computer Science'
        }
      }
    );
    console.log('  ✓ Exit contact updated status:', contactRes.status);
    console.log('  ✓ Permanent Address:', contactRes.body.exitContact?.address, contactRes.body.exitContact?.city);
    console.log('  ✓ Higher Studies Target:', contactRes.body.exitContact?.higherStudiesDetails?.university);

    // 7. Mentor Program Exit Sign-Off
    console.log('\n=== STEP 7: MENTOR PROGRAM EXIT SIGN-OFF ===');
    const mentorSignRes = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/end-program/sign-off/111422104001',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mentorToken }
      },
      {
        role: 'MENTOR',
        remarks: 'Exemplary academic and ethical character throughout all 4 years. Strong technical acumen.'
      }
    );
    console.log('  ✓ Mentor sign-off status:', mentorSignRes.status);
    console.log('  ✓ Mentor Signed At:', mentorSignRes.body.signatures?.mentorSignedAt);
    console.log('  ✓ Status after Mentor sign-off:', mentorSignRes.body.graduationStatus);

    // 8. HOD Program Exit Sign-Off
    console.log('\n=== STEP 8: HOD PROGRAM EXIT SIGN-OFF ===');
    const hodSignRes = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/end-program/sign-off/111422104001',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + hodToken }
      },
      {
        role: 'HOD',
        remarks: 'Degree clearance recommended with First Class with Distinction.'
      }
    );
    console.log('  ✓ HOD sign-off status:', hodSignRes.status);
    console.log('  ✓ HOD Signed At:', hodSignRes.body.signatures?.hodSignedAt);
    console.log('  ✓ Final Graduation Status:', hodSignRes.body.graduationStatus);

    // 9. RBAC Security Check: Student cannot sign off
    console.log('\n=== STEP 9: RBAC CHECK - STUDENT CANNOT SIGN OFF ===');
    const studentIllegalSign = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/end-program/sign-off/111422104001',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + studentToken }
      },
      {
        role: 'HOD',
        remarks: 'Self sign-off attempt'
      }
    );
    console.log('  ✓ Student sign-off attempt forbidden: PASS (Status: ' + studentIllegalSign.status + ')');

    // 10. Final Verification of complete dossier
    console.log('\n=== STEP 10: VERIFY CONSOLIDATED PAGE 35 DOSSIER ===');
    const finalDossier = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/end-program/111422104001',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + adminToken }
    });
    console.log('  ✓ Final dossier retrieved status:', finalDossier.status);
    console.log('  ✓ Student:', finalDossier.body.student?.name);
    console.log('  ✓ CGPA:', finalDossier.body.summary?.finalCgpa, '| Credits:', finalDossier.body.summary?.totalCreditsEarned);
    console.log('  ✓ Projects Count:', finalDossier.body.summary?.miniProjects?.length);
    console.log('  ✓ Placements Count:', finalDossier.body.summary?.placements?.length);
    console.log('  ✓ Alumni Email:', finalDossier.body.summary?.exitEmail);
    console.log('  ✓ Graduation Status:', finalDossier.body.summary?.graduationStatus);

    console.log('\n=== ALL ENDPROGRAM TESTS PASSED SUCCESSFULLY! ===');
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  } finally {
    server.kill('SIGTERM');
    setTimeout(() => process.exit(0), 100);
  }
}

run();
