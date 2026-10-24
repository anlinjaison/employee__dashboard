# Submission Checklist — Employee Dashboard MERN Stack Project

**Student:** Anlin Jaison  
**Institution:** ICT Academy of Kerala (ICTAK)  
**Course:** MERN Stack Development  
**Date:** October 2026  
**GitHub:** https://github.com/anlinjaison/employee__dashboard

---

## Core Deliverables Required

- [ ] **Deliverable 1:** Complete project report / documentation
- [ ] **Deliverable 2:** Publicly accessible GitHub repository link
- [ ] **Deliverable 3:** Working hosted project link + screenshots of major client-side views

---

## Implementation & Code

- [x] Project implementation reviewed and core features identified
- [x] Dashboard rewritten to fetch real employees from MongoDB API
- [x] Employee Form wired to POST /api/employees (real DB save)
- [x] Edit mode implemented (GET prefill + PUT update)
- [x] Delete implemented (DELETE API + table refresh)
- [x] Loading, error, empty, and success states in all pages
- [x] Client-side validation (required, min length, positive salary)
- [x] Server-side validation (Mongoose schema constraints)
- [x] Backend and all 5 API endpoints reviewed and verified as code-complete
- [x] Frontend production build succeeds (`npm run build` — 1.66s, no errors)

## Database & Security

- [x] MongoDB connection string read from .env (not hardcoded)
- [x] .env file is listed in .gitignore
- [x] .env.example provided with placeholder values only
- [x] No secrets, passwords, or real credentials committed to Git
- [ ] **ACTION REQUIRED:** Whitelist your IP (or 0.0.0.0/0) in MongoDB Atlas → Network Access
- [ ] **ACTION REQUIRED:** Verify `✅ Connected to MongoDB Atlas` after fixing IP whitelist

## Documentation

- [x] README.md complete (overview, setup, API, deployment, screenshots, limitations)
- [x] .env.example file included
- [x] docs/Project_Report.md created (27 sections)
- [ ] **ACTION REQUIRED:** Generate Project_Report.pdf (open the .md in a Markdown viewer or Word and export to PDF)

## GitHub Repository

- [x] Git repository exists: https://github.com/anlinjaison/employee__dashboard
- [x] .gitignore excludes .env, node_modules, logs
- [x] No secrets committed (verified: .env is gitignored)
- [ ] **ACTION REQUIRED:** Commit and push all new/changed files (see commands below)
- [ ] **ACTION REQUIRED:** Confirm repository is PUBLIC on GitHub

### Push Commands

```bash
# From employee_dashboard folder:
git add .
git status          # review what will be committed (check .env is NOT listed)
git commit -m "docs: add project report, README, submission package; fix frontend-API integration"
git push origin main
```

## Screenshots

- [ ] **ACTION REQUIRED:** Capture screenshots manually (browser automation was blocked)
  
  **Instructions:**
  1. Open two terminals in the `employee_dashboard` folder
  2. Terminal 1: `node app.js`
  3. First fix MongoDB Atlas IP whitelist (or screenshots will show error state)
  4. Terminal 2: `npm run dev`
  5. Open http://localhost:5173 in Chrome/Edge
  6. For each view: right-click → Inspect → ⋮ menu → Capture screenshot
     OR use the browser's screenshot shortcut
  7. For mobile: F12 → Toggle device toolbar → set width to 375

  **Required screenshots:**
  - `docs/screenshots/01_dashboard.png` — Dashboard with employee data
  - `docs/screenshots/02_empty_dashboard.png` — Empty state
  - `docs/screenshots/03_error_dashboard.png` — Error state (server down)
  - `docs/screenshots/04_add_form.png` — Add employee form (blank)
  - `docs/screenshots/05_form_validation.png` — Form with validation errors showing
  - `docs/screenshots/06_edit_form.png` — Edit form (pre-filled)
  - `docs/screenshots/07_mobile_dashboard.png` — Dashboard at 375px width
  - `docs/screenshots/08_mobile_form.png` — Form at 375px width
  - `docs/screenshots/09_404.png` — 404 page (/xyz)

- [ ] Screenshots saved to `docs/screenshots/`
- [ ] Screenshots copied to `submission/screenshots/`
- [ ] Mobile view screenshot included

## Deployment

- [ ] **ACTION REQUIRED:** Deploy backend to Render.com (see README → Deployment)
- [ ] **ACTION REQUIRED:** Add MONGODB_URI to Render environment variables
- [ ] **ACTION REQUIRED:** Verify hosted URL loads the application
- [ ] **ACTION REQUIRED:** Test Add/Edit/Delete on the live hosted URL
- [ ] **ACTION REQUIRED:** Update README.md hosted URL line
- [ ] **ACTION REQUIRED:** Update docs/Project_Report.md hosted URL (cover page + Section 21)
- [ ] **ACTION REQUIRED:** Commit updated docs and push

## Final Package

- [x] submission/Submission_Checklist.md (this file)
- [x] submission/Project_Report.md (copy of docs/Project_Report.md)
- [ ] submission/Project_Report.pdf (export from markdown after screenshots added)
- [ ] submission/screenshots/ (all PNG files)

---

## Summary of Required Manual Actions

| # | Action | Where |
|---|--------|--------|
| 1 | Whitelist IP in MongoDB Atlas | cloud.mongodb.com → Network Access |
| 2 | Verify `node app.js` shows "✅ Connected to MongoDB Atlas" | Terminal |
| 3 | Capture screenshots from the running app | Browser + docs/screenshots/ |
| 4 | git add . → git commit → git push origin main | Terminal |
| 5 | Confirm GitHub repo is PUBLIC | github.com/anlinjaison/employee__dashboard |
| 6 | Deploy to Render.com | render.com → New → Web Service |
| 7 | Add MONGODB_URI env var on Render | Render dashboard |
| 8 | Test live hosted URL end-to-end | Browser |
| 9 | Update README and report with hosted URL | docs/Project_Report.md + README.md |
| 10 | Export Project_Report.pdf | Markdown to PDF converter |
| 11 | Copy screenshots to submission/ folder | File Explorer |

---

## Three Required Deliverables Status

| Deliverable | Status | Notes |
|-------------|--------|-------|
| 1. Project Report (PDF + MD) | 🟡 In progress | MD complete; PDF export + hosted URL update needed |
| 2. Public GitHub Repository | 🟡 In progress | Repo exists; new commits need to be pushed |
| 3. Hosted project link + screenshots | 🔴 Pending | Deployment and screenshot capture needed |
