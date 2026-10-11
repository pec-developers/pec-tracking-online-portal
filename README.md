# PEC Tracking Online Portal (PECTOP)

A broader student-centric academic and mentoring portal concept developed to extend the original PEC Student Hub into a more comprehensive college-wide platform.

## Project Overview

PECTOP explores how academic workflows can be organized through a modular platform serving different college stakeholders.

The project builds on the initial PEC Student Hub experience and expands the scope toward a more integrated academic ecosystem.

## Planned Platform Areas

- **Student Portal:** Centralized academic information and student-facing workflows.
- **Parent Portal:** Access to relevant student academic information.
- **Faculty Portal:** Faculty-facing academic and mentoring workflows.
- **Shared Platform:** Common components and services intended to support the different portal areas.

*These areas describe the project's intended scope. Individual features may be at different stages of implementation.*

## Architecture

The repository is organized around a web frontend and a modular backend.

- **Frontend:** React, TypeScript, Vite
- **Backend:** Java, Spring Boot, Maven
- **Database:** PostgreSQL
- **Service Communication:** API Gateway and service discovery components
- **Infrastructure Direction:** Docker, Kubernetes, and AWS services

The architecture and infrastructure configuration represent the project's design direction; do not interpret every component as deployed or production-ready.

## Repository Structure

```text
.
├── app/
│   ├── frontend/
│   │   └── src/
│   │       ├── landing/
│   │       ├── login/
│   │       ├── student/
│   │       ├── parent/
│   │       ├── faculty/
│   │       └── shared/
│   └── backend/
│       ├── api-gateway/
│       ├── discovery-server/
│       ├── central-academic-tracking-service/
│       ├── student-general-profile-service/
│       ├── student-academic-performance-service/
│       ├── student-end-program-service/
│       ├── faculty-service/
│       └── student-mentoring-*-service/
├── docs/
│   └── SRS_REPORT.md
├── docker-compose.yml
└── README.md
```

## Relationship to PEC Student Hub

PECTOP represents the evolution of the original student academic portal into a broader platform concept.

- **[PEC Student Hub — Frontend](https://github.com/gideon-jacob/pec-student-client)**
- **[PEC Student Hub — Backend](https://github.com/gideon-jacob/pec-student-server)**

## Development Status

PECTOP is an evolving academic portal project. The repository contains role-specific frontend modules and backend services covering student profiles, academic tracking, performance records, faculty information, and mentoring workflows. Implementation maturity varies by module; the presence of a service or architectural component does not necessarily indicate a complete, integrated, or production-deployed feature.
