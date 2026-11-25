# LIBRIX — CATUC Integrated Library Management System

A web-based library management platform for the Catholic University of Cameroon. This repository contains the initial application foundation: a React + TypeScript web interface, a NestJS REST API, a PostgreSQL data model managed by Prisma, and a Docker Compose database service.

**Tagline:** Discover. Borrow. Learn. Grow.

## Current implementation status

### Implemented in this foundation
- Responsive CATUC-branded administration shell and navigation.
- Dashboard summary endpoint backed by PostgreSQL queries (no fabricated KPI totals).
- Book catalogue list and create endpoint.
- Physical-copy creation with sequential unique accession numbers and barcodes.
- Member list and registration endpoint with unique membership numbers.
- Prisma schema for books, copies, members, loans, loan items, reservations, fines, payments and sequences.
- Input validation, Helmet security headers, CORS configuration and Prisma database access.

### Not yet production-ready
This is the first implementation increment, not the complete 32-section specification. Authentication/RBAC guards, complete circulation workflows, policy engine, payment audit trail, file storage, digital library, inventory, acquisitions, attendance, notifications, analytics exports, PWA/offline synchronization, automated backups and full test suites still need implementation and verification. Do not expose this initial API to the public internet or use it with real institutional records until those controls are completed.

The dashboard's monthly trend chart is currently an empty-state baseline; only the KPI summary is queried from the database. Do not interpret the chart as historical activity.

## Requirements
- Node.js 20 or later
- npm 10 or later
- Docker Desktop or Docker Engine with Compose

## Setup

1. Copy `.env.example` to `.env` and change the local database password and secrets.
2. Start PostgreSQL:

   ```bash
   docker compose up -d db
   ```

3. Install dependencies from the repository root:

   ```bash
   npm install
   ```

4. Generate Prisma Client and create the development database schema:

   ```bash
   npm run db:generate
   npm run db:migrate -- --name init
   npm run db:seed
   ```

5. Start frontend and backend:

   ```bash
   npm run dev
   ```

6. Open the frontend at http://localhost:5173. The REST API is at http://localhost:4000/api.

## Environment variables

See `.env.example`. Keep `.env` out of Git. Never place database credentials, JWT secrets or storage credentials in frontend source code.

## Main API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/dashboard/summary` | Live database KPI summary |
| GET | `/api/books?limit=50&q=` | Paginated-size catalogue query (maximum 100) |
| POST | `/api/books` | Create a title and initial physical copies |
| GET | `/api/members?limit=50` | List members |
| POST | `/api/members` | Register a member |

## Important architecture decisions

- Bibliographic titles are separate from physical copies. Each copy has its own accession number, barcode, status and shelf location.
- PostgreSQL is the system of record; the browser does not use localStorage as a database.
- Book title and copy creation run in one database transaction.
- Offline circulation must be implemented using exclusive device assignment or another single-writer strategy. Two disconnected devices must never issue the same copy.
- Sample circulation rules in the original specification are not assumed to be official CATUC policies. They must be configured and approved by the institution.

## Deployment

The included Compose file starts PostgreSQL for local development. Production deployment still requires a secured Linux host, TLS reverse proxy, production secrets, database migration procedure, backup/restore verification, object storage configuration, monitoring and acceptance testing.
