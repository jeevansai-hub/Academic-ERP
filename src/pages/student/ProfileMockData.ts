export const PROFILE_DATA = {
    personalInfo: {
        fullName: "Aditya Kumar",
        dob: "2003-08-15",
        gender: "Male",
        bloodGroup: "B+",
        guardianName: "Suresh Kumar",
        guardianPhone: "+91 98765 43210",
        address: "12-3-456, MG Road, Vijayawada, AP 520001",
        aadhaar: "XXXX XXXX 3456"
    },
    systemInfo: {
        rollNumber: "21L31A0503",
        studentId: "VIIT-2022-CS-503",
        admissionYear: "2022",
        programme: "B.Tech Computer Science & Engineering",
        regulation: "R22"
    },
    contactInfo: {
        personalEmail: "aditya.kumar2003@gmail.com",
        collegeEmail: "21L31A0503@viit.ac.in",
        phone: "+91 98765 43210",
        whatsapp: "Same as phone",
        linkedin: "linkedin.com/in/aditya-kumar",
        github: "github.com/aditya-kumar"
    },
    academicStats: {
        cgpa: 8.04,
        rank: "23 / 120",
        credits: "130 / 180",
        attendance: 82,
        completion: 78
    }
};

export const ENROLLED_SUBJECTS = [
    { code: "CS603", name: "Database Management Systems", type: "Theory", credits: 4, faculty: "Dr. Ramesh Kumar", status: "Enrolled", color: "blue" },
    { code: "CS602", name: "Operating Systems", type: "Theory", credits: 4, faculty: "Dr. Priya Sharma", status: "Enrolled", color: "blue" },
    { code: "MA601", name: "Engineering Mathematics", type: "Theory", credits: 4, faculty: "Dr. Suresh Nair", status: "Backlog", color: "red" },
    { code: "EC601", name: "Digital Circuits", type: "Theory", credits: 4, faculty: "Dr. Anjali Menon", status: "Enrolled", color: "blue" },
    { code: "CS603L", name: "Database Management Systems Lab", type: "Lab", credits: 2, faculty: "Dr. Ramesh Kumar", status: "Enrolled", color: "teal" },
    { code: "CS602L", name: "Operating Systems Lab", type: "Lab", credits: 2, faculty: "Dr. Priya Sharma", status: "Enrolled", color: "teal" },
    { code: "EC601L", name: "Digital Circuits Lab", type: "Lab", credits: 2, faculty: "Dr. Anjali Menon", status: "Enrolled", color: "teal" },
    { code: "MA601L", name: "Engineering Mathematics Lab", type: "Lab", credits: 1, faculty: "Dr. Suresh Nair", status: "Enrolled", color: "teal" }
];

export const ACADEMIC_HISTORY = [
    { sem: "Semester 6", year: "2024-2025", subjects: 8, credits: 23, sgpa: "-", rank: "-", status: "In progress" },
    { sem: "Semester 5", year: "2024-2025", subjects: 8, credits: 24, sgpa: "8.12", rank: "21", status: "Completed" },
    { sem: "Semester 4", year: "2023-2024", subjects: 9, credits: 26, sgpa: "8.45", rank: "15", status: "Completed", best: true },
    { sem: "Semester 3", year: "2023-2024", subjects: 8, credits: 24, sgpa: "7.92", rank: "28", status: "Completed" },
    { sem: "Semester 2", year: "2022-2023", subjects: 8, credits: 24, sgpa: "7.85", rank: "32", status: "Completed" },
    { sem: "Semester 1", year: "2022-2023", subjects: 8, credits: 24, sgpa: "7.90", rank: "30", status: "Completed" }
];

export const LOGIN_HISTORY = [
    { id: 1, device: "Chrome on Windows", location: "Vijayawada, AP", date: "Mar 19, 2026 · 2:43 PM", status: "Success", type: "desktop" },
    { id: 2, device: "Safari on iPhone", location: "Vijayawada, AP", date: "Mar 18, 2026 · 8:15 AM", status: "Success", type: "mobile" },
    { id: 3, device: "Chrome on Windows", location: "Vijayawada, AP", date: "Mar 17, 2026 · 9:30 AM", status: "Success", type: "desktop" },
    { id: 4, device: "Firefox on Mac", location: "Unknown", date: "Mar 15, 2026 · 11:45 PM", status: "Failed", type: "desktop" }
];

export const ACTIVITY_FEED = [
    { id: 1, date: "Mar 19, 2026 2:43 PM", type: "visit", desc: "Viewed Marks Overview · CS603 subject selected", color: "blue" },
    { id: 2, date: "Mar 19, 2026 1:15 PM", type: "download", desc: "Downloaded Semester 6 Marks Sheet (PDF)", color: "green" },
    { id: 3, date: "Mar 18, 2026 5:30 PM", type: "submit", desc: "Submitted exam feedback for CS602 Lab Assessment", color: "amber" },
    { id: 4, date: "Mar 18, 2026 4:20 PM", type: "setting", desc: "Updated notification preferences", color: "teal" },
    { id: 5, date: "Mar 17, 2026 10:00 AM", type: "visit", desc: "Viewed CGPA Progress · All Semesters view", color: "blue" },
    { id: 6, date: "Mar 16, 2026 3:45 PM", type: "submit", desc: "Asked doubt: CS603 · Normalization", color: "amber" }
];
