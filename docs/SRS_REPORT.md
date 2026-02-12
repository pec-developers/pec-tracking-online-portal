# Software Requirements Specification

## PECTOP (PEC Tracking Online Portal)

### 1. Introduction

### 1.1 Purpose

The purpose of this document is to provide a detailed description of the requirements for the **PECTOP (PEC Tracking Online Portal)**. This application is designed to digitize the existing paper-based student mentoring booklet, creating a centralized and efficient system for tracking and managing student mentorship, academic performance, and personal development throughout their time at the institution.

### 1.2 Intended Audience

This document is intended for all stakeholders involved in the development and implementation of the application, including:

- Project Managers
- Software Developers
- UI/UX Designers
- Quality Assurance Team
- College Administration (HODs, Principal)
- Faculty Members (Mentors, Class Coordinators)

### 1.3 Overall Description

The PECTOP will be a web-based platform that allows for the easy entry, storage, and retrieval of student data currently captured in the physical mentoring booklet. It will provide different levels of access for various user roles, ensuring data privacy and integrity. The system aims to improve the efficiency of the mentoring process, provide better insights into student performance through analytics, and enhance communication between mentors, students, and parents.

### 1.4 Scope

The scope of this project is to develop a comprehensive application that covers all aspects of the mentoring booklet. This includes:

- **One-Time Data Entry:** Student personal, family, and general academic profile information.
- **Per-Semester Data Entry:** Academic performance, mentoring sessions, and activity charts for each semester.
- **End-of-Program Data:** Placement details and final student status.
- Reporting and data analysis features.

The initial phase will focus on replicating the functionality of the booklet, with future phases potentially including features like automated notifications, advanced analytics dashboards, and integration with other college systems.

### 2. Overall Description

### 2.1 Product Perspective

This application will be a standalone system, but it is designed with the potential for future integration with the college's existing Student Information System (SIS). It will replace the manual, paper-based process, reducing paperwork and the risk of data loss.

### 2.2 Product Functions

The key functions of PECTOP are:

- **User Authentication and Authorization:** Secure login for different user roles.
- **Student Profile Management:** Create, view, and update student profiles. This is divided into a one-time general profile and recurring semester-based profiles.
- **Mentor-Mentee Management:** Allow administrators to assign students to specific mentors.
- **Academic Tracking:** Input and monitor semester-wise results, attendance, and arrears.
- **Mentoring Session Logging:** Record details and ratings of each mentoring session on a per-semester basis.
- **Reporting:** Generate comprehensive reports on student progress and mentor activities.
- **Offline Access:** Provide core functionality when the user's device is offline.

### 2.3 User Classes and Characteristics

| **User Role** | **Responsibilities & Permissions** | **Technical Expertise** |
| --- | --- | --- |
| **Administrator** | Manages user accounts, system settings, and has full access to all data. Can assign students to mentors and generate institution-level reports. | High |
| **Head of Department (HOD)** | Can view all student data within their department. Can view mentor activities and generate departmental reports. | Medium |
| **Mentor / Faculty** | Can view a list of their assigned mentees. Can view and update data for their assigned mentees. Can log mentoring sessions and input academic data. | Basic |
| **Student** | Can view their own profile and academic data (read-only access). | Basic |
| **Parent/Guardian** | Can view their child's profile and academic data (read-only access). | Basic |

### 2.4 Operating Environment

The application will be a web-based platform accessible through modern web browsers (e.g., Chrome, Firefox, Safari, Edge). The technology stack is as follows:

- **Frontend:** **React.js Progressive Web App (PWA)** with Zod for form validation. Styling will be implemented using **Tailwind CSS** and the **Shadcn/ui** component library.
- **Backend:** Spring Boot (Java).
- **Database:** Supabase with PostgreSQL for database hosting and management.
- **Hosting:** The frontend will be hosted on **AWS S3** and distributed via **AWS CloudFront**. The backend application will be hosted on an **AWS EC2** instance.

### 2.5 Design and Implementation Constraints

- The application must be responsive and provide a seamless user experience across different devices.
- The system must adhere to data privacy regulations to protect sensitive student information.
- The user interface should be intuitive and require minimal training for faculty and staff.
- The application must support offline functionality. Data entered offline must be synchronized with the server once a network connection is re-established.

### 3. System Features

### 3.1 User and Profile Management

- **3.1.1 User Accounts:**
    - The system shall allow administrators to create, edit, and deactivate user accounts for non-student roles (e.g., HOD, Mentor).
    - When an initial student profile is created, the system shall automatically generate a corresponding student user account with the register number as the username and a secure, temporary password.
    - The system shall require students to change their temporary password upon first login.
- **3.1.2 Student Onboarding (Corresponds to PDF Pages 1-3):**
    - The system shall allow authorized users (Admin, HOD, Mentor) to create an initial student profile with only the name and register number.
    - The system shall require the student to log in to complete their core profile, including personal data, parent details, sibling details, and past educational history (10th/12th).
    - The system shall allow for the uploading of photos for the student, father, and mother.
- **3.1.3 Student General Profile (Corresponds to PDF Page 4):**
    - After onboarding, the system shall allow the student or mentor to fill out the general profile section, which includes long-term ambition, career options, SWOT analysis, and living style. This data is intended to be filled out once at the start of the academic program.

### 3.2 Per-Semester Activities

- **3.2.1 Semester Mentoring Activity (Corresponds to PDF Page 5):**
    - For each semester, the system shall allow the mentor to create a new "Semester Mentoring Activity" record.
    - This record shall capture details such as the student's field of interest, favorite/hardest subjects, library usage, and communication skills for that specific semester.
- **3.2.2 Mentoring Chart Logging (Corresponds to PDF Page 6):**
    - For each semester, the system shall provide an interface for mentors to fill out the detailed Mentoring Chart, capturing time management, faculty ratings on class routines, and the student's approach to examinations.
- **3.2.3 Academic Performance Tracking (Corresponds to PDF Page 7):**
    - For each semester, the system shall allow mentors to record subject-wise performance, including marks from a dynamic number of internal assessments and final exams.
    - The system shall track attendance percentage and the number of arrears for the semester.
- **3.2.4 Mentoring Session Logging (Corresponds to PDF Page 7):**
    - Throughout each semester, the system shall allow mentors to log multiple individual mentoring sessions, including the date and the 10-point rating scale evaluation.
- **3.2.5 Semester Review (Corresponds to PDF Page 8):**
    - At the end of each semester, the system shall allow the mentor to provide an overall review, summarizing the student's strengths, weaknesses, and any disciplinary issues for that semester.

### 3.3 End-of-Program Management (Corresponds to PDF Page 9)

- **3.3.1 Projects & Placements:**
    - The system shall allow for the tracking of mini-projects and final projects throughout the student's academic career.
    - The system shall provide a dedicated section to record placement details, including company, date, and outcome.
- **3.3.2 Final Data Summary:**
    - The system shall provide a summary view that
    consolidates semester-wise data (CGPA, attendance, etc.) into a single report, as seen on page 9 of the PDF.
    - The system shall allow for updating the student's contact address at the time of leaving the college.

### 3.4 Other Functional Requirements

- **3.4.1 Mentor-Mentee Management:** The system shall allow administrators to assign and unassign students to mentors.
- **3.4.2 Program and Branch Management:**
    - The system shall allow administrators to create, read, update, and delete academic Programs (e.g., B.E., M.B.A.).
    - The system shall allow administrators to create, read, update, and delete academic Branches (e.g., Computer Science Engineering) and associate them with a Program.
- **3.4.3 Offline Functionality:** The system shall cache essential data and allow offline entry for mentoring sessions and academic data, with synchronization upon reconnection.

### 4. External Interface Requirements

### 4.1 User Interfaces

The application will feature a clean, modern, and intuitive graphical user interface (GUI). Key UI elements will include:
- The UI will incorporate the college's branding, using the primary color `#a61612` (from the college logo) for key interactive elements to ensure a consistent and familiar look and feel.
- A centralized dashboard for each user role providing a quick overview of relevant information (e.g., list of mentees for a mentor, departmental stats for an HOD).
- User-friendly forms for data entry with clear labels, placeholders, and real-time validation to minimize errors.
- Interactive and responsive tables for displaying lists of students and academic data, with robust sorting, filtering, and search capabilities.
- A dedicated and comprehensive profile page for each student, presenting all information in a well-organized and easily digestible manner, separated by general and semester-specific data.
- **4.1.1 Responsive Table Behavior (Card-Based Transformation)**
    - To ensure optimal usability on all devices, particularly mobile, all data tables within the application will adopt a responsive transformation.
    - **On Large Screens (Desktops/Tablets):** Tables will render in their standard columnar format.
    - **On Small Screens (Mobile):** Each row of the table will transform into a `Card` component. Inside each card, the data from the columns will be displayed vertically, with clear `Labels` for each data point (e.g., "Register Number:", "Program:"). Action buttons or menus (like "View Profile" or "Edit") will be given prominence, often rendered as a full-width button at the bottom of the card for easy tapping. This approach avoids horizontal scrolling and presents information in a digestible, mobile-friendly format.

### 4.2 Hardware Interfaces

As a web-based application, the system will not interface directly with any specific hardware. It will be accessible through any standard device (desktop, laptop, tablet, smartphone) with a modern web browser.

### 4.3 Software Interfaces

- **Frontend-Backend Communication:** The React.js frontend will communicate with the Spring Boot backend via a RESTful API. All data exchange will happen through this API.
- **Database:** The backend application will interface with a PostgreSQL database hosted on Supabase using the Java Database Connectivity (JDBC) API.
- **Future Integrations:** The system is designed with the potential for future API-based integration with the college's Student Information System (SIS) for data synchronization (e.g., syncing student data from existing systems like NetKampus).

### 4.4 Communications Interfaces

- All communication between the client (web browser) and the servers (AWS S3/CloudFront and EC2) will be encrypted using HTTPS (HTTP over SSL/TLS) to ensure data confidentiality and integrity.

### 5. Non-Functional Requirements

### 5.1 Performance

- **Response Time:** All pages and API responses should load within 3 seconds under normal network conditions.
- **Concurrency:** The system must be able to handle concurrent access from at least 100 users without significant degradation in performance.
- **Data Processing:** Reports and data exports should be generated within 10 seconds for typical data sets.

### 5.2 Security

- **Authentication & Authorization:** The system must enforce strict role-based access control (RBAC) to ensure users can only access data and perform actions permitted by their role.
- **Data Encryption:** All data transmission must be encrypted using SSL/TLS. Passwords must be securely hashed and salted before being stored in the database.
- **Vulnerability Protection:** The application must be protected against common web vulnerabilities, including but not limited to SQL Injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF).

### 5.3 Reliability

- **Availability:** The application should have a target uptime of 99.5%, excluding scheduled maintenance.
- **Data Integrity:** The system must ensure that data is not corrupted or lost. Transactional integrity must be maintained for all database operations.
- **Backup and Recovery:** Regular, automated backups of the database must be performed to prevent data loss, with a clear recovery plan in place.

### 5.4 Usability

- **Learnability:** The user interface should be intuitive and easy to learn for users with basic computer skills, requiring minimal training.
- **Consistency:** A consistent design language, layout, and navigation should be used throughout the application to avoid user confusion.
- **Error Handling:** The system shall provide clear, user-friendly error messages and guidance on how to resolve issues.
- **Theme Support:** The application shall support both light and dark themes, allowing users to switch between them based on their preference.

### 5.5 Scalability

- **Architectural Design:** The application architecture must be designed to handle a gradual increase in the number of students, mentors, and the volume of data stored over several academic years.
    - **Stateless Backend:** The Spring Boot backend services shall be stateless, allowing for horizontal scaling by running multiple instances behind a load balancer.
    - **Database Scaling:** The PostgreSQL database must be configured with efficient indexing strategies. Connection pooling will be used to manage database connections effectively.
    - **Asynchronous Processing:** Long-running tasks, such as generating large reports, should be handled asynchronously to avoid blocking user requests.

### 5.6 Maintainability

- **Code Quality and Principles:** The source code must be well-documented, clean, and follow industry best practices and design principles to facilitate future updates and maintenance.
    - **Backend (Spring Boot):** The code should adhere to SOLID principles and a clear separation of concerns (e.g., Controller-Service-Repository layers).
    - **Frontend (React):** The code should follow a component-based architecture, with a clear state management strategy to handle application data.
    - **Modularity:** The application should be designed in a modular fashion, allowing individual features to be updated or replaced with minimal impact on other parts of the system.
    - **CI/CD:** A Continuous Integration/Continuous Deployment (CI/CD) pipeline should be established for automated testing and deployment, ensuring code quality and release stability.

### 5.7 Offline Support

- **Data Caching:** The PWA must cache essential application data and previously viewed student profiles on the user's device to allow for offline viewing.
- **Data Synchronization:** Data entered or modified offline must be queued locally and synced reliably with the server once a network connection is available. The user should be notified of the sync status.

### 5.8 Installability

- The application must be a PWA and should prompt users to install it on their home screen on supported devices (desktop, tablet, and mobile) for easy, app-like access. This includes providing appropriate icons and splash screen configurations in the PWA manifest for a native application feel across all platforms.

### 6. UI Description

Please refer to the `ui_descriptions.md` document for a detailed, page-by-page breakdown of the user interface for each role.

### 7. API Endpoints Specification

(This section will be updated to reflect the new data structures, e.g., adding endpoints for `StudentGeneralProfile`, `SemesterMentoringActivity`, `SemesterReviews`)

### 8. Database Schema (PostgreSQL)

This section provides the updated SQL statements to create the database schema.

```
-- Programs Table (e.g., B.E., M.B.A.)
CREATE TABLE Programs (
    program_id SERIAL PRIMARY KEY,
    program_name VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'B.E.', 'M.B.A.'
    duration_years INT NOT NULL -- e.g., 4, 2
);

-- Branches Table (e.g., Computer Science, Finance)
CREATE TABLE Branches (
    branch_id SERIAL PRIMARY KEY,
    program_id INT NOT NULL REFERENCES Programs(program_id) ON DELETE CASCADE,
    branch_name VARCHAR(255) NOT NULL,
    UNIQUE(program_id, branch_name)
);

-- Users Table: For authentication and roles
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL CHECK (role IN ('Administrator', 'HOD', 'Mentor', 'Student', 'Parent')),
    department VARCHAR(255), -- Department for HOD and Mentor roles
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Students Table (Core, mostly static info)
CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES Users(user_id) ON DELETE SET NULL,
    branch_id INT REFERENCES Branches(branch_id), -- Link to the branch
    register_number VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    batch VARCHAR(50), -- e.g., '2023-2027', can be auto-calculated
    section CHAR(1),
    date_of_birth DATE,
    sex VARCHAR(20),
    -- ... other core personal details from pages 1-3 ...
    address_final TEXT, -- For address at time of leaving
    photo_admission_url VARCHAR(255),
    photo_leaving_url VARCHAR(255)
);

-- Student General Profile (One-time data from Page 4)
CREATE TABLE StudentGeneralProfile (
    profile_id SERIAL PRIMARY KEY,
    student_id INT UNIQUE NOT NULL REFERENCES Students(student_id) ON DELETE CASCADE,
    long_term_ambition TEXT,
    career_option VARCHAR(100), -- 'Higher Studies', 'Job', 'Entrepreneur'
    swot_strength_academic TEXT,
    swot_strength_general TEXT,
    swot_weakness_academic TEXT,
    swot_weakness_general TEXT,
    living_style_details TEXT,
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Parents Table, Siblings Table, Education History Table (remain largely the same)
-- ...

-- Academic Performance Table (Per Semester)
CREATE TABLE AcademicPerformance (
    performance_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES Students(student_id) ON DELETE CASCADE,
    year INT NOT NULL,
    semester INT NOT NULL,
    gpa NUMERIC(4, 2),
    cgpa NUMERIC(4, 2),
    attendance_percentage NUMERIC(5, 2),
    number_of_arrears INT,
    UNIQUE(student_id, year, semester)
);

-- Semester Mentoring Activity (Per Semester data from Page 5)
CREATE TABLE SemesterMentoringActivity (
    activity_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES Students(student_id) ON DELETE CASCADE,
    year INT NOT NULL,
    semester INT NOT NULL,
    field_of_interest TEXT,
    favourite_subject TEXT,
    hardest_subject TEXT,
    library_visit_frequency VARCHAR(100),
    -- ... other fields from page 5 ...
    UNIQUE(student_id, year, semester)
);

-- Mentoring Chart Table (Per Semester data from Page 6 - remains the same)
CREATE TABLE MentoringCharts (
    chart_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES Students(student_id) ON DELETE CASCADE,
    year INT NOT NULL,
    semester INT NOT NULL,
    -- ... fields for time management, ratings etc. ...
    class_routine_ratings JSONB,
    monthly_test_ratings JSONB,
    university_exam_prep JSONB,
    UNIQUE(student_id, year, semester)
);

-- Mentoring Sessions Table (Multiple per semester, from Page 7)
CREATE TABLE MentoringSessions (
    session_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES Students(student_id) ON DELETE CASCADE,
    mentor_id INT NOT NULL REFERENCES Users(user_id),
    year INT NOT NULL,
    semester INT NOT NULL,
    session_date DATE NOT NULL,
    rating_as_person INT,
    -- ... other rating fields ...
    mentor_remarks TEXT
);

-- Semester Reviews Table (One per semester, from Page 8)
CREATE TABLE SemesterReviews (
    review_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES Students(student_id) ON DELETE CASCADE,
    mentor_id INT NOT NULL REFERENCES Users(user_id),
    year INT NOT NULL,
    semester INT NOT NULL,
    overall_remarks TEXT,
    disciplinary_issues TEXT,
    follow_up_required BOOLEAN DEFAULT FALSE,
    UNIQUE(student_id, year, semester)
);

-- Projects Table, Placements Table (remain largely the same)
-- ...

```
