// ═══════════════════════════════════════════════════════════════
// ECAP Mock Faculty Data — For Faculty Portal
// ═══════════════════════════════════════════════════════════════

export const facultyInfo = {
  name: 'Dr. Ramesh Kumar',
  initials: 'RK',
  employeeId: 'VU-FAC-0042',
  department: 'Computer Science & Engineering',
  designation: 'Associate Professor',
  email: 'ramesh@viit.ac.in',
  phone: '+91 98765 43210',
  officeLocation: 'Block A, Room 204',
  officeHours: 'Mon-Fri, 10AM-12PM',
  avatar: '',
};

export const facultyStats = {
  totalStudents: 120,
  subjectsAssigned: 3,
  testsConducted: 42,
  pendingMarks: 5,
};

export const assignedSubjects = [
  { code: 'CS601', name: 'Software Engineering', students: 60, testsDone: 14, avgScore: 18.2, color: '#1a56db' },
  { code: 'CS602', name: 'Operating Systems', students: 60, testsDone: 11, avgScore: 17.5, color: '#10b981' },
  { code: 'CS603', name: 'Database Management Systems', students: 60, testsDone: 16, avgScore: 19.3, color: '#8b5cf6' },
  { code: 'MA601', name: 'Engineering Mathematics', students: 60, testsDone: 12, avgScore: 11.4, color: '#f59e0b' },
  { code: 'EC601', name: 'Digital Circuits', students: 60, testsDone: 15, avgScore: 16.8, color: '#ec4899' },
];

export const facultyRecentActivity = [
  { type: 'upload', text: 'Uploaded marks for CS601 Weekly Test 7', detail: 'Section A — 57 students', time: '2 hrs ago', color: '#1a56db' },
  { type: 'remark', text: 'Posted remark to Rajesh Kumar', detail: 'CS601 — Positive feedback', time: 'Yesterday', color: '#10b981' },
  { type: 'assessment', text: 'Created Assessment: IA2 CS603', detail: 'Scheduled for 15 Mar', time: '3 days ago', color: '#1a56db' },
  { type: 'alert', text: '5 students flagged as at-risk', detail: 'MA601 — Low consecutive scores', time: '4 days ago', color: '#f59e0b' },
  { type: 'export', text: 'Exported class performance report', detail: 'PDF — March 2026', time: '5 days ago', color: '#1a56db' },
];

export const facultyAlerts = [
  { severity: 'high', title: '5 students at backlog risk', detail: 'MA601 — 3 consecutive low scores', time: 'Today' },
  { severity: 'medium', title: '3 students missed CS603 Assessment', detail: 'Unsubmitted: 21L31A0503, 0508, 0512', time: 'Yesterday' },
  { severity: 'low', title: 'CS601 class avg improved', detail: 'Up 2.1 pts from last week', time: '2 days ago' },
  { severity: 'medium', title: '5 pending marks to upload', detail: 'Weekly Test 8 — 3 subjects', time: '3 days ago' },
];

export const classAverageThisWeek = [
  { subject: 'CS601', avg: 18.2, lastWeek: 17.4, students: 60 },
  { subject: 'CS602', avg: 17.5, lastWeek: 17.0, students: 60 },
  { subject: 'CS603', avg: 19.3, lastWeek: 19.3, students: 60 },
  { subject: 'MA601', avg: 11.4, lastWeek: 12.6, students: 60 },
  { subject: 'EC601', avg: 16.8, lastWeek: 15.9, students: 60 },
];

export const topPerformers = [
  { rank: 1, name: 'Rajesh Kumar', score: 19.4, subject: 'CS601', initials: 'RK' },
  { rank: 2, name: 'Priya Singh', score: 18.8, subject: 'CS601', initials: 'PS' },
  { rank: 3, name: 'Arun Mehra', score: 18.5, subject: 'CS601', initials: 'AM' },
  { rank: 4, name: 'Sonal Verma', score: 18.2, subject: 'CS601', initials: 'SV' },
  { rank: 5, name: 'Deepak Rao', score: 18.0, subject: 'CS601', initials: 'DR' },
];

export const upcomingAssessments = [
  { subject: 'CS601', name: 'Weekly Test 8', date: '15 Mar', section: 'A', daysLeft: 2, color: '#1a56db' },
  { subject: 'CS602', name: 'Mid 1', date: '16 Mar', section: 'B', daysLeft: 3, color: '#10b981' },
  { subject: 'MA601', name: 'Internal 2', date: '18 Mar', section: 'Both', daysLeft: 5, color: '#f59e0b' },
  { subject: 'EC601', name: 'Lab Viva', date: '21 Mar', section: 'B', daysLeft: 8, color: '#ec4899' },
];
