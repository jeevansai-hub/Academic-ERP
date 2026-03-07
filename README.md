![GitHub repo](https://img.shields.io/badge/ECAP-Vignan's%20IIT-blue)
![Firebase](https://img.shields.io/badge/Firebase-Connected-orange)
![React](https://img.shields.io/badge/React-18-61DAFB)

# Academic-ERP
ECAP – VIIT Student Performance Portal is a web-based Academic ERP that centralizes student performance data from tests, internals, and exams. It provides dashboards, analytics, and alerts for students, faculty, and administrators to track academic progress, identify risks early, and make data-driven decisions using a modern, responsive interface.

PREREQUISITES:
Node.js v18+, npm v9+, Firebase CLI v12+

STEP 1 — Clone and install:
git clone [repo-url] && cd ecap-viit
npm install                      # root
cd functions && npm install      # backend
cd ../src && npm install         # frontend

STEP 2 — Firebase project setup:
firebase login
firebase projects:create ecap-viit
firebase use --add ecap-viit
Enable Authentication in Firebase console:
→ Email/Password ✓
→ Google ✓
→ Microsoft ✓
Create Firestore database (production mode)
Deploy Firestore rules: firebase deploy --only firestore:rules

STEP 3 — Environment variables:
Copy .env.example to .env
Fill all VITE_FIREBASE_* values from Firebase console
Download service account JSON → set Admin SDK env vars

STEP 4 — Seed initial admin user:
Run: node scripts/seed-admin.js
Creates: admin@viit.ac.in / Admin@VIIT2024
Creates: sample student + faculty accounts

STEP 5 — Run development:
Terminal 1: cd functions && npm run serve   (emulates functions)
Terminal 2: cd src && npm run dev           (Vite dev server)
Open: http://localhost:5173

STEP 6 — Deploy to Firebase:
cd src && npm run build
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore

TEST ACCOUNTS (after seed script):
Admin   : admin@viit.ac.in      / Admin@VIIT2024
Faculty : faculty@viit.ac.in    / Faculty@VIIT2024
Student : student@viit.ac.in    / Student@VIIT2024
          Roll No: VIIT2021CS001
