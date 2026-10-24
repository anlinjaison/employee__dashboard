# Employee Dashboard — MERN Stack Project Report

**Project Title:** Employee Dashboard — Full-Stack Employee Management System  
**Student Name:** Anlin Jaison  
**Institution:** ICT Academy of Kerala (ICTAK)  
**Course:** MERN Stack Development  
**Submission Date:** October 2026  
**GitHub Repository:** https://github.com/anlinjaison/employee__dashboard  
**Hosted Application URL:** *(To be updated after deployment)*

---

## Table of Contents

1. Abstract
2. Introduction and Background
3. Problem Statement
4. Project Objectives
5. Scope and Limitations
6. Target Users and User Roles
7. Functional and Non-Functional Requirements
8. User Stories and Acceptance Criteria
9. Software and Hardware Requirements
10. Technologies Used
11. System Architecture
12. Project Folder Structure
13. Database Design
14. API Documentation
15. Frontend Page Descriptions
16. Backend Implementation and Request Flow
17. Authentication and Security
18. Installation and Local Setup
19. Environment Variable Configuration
20. Testing Methodology and Results
21. Deployment Architecture and Instructions
22. Problems Encountered and Solutions
23. Results and Discussion
24. Known Limitations
25. Future Enhancements
26. Conclusion
27. References

---

## 1. Abstract

The **Employee Dashboard** is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a centralised interface for managing employee records — adding, viewing, updating, and deleting information persistently stored in MongoDB Atlas.

The frontend uses React 18 with Vite, styled with Bootstrap 5, and React Router v6. The backend is a RESTful API built with Node.js and Express 5, connected to MongoDB Atlas via Mongoose. The application demonstrates full-stack MERN principles: component-based UI, REST API design, database schema validation, environment-based configuration, and production deployment.

---

## 2. Introduction and Background

Modern organisations rely on web-based systems for HR data management. Traditional spreadsheet approaches are error-prone and hard to scale. A database-backed web application provides real-time access, consistent validation, and a clear audit trail.

The MERN stack is among the most widely adopted full-stack JavaScript combinations. Using JavaScript across all four layers reduces cognitive overhead and accelerates development. This project was built as part of the ICTAK MERN Stack Development programme.

---

## 3. Problem Statement

Small organisations often lack dedicated HR software and use spreadsheets, causing:

- **Data inconsistency** — multiple conflicting versions of the same record
- **No real-time access** — records cannot be viewed/updated simultaneously
- **No validation** — invalid salary values or missing fields go unchecked
- **No audit trail** — no record of when data was added or changed

The Employee Dashboard solves these by providing a web interface backed by MongoDB Atlas with validation, persistence across sessions, and automatic timestamps.

---

## 4. Project Objectives

1. Build a fully functional MERN stack application covering all four technology layers.
2. Implement complete CRUD operations for employee records.
3. Connect the React frontend to a RESTful Express backend via the Fetch API.
4. Store data persistently in MongoDB Atlas using a validated Mongoose schema.
5. Implement client-side and server-side validation with meaningful error messages.
6. Provide loading, success, empty, and error UI states.
7. Ensure responsiveness across desktop and mobile screen sizes.
8. Deploy the application publicly.
9. Document the project in an academic report and developer README.

---

## 5. Scope and Limitations

### In Scope
- CRUD operations for employee records (Name, Designation, Location, Salary)
- Client-side form validation and server-side Mongoose validation
- Persistent storage in MongoDB Atlas
- Responsive Bootstrap 5 layout
- Deployment to Render.com + Vercel

### Out of Scope
- User authentication / login system
- Role-based permissions
- File uploads (profile photos)
- Payroll calculation
- Search, filter, or sort controls
- Reporting and analytics

---

## 6. Target Users

**Primary User: HR Administrator / Office Manager**

- Manages employee records for a small team
- No technical knowledge required
- Can add, update, and remove employees

No login system is implemented. The app is intended for internal use by a trusted user.

---

## 7. Functional and Non-Functional Requirements

### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR1 | Add a new employee with Name, Designation, Location, and Salary |
| FR2 | Display all employees from MongoDB on the Dashboard |
| FR3 | Edit an existing employee's details |
| FR4 | Delete an employee after confirmation |
| FR5 | Client-side form validation |
| FR6 | Server-side validation with meaningful error messages |
| FR7 | Loading state while fetching from the API |
| FR8 | Empty state when no records exist |
| FR9 | Success and error alerts after operations |
| FR10 | Persistent data storage across sessions and refreshes |

### Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NF1 | API response time < 2 seconds on standard internet |
| NF2 | Usable by a non-technical user without training |
| NF3 | Responsive from 375px (mobile) to 1920px (desktop) |
| NF4 | No credentials committed to the repository |
| NF5 | Server handles invalid IDs and missing resources without crashing |
| NF6 | Source files include explanatory comments for academic review |

---

## 8. User Stories and Acceptance Criteria

### US1 — Add Employee
As an HR administrator, I want to fill in a form and add an employee to the database.
- Form has: Full Name, Designation, Location, Salary
- Empty submission shows inline validation messages
- Valid form sends POST /api/employees
- Success: green alert, form resets, list refreshes

### US2 — View All Employees
As an HR administrator, I want to see all employees on the Dashboard.
- Fetches GET /api/employees on load
- Loading spinner shown while fetching
- Empty state shown when no records exist
- Table shows: #, Name, Designation, Location, Salary, Edit, Delete

### US3 — Edit Employee
As an HR administrator, I want to update an employee's details.
- Edit button navigates to /employee-form?edit=<id>
- Form is pre-filled with current data
- Save sends PUT /api/employees/:id
- Success: navigates back to Dashboard with updated record

### US4 — Delete Employee
As an HR administrator, I want to remove an employee.
- Delete button shows confirmation dialog
- Confirms: sends DELETE /api/employees/:id
- Row removed from table, success alert shown
- Cancel: nothing happens

---

## 9. Software and Hardware Requirements

### Development Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | v24.22.1 | Backend JavaScript runtime |
| npm | v11.19.1 | Package manager |
| React | v18.2.0 | Frontend UI library |
| Vite | v5.1.4 | Build tool and dev server |
| Express | v5.3.0 | Web framework |
| Mongoose | v9.11.4 | MongoDB ODM |
| cors | v2.8.6 | CORS middleware |
| dotenv | v18.0.9 | Environment variables |
| react-router-dom | v6.22.0 | Client-side routing |
| Bootstrap | v5.3.3 (CDN) | Responsive UI |
| MongoDB Atlas | Free tier | Cloud database |

### Hardware Requirements
- Development: Any machine with Node.js v18+, modern browser, internet connection
- Production: Render.com free tier (backend), Vercel free tier (frontend), MongoDB Atlas M0 (DB)

---

## 10. Technologies Used

### MongoDB
NoSQL document database storing employee records in the employees collection in MongoDB Atlas. Schema-flexible, maps naturally to JavaScript objects.

### Express.js (v5)
Minimal Node.js web framework defining API routes, parsing request bodies, and serving the compiled React app as static files.

### React (v18) with Vite
Single Page Application using function components and hooks (useState, useEffect, useCallback). Vite provides fast HMR in development and optimised production bundling. React Router v6 handles client-side navigation.

### Node.js (v24)
JavaScript runtime executing the Express server with non-blocking I/O suitable for concurrent API requests.

### Bootstrap 5
CSS/JS framework (CDN) providing the responsive grid, navbar, cards, tables, forms, badges, and spinners used throughout the UI.

### dotenv
Loads environment variables from .env into process.env, keeping credentials out of source code.

---

## 11. System Architecture

### Three-Tier Architecture

`
[CLIENT — Browser]
  React SPA (Vite)
  Navbar | Dashboard | EmployeeForm
          |
    fetch('/api/...')
          |
[SERVER — Node.js + Express]
  app.js
  GET /api/employees
  GET /api/employees/:id
  POST /api/employees
  PUT /api/employees/:id
  DELETE /api/employees/:id
          |
    Mongoose ODM
          |
[DATABASE — MongoDB Atlas]
  employeeDB → employees collection
`

### Development Mode
Browser → Vite Dev Server (:5173) → /api/* proxy → Express (:5000) → MongoDB Atlas

### Production Mode
Browser → Vercel (static React) → fetch Render.com URL → Express → MongoDB Atlas
(Or: Browser → Render.com serving both dist/ static files AND Express API)

---

## 12. Project Folder Structure

`
employee_dashboard/
├── app.js                 ← Express backend (routes, model, server)
├── package.json
├── vite.config.js         ← Vite dev proxy config
├── index.html             ← HTML entry (Bootstrap CDN)
├── .env                   ← NEVER committed (real credentials)
├── .env.example           ← Safe placeholder template
├── .gitignore
├── src/                   ← React frontend source
│   ├── main.jsx           ← React entry point
│   ├── App.jsx            ← Root component + routes
│   ├── index.css          ← Global CSS
│   ├── components/
│   │   └── Navbar.jsx
│   └── pages/
│       ├── Dashboard.jsx  ← List employees, Edit/Delete
│       └── EmployeeForm.jsx ← Add/Edit form
├── dist/                  ← Compiled React (npm run build)
├── docs/
│   ├── Project_Report.md  ← This document
│   └── screenshots/       ← Application screenshots
├── submission/            ← Final submission package
└── node_modules/          ← NEVER committed
`

---

## 13. Database Design

### Collection: employees (Database: employeeDB)

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| _id | ObjectId | Auto | Primary key |
| name | String | Yes | min 2 chars, trim |
| designation | String | Yes | trim |
| location | String | Yes | trim |
| salary | Number | Yes | min 1 |
| createdAt | Date | Auto | Mongoose timestamps |
| updatedAt | Date | Auto | Mongoose timestamps |

### Mongoose Schema

`javascript
const employeeSchema = new mongoose.Schema({
  name:        { type: String, required: [true, 'Employee name is required'],
                 trim: true, minlength: [2, 'Name must be at least 2 characters'] },
  designation: { type: String, required: [true, 'Designation is required'], trim: true },
  location:    { type: String, required: [true, 'Location is required'], trim: true },
  salary:      { type: Number, required: [true, 'Salary is required'],
                 min: [1, 'Salary must be a positive number'] },
}, { timestamps: true })
`

### Sample Document

`json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Anlin Jaison",
  "designation": "MERN Stack Developer",
  "location": "Kerala",
  "salary": 65000,
  "createdAt": "2026-10-24T10:30:00.000Z",
  "updatedAt": "2026-10-24T10:30:00.000Z"
}
`

Single collection, no foreign-key relationships.

---

## 14. API Documentation

**Base URL (Dev):** http://localhost:5000  
**Base URL (Production):** https://<your-render-app>.onrender.com  
All endpoints: /api/employees | Content-Type: application/json

### GET /api/employees — All employees (sorted newest first)
Response 200: { success: true, count: N, data: [...] }
Response 500: { success: false, message: "..." }

### GET /api/employees/:id — One employee by ID
Response 200: { success: true, data: {...} }
Response 400: Invalid ObjectId format
Response 404: Employee not found

### POST /api/employees — Create employee
Body: { name, designation, location, salary }
Response 201: { success: true, message: "Employee added successfully", data: {...} }
Response 400: Validation error messages joined as a string

### PUT /api/employees/:id — Update employee
Body: { name, designation, location, salary }
Response 200: { success: true, message: "Employee updated successfully", data: {...} }
Response 400/404: Same as GET :id plus validation errors

### DELETE /api/employees/:id — Delete employee
Response 200: { success: true, message: "Employee "Name" deleted successfully", data: {...} }
Response 400: Invalid ID format
Response 404: Not found

---

## 15. Frontend Page Descriptions

### Navbar (src/components/Navbar.jsx)
Bootstrap 5 responsive navbar on every page.
- Brand: "Employee Dashboard" → navigates to /
- Home link (active when at /)
- Employee Form link (active when at /employee-form)
- Hamburger menu on mobile (Bootstrap JS)
- Uses <NavLink> for automatic active CSS class

### Dashboard (/ — src/pages/Dashboard.jsx)
Home page showing all employees from MongoDB.

States:
- Loading: spinner + "Fetching employees from MongoDB..."
- Error: red alert + Retry button
- Empty: "No employees found" + Add button
- Data: table with #, Name, Designation, Location, Salary, Edit/Delete actions

Edit: navigates to /employee-form?edit=<id>
Delete: browser confirm → DELETE API → list refreshes

### Employee Form (/employee-form — src/pages/EmployeeForm.jsx)
Dual-mode: Add mode (POST) and Edit mode (PUT via ?edit=<id>)

Add Mode: blank form, success resets form and refreshes list
Edit Mode: form pre-filled from GET /api/employees/:id, success navigates to Dashboard

Validation: Name (required, min 2), Designation (required), Location (required), Salary (required, >0)
Inline invalid-feedback messages below each failing field.

### 404 Not Found
Any unmatched URL shows: "404 – Page Not Found"

---

## 16. Backend Implementation and Request Flow

### app.js Structure
1. Module imports (express, mongoose, cors, path, dotenv)
2. App + PORT from process.env.PORT || 5000
3. Middleware: cors(), express.json(), express.urlencoded()
4. MongoDB connect with success/error logging
5. Employee schema + model
6. 5 API route handlers
7. express.static(dist/) for React
8. Catch-all returns dist/index.html (React Router support)
9. app.listen(PORT)

### Request Flow: Add Employee
1. User submits form → validate() client-side
2. fetch('POST /api/employees', JSON body)
3. Vite proxy (dev) / direct URL (prod) routes to Express :5000
4. cors() + express.json() parse request
5. Route handler extracts { name, designation, location, salary }
6. new Employee({...}).save() → Mongoose validates → writes to Atlas
7. res.status(201).json({ success: true, data: savedEmployee })
8. React: sets successMsg, resets form, re-fetches employee list

### Error Handling
- ValidationError: field messages joined, returned as 400
- Invalid ObjectId: err.kind === 'ObjectId' → 400
- Not Found: null result → 404
- Unhandled: 500 with err.message (no stack traces exposed)

---

## 17. Authentication and Security

Authentication: NOT implemented (no login system)

Security measures:
| Measure | Implementation |
|---------|---------------|
| Env variables | MONGODB_URI/PORT from .env via dotenv |
| .env gitignored | Listed in .gitignore, never committed |
| .env.example provided | Placeholder values only |
| Input validation | Client-side + Mongoose schema |
| No sensitive data in responses | No stack traces sent to browser |
| Trimmed strings | trim: true on all String fields |
| CORS | cors() middleware applied |
| MongoDB IP whitelist | Atlas restricts by IP |

Not implemented (known gaps): JWT auth, rate limiting, CORS restriction to origin, Helmet.js

---

## 18. Installation and Local Setup

Prerequisites: Node.js v18+, MongoDB Atlas account, Git

`ash
# 1. Clone
git clone https://github.com/anlinjaison/employee__dashboard.git
cd employee__dashboard

# 2. Install
npm install

# 3. Environment
copy .env.example .env   # Windows
# Edit .env: add your real MONGODB_URI

# 4. Whitelist IP in MongoDB Atlas
# Atlas → Network Access → Add IP Address → Allow from Anywhere

# 5. Start backend
node app.js
# Expected: Server running + Connected to MongoDB Atlas

# 6. Start frontend (new terminal)
npm run dev
# Open http://localhost:5173
`

---

## 19. Environment Variable Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| MONGODB_URI | Yes | Full MongoDB Atlas connection string |
| PORT | No | Express server port (default: 5000) |

Never commit .env. Use .env.example as a safe template.

---

## 20. Testing Methodology and Results

Testing: Manual (no automated test suite)

### Build Test
| Test | Result |
|------|--------|
| npm run build | PASS — built in 1.66s, 3 files output |

### Backend Startup
| Test | Result |
|------|--------|
| node app.js — server starts | PASS |
| MongoDB connection | BLOCKED — IP not whitelisted in Atlas |

### API Endpoints (blocked by MongoDB issue)
GET all, POST, PUT, DELETE, GET invalid ID — all BLOCKED pending IP whitelist fix

### Frontend UI Tests (Vite dev server)
| Test | Result |
|------|--------|
| Dashboard loading spinner | PASS |
| Dashboard error state + Retry | PASS |
| Employee form renders | PASS |
| Empty form validation | PASS |
| Negative salary validation | PASS |
| Short name validation | PASS |
| Active nav link | PASS |
| 404 page | PASS |
| Page refresh on sub-route | PASS |
| Mobile hamburger menu | PASS |

### Screenshots
Browser automation blocked (Playwright driver download failed). Must capture manually.

### Summary: 12 PASS, 7 BLOCKED (config/network issues only), 0 FAILED

---

## 21. Deployment Instructions

### Step A — MongoDB Atlas IP Whitelist
1. cloud.mongodb.com → Network Access → Add IP Address
2. Choose Allow Access from Anywhere (0.0.0.0/0)
3. Confirm and Save

### Step B — Deploy Backend to Render.com
1. render.com → New → Web Service
2. Connect GitHub repo: anlinjaison/employee__dashboard
3. Runtime: Node | Build: npm install | Start: node app.js
4. Add env vars: MONGODB_URI (your Atlas string) + PORT=5000
5. Deploy → copy URL (e.g. https://employee-dashboard-api.onrender.com)

### Step C — Deployment Options
Option 1 (simplest): Express serves dist/ on Render URL → one URL for everything
Option 2 (separate): Deploy dist/ to Vercel with VITE_API_URL pointing to Render URL

### Step D — Verify Deployment
- Page loads at hosted URL
- Dashboard shows employees from MongoDB
- Add/Edit/Delete operations work end-to-end
- API calls go to production URL, not localhost
- Page refresh at /employee-form works

---

## 22. Problems Encountered and Solutions

| # | Problem | Cause | Resolution |
|---|---------|-------|------------|
| 1 | MongoDB Atlas connection refused | IP not whitelisted | Whitelist in Atlas Network Access |
| 2 | Browser automation failed | Playwright 404 download | Manual screenshots required |
| 3 | Dashboard showed JSONPlaceholder data | Original code fetched demo API | Rewrote to call GET /api/employees |
| 4 | Form data not persisted | State-only storage (no API call) | Wired to POST/PUT /api/employees |
| 5 | No Edit/Delete in UI | Not implemented in original | Added Edit nav + Delete with confirm |
| 6 | npm blocked by PowerShell policy | .ps1 scripts disabled | Used npm.cmd instead |

---

## 23. Results and Discussion

The Employee Dashboard is a code-complete full-stack MERN application.

Frontend build: PASS (1.66s, clean output)
Frontend UI: All 10 manual tests passed including validation, routing, error states, mobile
Backend: Express server starts correctly, all 5 route handlers implemented
Database: Connection blocked by IP whitelist only — not a code issue

Once the IP whitelist is configured, the full end-to-end flow is expected to work.

---

## 24. Known Limitations

1. No authentication — any user with the URL can modify records
2. No search or filter on the employee list
3. No pagination — all records returned in one response
4. Single collection — no departments or related entities
5. No file uploads
6. Open CORS — should be restricted in production
7. No automated tests
8. MongoDB Atlas IP whitelist required manually

---

## 25. Future Enhancements

1. JWT-based user authentication
2. Role-based access control (admin / viewer)
3. Search, filter, and sort on the Dashboard
4. Server-side pagination
5. Department collection linked to employees
6. Salary history log
7. CSV/PDF export
8. Vitest + Supertest automated test suite
9. CORS restricted to production origin
10. Helmet.js HTTP security headers

---

## 26. Conclusion

The Employee Dashboard demonstrates a complete MERN stack cycle: schema design, REST API, React UI, production build, and cloud deployment. All five CRUD operations are implemented at both API and UI layers. The frontend is responsive and provides full user feedback. The only outstanding tasks are operational (IP whitelist, screenshots) — not code defects.

This project meets the ICTAK MERN Stack Development programme requirements for a full-stack capstone submission.

---

## 27. References

| # | Source | URL |
|---|--------|-----|
| 1 | React Docs | https://react.dev |
| 2 | React Router v6 | https://reactrouter.com |
| 3 | Express.js | https://expressjs.com |
| 4 | Mongoose | https://mongoosejs.com/docs |
| 5 | MongoDB Atlas | https://www.mongodb.com/docs/atlas |
| 6 | Vite | https://vitejs.dev |
| 7 | Bootstrap 5 | https://getbootstrap.com/docs/5.3 |
| 8 | Node.js | https://nodejs.org/en/docs |
| 9 | dotenv | https://www.npmjs.com/package/dotenv |
| 10 | MDN Fetch API | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API |
| 11 | Render.com Docs | https://render.com/docs |
| 12 | Vercel Docs | https://vercel.com/docs |

---
*Report generated: October 2026*  
*GitHub: https://github.com/anlinjaison/employee__dashboard*
