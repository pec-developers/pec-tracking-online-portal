# PECTOP Deployment Architecture Guide

This document outlines the deployment architecture for the **PEC Tracking Online Portal (PECTOP)** across **Vercel**, **Render**, and **Supabase**, with automated Supabase migrations & storage provisioning via **GitHub Actions**.

---

## 1. System Topology Overview

```mermaid
flowchart TD
    subgraph Client ["Client Devices (Browser / Mobile)"]
        User["End Users (Students, Mentors, Faculty, Leadership)"]
    end

    subgraph Vercel ["Frontend Hosting (Vercel)"]
        VercelSPA["React 19 + Zustand SPA (app/frontend)"]
        VercelRewrites["Client-side Rewrites (vercel.json)"]
    end

    subgraph Render ["Backend Hosting (Render)"]
        RenderService["NestJS API Web Service (app/backend)"]
        HealthEndpoint["Health Check: /health & /api/health"]
        APIPrefix["Transparent /api/* Rewriter"]
    end

    subgraph Supabase ["Supabase Cloud Platform"]
        PGDB[("PostgreSQL Database (Prisma Models)")]
        Pooler["Supavisor Connection Pooler (Port 6543)"]
        Storage["Supabase Storage Buckets"]
        BucketMedia["'pectop-media' Bucket"]
        BucketPhotos["'student-photos' Bucket"]
    end

    subgraph GitHubActions ["CI / CD (GitHub Actions)"]
        GHActions[".github/workflows/deploy-supabase.yml"]
    end

    User -->|HTTPS| VercelSPA
    VercelSPA -->|REST API with Bearer JWT| RenderService
    RenderService -->|Prisma Client via Pooler| Pooler
    Pooler --> PGDB
    RenderService -->|Direct DB Operations| PGDB
    User -->|Direct Asset Download| Storage
    Storage --> BucketMedia
    Storage --> BucketPhotos
    GHActions -->|Supabase CLI Migrations & Buckets| PGDB
    GHActions -->|Bucket & Policy Configuration| Storage
```

---

## 2. Supabase Setup & CI/CD (GitHub Actions)

All database tables, enums, indexes, constraints, Supabase Storage buckets, and RLS policies are version-controlled and applied through GitHub Actions.

### Supabase Storage Buckets
1. **`pectop-media`**: Public bucket for digital booklet attachments, semester review documents, digital signatures, and certificates (Max size: 10MB).
2. **`student-photos`**: Dedicated public bucket for Booklet Cover student photo, father photo, mother photo, and passout photo (Max size: 5MB).

### GitHub Actions Secrets
In your GitHub repository (**Settings** $\to$ **Secrets and variables** $\to$ **Actions**), add the following repository secrets:

| Secret Name | Description | Example / Format |
|---|---|---|
| `SUPABASE_ACCESS_TOKEN` | Supabase Personal Access Token (CLI management) | `sbp_...` (from Supabase Account Settings) |
| `SUPABASE_PROJECT_ID` | Reference ID of your Supabase project | `abcdefghijklmno` (from Project URL) |
| `SUPABASE_DB_PASSWORD` | PostgreSQL Database password | Your database password |
| `SUPABASE_DB_URL` | *(Optional direct fallback)* Connection string | `postgresql://postgres:[PASS]@db.[REF].supabase.co:5432/postgres` |

### Triggering Supabase Deployment
- **Automatic**: Any push to branch `main` touching `supabase/**` or `app/backend/prisma/schema.prisma`.
- **Manual (Workflow Dispatch)**: Go to **Actions** $\to$ **Deploy Supabase** $\to$ **Run workflow**. You can enable `run_seed: true` to populate default test users, classes, subjects, and demo student `111422104001`.

---

## 3. Backend Deployment (Render)

The NestJS backend runs as a continuous Web Service on Render.

### Render Configuration
1. Create a new **Web Service** on [Render.com](https://render.com).
2. Connect your Git repository.
3. Configure the following service settings:
   - **Root Directory**: `app/backend`
   - **Environment**: `Node` (or `Docker` using `app/backend/Dockerfile`)
   - **Build Command**: `npm ci && npx prisma generate && npm run build`
   - **Start Command**: `npm run start:prod` (runs `node dist/main.js`)
   - **Health Check Path**: `/health` (or `/api/health`)
4. Add the following **Environment Variables** in Render Dashboard:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_URL`: `postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true`
   - `DIRECT_URL`: `postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres`
   - `JWT_SECRET`: Random string at least 32 characters long.
   - `CORS_ORIGIN`: `*` or your Vercel frontend domain (`https://pectop-portal.vercel.app`).
   - `SUPABASE_URL`: `https://[PROJECT_REF].supabase.co`
   - `SUPABASE_ANON_KEY`: Your Supabase anon public key.
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role secret key.

*Tip: You can also use Render Blueprint by deploying with the included [`render.yaml`](file:///home/gideon/codespace/pec-tracking-online-portal/render.yaml).*

---

## 4. Frontend Deployment (Vercel)

The React 19 + Zustand + Tailwind CSS v4 Single Page Application is deployed on Vercel.

### Vercel Configuration
1. In [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the repository.
2. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `app/frontend` *(or leave as root, root `vercel.json` will build `app/frontend` automatically)*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add the following **Environment Variable** in Vercel Dashboard:
   - `VITE_API_URL`: The URL of your live Render backend (e.g. `https://pectop-backend.onrender.com`).
4. Click **Deploy**. Vercel will handle automatic continuous deployments on every Git push.

---

## 5. Verification Checklist

- [x] Database migrations pushed to Supabase (`users`, `students`, `classes`, etc.).
- [x] Supabase Storage buckets `pectop-media` and `student-photos` created with public read access.
- [x] Backend responds to `GET /health` with `{"status": "ok"}` on Render.
- [x] Backend accepts requests with or without `/api` prefix (transparent rewrite).
- [x] Frontend connects to live Render backend via `VITE_API_URL`.
- [x] Test login switcher authenticates immediately with seeded accounts (e.g., student `111422104001`, mentor `mentor1`).

