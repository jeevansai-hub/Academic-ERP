// ═══════════════════════════════════════════════════════════════
// ECAP Mock Student Data — All pages source from here
// ═══════════════════════════════════════════════════════════════

export const studentInfo = {
  name: 'Rajesh Kumar',
  initials: 'RK',
  rollNo: 'VIIT-2021-CS-101',
  department: 'Computer Science & Engineering',
  semester: 6,
  batch: '2021-2025',
  email: 'rajesh.kumar@viit.ac.in',
  phone: '+91 98765 43210',
  dob: '15 June 2003',
  gender: 'Male',
  address: 'Pune, Maharashtra',
  advisor: 'Dr. Priya Sharma',
  enrollmentDate: '01 Aug 2021',
  status: 'Active',
};

export const sgpaTrend = [
  { sem: 'Sem 1', sgpa: 8.2, cgpa: 8.2 },
  { sem: 'Sem 2', sgpa: 8.5, cgpa: 8.35 },
  { sem: 'Sem 3', sgpa: 7.9, cgpa: 7.97 },
  { sem: 'Sem 4', sgpa: 8.1, cgpa: 8.18 },
  { sem: 'Sem 5', sgpa: 8.5, cgpa: 8.24 },
  { sem: 'Sem 6', sgpa: 7.6, cgpa: 8.04 },
];

export const semesterTable = [
  { semester: 'Semester 1', sgpa: 8.2, credits: 22, gradePoints: 180.4, performance: 'Good' },
  { semester: 'Semester 2', sgpa: 8.5, credits: 22, gradePoints: 187.0, performance: 'Excellent' },
  { semester: 'Semester 3', sgpa: 7.9, credits: 22, gradePoints: 173.8, performance: 'Good' },
  { semester: 'Semester 4', sgpa: 8.1, credits: 22, gradePoints: 178.2, performance: 'Good' },
  { semester: 'Semester 5', sgpa: 8.5, credits: 22, gradePoints: 187.0, performance: 'Excellent' },
  { semester: 'Semester 6', sgpa: 7.6, credits: 22, gradePoints: 167.2, performance: 'Good' },
];

export interface Subject {
  name: string;
  code: string;
  weeklyAvg: number;
  internal: number;
  internalMax: number;
  midSem: number;
  midSemMax: number;
  endSem: number;
  endSemMax: number;
  total: number;
  totalMax: number;
  percentage: number;
  grade: string;
  status: 'Pass' | 'Fail';
  color: string;
}

export const subjects: Subject[] = [
  { name: 'Machine Learning', code: 'CS601', weeklyAvg: 18.7, internal: 19, internalMax: 20, midSem: 38, midSemMax: 40, endSem: 35, endSemMax: 40, total: 92, totalMax: 100, percentage: 92, grade: 'A+', status: 'Pass', color: '#2563eb' },
  { name: 'Cloud Computing', code: 'CS602', weeklyAvg: 17.5, internal: 18, internalMax: 20, midSem: 35, midSemMax: 40, endSem: 32, endSemMax: 40, total: 85, totalMax: 100, percentage: 85, grade: 'A', status: 'Pass', color: '#16a34a' },
  { name: 'Software Testing', code: 'CS603', weeklyAvg: 19.3, internal: 20, internalMax: 20, midSem: 37, midSemMax: 40, endSem: 35, endSemMax: 40, total: 92, totalMax: 100, percentage: 92, grade: 'A+', status: 'Pass', color: '#7c3aed' },
  { name: 'Blockchain Technology', code: 'CS604', weeklyAvg: 16.4, internal: 17, internalMax: 20, midSem: 32, midSemMax: 40, endSem: 29, endSemMax: 40, total: 78, totalMax: 100, percentage: 78, grade: 'B+', status: 'Pass', color: '#d97706' },
  { name: 'Mathematics', code: 'MA601', weeklyAvg: 12.1, internal: 13, internalMax: 20, midSem: 18, midSemMax: 40, endSem: 15, endSemMax: 40, total: 46, totalMax: 100, percentage: 46, grade: 'F', status: 'Fail', color: '#dc2626' },
  { name: 'Big Data Analytics', code: 'CS605', weeklyAvg: 18.2, internal: 19, internalMax: 20, midSem: 36, midSemMax: 40, endSem: 33, endSemMax: 40, total: 88, totalMax: 100, percentage: 88, grade: 'A', status: 'Pass', color: '#0891b2' },
];

export const weeklyTestData = subjects.map(s => ({
  name: s.name,
  code: s.code,
  color: s.color,
  avg: s.weeklyAvg,
  scores: s.name === 'Machine Learning' ? [18, 19, 17, 20, 19, 18, 20] :
          s.name === 'Cloud Computing' ? [16, 18, 17, 19, 17, 18, 18] :
          s.name === 'Software Testing' ? [19, 20, 19, 20, 18, 20, 19] :
          s.name === 'Blockchain Technology' ? [15, 17, 16, 18, 15, 17, 17] :
          s.name === 'Mathematics' ? [10, 12, 11, 14, 13, 12, 13] :
          [17, 19, 18, 20, 17, 19, 18],
  best: 0,
  lowest: 0,
})).map(s => ({ ...s, best: Math.max(...s.scores), lowest: Math.min(...s.scores) }));

export const internalAssessment = subjects.map(s => ({
  name: s.name,
  code: s.code,
  color: s.color,
  final: s.internal,
  finalMax: s.internalMax,
  percentage: Math.round((s.internal / s.internalMax) * 100),
  components: {
    internal1: { score: Math.round(s.internal * 0.85), max: s.internalMax, label: 'Internal-1' },
    internal2: { score: s.internal, max: s.internalMax, label: 'Internal-2' },
    assignments: { score: Math.round(s.internal * 0.9), max: s.internalMax, label: 'Assignments' },
    lab: s.code.startsWith('MA') ? null : { score: Math.round(s.internal * 0.95), max: s.internalMax, label: 'Lab/Practical' },
  },
}));

export const remarks = [
  {
    subject: 'Machine Learning',
    faculty: 'Dr. Priya Sharma',
    date: '28 Feb 2026',
    quote: 'Rajesh demonstrates excellent problem-solving skills, particularly in implementing neural network architectures. His project on image classification was one of the best in class.',
    strengths: ['Critical Thinking', 'Project Work', 'Algorithm Design', 'Research Skills'],
    improvements: ['Paper Writing', 'Presentation Skills'],
    suggestions: ['Explore deep learning research papers', 'Consider participating in Kaggle competitions'],
    sentiment: 'strength' as const,
  },
  {
    subject: 'Cloud Computing',
    faculty: 'Prof. Amit Desai',
    date: '25 Feb 2026',
    quote: 'Good understanding of cloud architectures. Shows initiative in lab work. Needs to improve consistency in weekly test preparation.',
    strengths: ['Lab Performance', 'Practical Knowledge'],
    improvements: ['Weekly Test Consistency', 'Documentation'],
    suggestions: ['Practice AWS hands-on labs regularly'],
    sentiment: 'neutral' as const,
  },
  {
    subject: 'Mathematics',
    faculty: 'Dr. Sunita Patil',
    date: '20 Feb 2026',
    quote: 'Rajesh needs significant improvement in mathematical foundations. The lack of regular practice is evident in exam performance. Immediate attention required.',
    strengths: ['Class Attendance'],
    improvements: ['Problem Solving', 'Formula Application', 'Regular Practice'],
    suggestions: ['Attend extra tutorial classes', 'Form a study group for problem solving'],
    sentiment: 'critical' as const,
  },
  {
    subject: 'Software Testing',
    faculty: 'Prof. Rekha Jain',
    date: '15 Feb 2026',
    quote: 'Outstanding performance across all assessment components. Rajesh has shown remarkable consistency and depth of understanding in software testing methodologies.',
    strengths: ['Consistency', 'Test Case Design', 'Automation Skills', 'Code Coverage Analysis'],
    improvements: [],
    suggestions: ['Consider pursuing ISTQB certification'],
    sentiment: 'strength' as const,
  },
];

export const notifications = [
  { type: 'red', text: 'Mathematics backlog registered', time: '2 days ago' },
  { type: 'blue', text: 'Semester 6 marks updated', time: '5 days ago' },
  { type: 'purple', text: 'Dr. Priya Sharma added a remark', time: '1 week ago' },
  { type: 'blue', text: 'Semester 5 marksheet downloaded', time: '2 weeks ago' },
];

export const recentActivity = [
  { color: '#dc2626', text: 'Mathematics backlog registered', time: '2 days ago' },
  { color: '#2563eb', text: 'Semester 6 marks updated', time: '5 days ago' },
  { color: '#7c3aed', text: 'Dr. Priya Sharma added a remark', time: '1 week ago' },
  { color: '#94a3b8', text: 'Semester 5 marksheet downloaded', time: '2 weeks ago' },
];

export const reports = [
  { icon: 'FileText', color: '#2563eb', name: 'Semester 6 Marksheet', desc: 'Complete marksheet with grades and SGPA', format: 'PDF' },
  { icon: 'FileSpreadsheet', color: '#16a34a', name: 'Semester-wise Performance', desc: 'Performance comparison across all semesters', format: 'Excel' },
  { icon: 'FileText', color: '#7c3aed', name: 'Academic Transcript', desc: 'Official academic transcript for all semesters', format: 'PDF' },
  { icon: 'FileSpreadsheet', color: '#d97706', name: 'Internal Assessment Report', desc: 'Detailed internal assessment breakdown', format: 'Excel' },
  { icon: 'FileText', color: '#0891b2', name: 'Weekly Test Report', desc: 'Weekly test scores and trend analysis', format: 'Excel' },
  { icon: 'FileText', color: '#dc2626', name: 'Backlog History Report', desc: 'Complete backlog and clearance history', format: 'PDF' },
];
