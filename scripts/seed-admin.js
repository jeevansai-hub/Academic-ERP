const admin = require('firebase-admin');
const path = require('path');

// Ensure you have downloaded the service account key and have it exported in env/set locally
// Alternatively set GOOGLE_APPLICATION_CREDENTIALS
try {
  admin.initializeApp({
      credential: admin.credential.applicationDefault()
  });
} catch (e) {
  console.log("Error initializing admin", e);
}

const db = admin.firestore();

async function seed() {
  console.log('Seeding Database...');
  
  // Note: Passwords must be created via Firebase Auth first to get the UID.
  // This is a placeholder for DB collection initialization.

  const adminProfile = {
    uid: 'placeholder_admin_uid',
    name: 'ECAP Admin',
    email: 'admin@viit.ac.in',
    role: 'admin',
    department: 'IT',
    avatar: 'EA',
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };

  const facultyProfile = {
    uid: 'placeholder_faculty_uid',
    name: 'Sample Faculty',
    email: 'faculty@viit.ac.in',
    role: 'faculty',
    department: 'Computer Science',
    designation: 'Professor',
    avatar: 'SF',
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };

  const studentProfile = {
    uid: 'placeholder_student_uid',
    name: 'Sample Student',
    email: 'student@viit.ac.in',
    role: 'student',
    rollNo: 'VIIT2021CS001',
    branch: 'CS',
    semester: 6,
    avatar: 'SS',
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };

  await db.collection('users').doc('admin_id').set(adminProfile);
  await db.collection('users').doc('faculty_id').set(facultyProfile);
  await db.collection('users').doc('student_id').set(studentProfile);

  console.log('Seed completed successfully.');
}

seed().catch(console.error);
