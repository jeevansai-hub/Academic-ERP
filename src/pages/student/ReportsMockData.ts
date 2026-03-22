export const AUTO_GENERATED_REPORTS = [
    {
      id: "AUTO-1",
      title: "Semester 6 Marks Sheet",
      badge: { label: "Marks", color: "blue" },
      description: "Complete internal marks for all subjects — Weekly, Mid-1, Mid-2, Lab, Total. Auto-updated on every marks upload.",
      iconName: "FileSpreadsheet", 
      iconColor: "#1A56DB",
      iconBg: "rgba(26,86,219,0.10)",
      date: "Generated: Today",
      meta: "PDF · ~220 KB",
      lastDownloaded: null
    },
    {
      id: "AUTO-2",
      title: "Consolidated Marks Statement",
      badge: { label: "Marks", color: "violet" },
      description: "All semesters Semester 1 through 6 combined in one document. Includes SGPA, CGPA, credits, and ranks.",
      iconName: "Files", 
      iconColor: "#7C3AED",
      iconBg: "rgba(124,58,237,0.10)",
      date: "Generated: Today",
      meta: "PDF · ~380 KB",
      lastDownloaded: "12 Mar"
    },
    {
      id: "AUTO-3",
      title: "Attendance Report — Semester 6",
      badge: { label: "Attendance", color: "green" },
      description: "Subject-wise attendance percentage with class-conducted vs attended breakdown. Includes shortage alerts.",
      iconName: "UserCheck", 
      iconColor: "#10B981",
      iconBg: "rgba(16,185,129,0.10)",
      date: "Generated: Today",
      meta: "PDF · ~150 KB",
      lastDownloaded: "10 Mar"
    },
    {
      id: "AUTO-4",
      title: "CGPA Progress Report",
      badge: { label: "CGPA", color: "amber" },
      description: "Semester-wise SGPA, cumulative CGPA, department rank, and credit history from Semester 1 to current.",
      iconName: "TrendingUp", 
      iconColor: "#F59E0B",
      iconBg: "rgba(245,158,11,0.10)",
      date: "Generated: Today",
      meta: "PDF · ~290 KB",
      lastDownloaded: null
    },
    {
      id: "AUTO-5",
      title: "Performance Analysis Report",
      badge: { label: "Performance", color: "teal" },
      description: "Subject strengths, weakness areas, class comparison, consistency score, and improvement trends.",
      iconName: "BarChart3", 
      iconColor: "#0EA5E9",
      iconBg: "rgba(14,165,233,0.10)",
      date: "Generated: Today",
      meta: "PDF · ~340 KB",
      lastDownloaded: "15 Jan"
    },
    {
      id: "AUTO-6",
      title: "End Semester Preparation Guide",
      badge: { label: "Exam Prep", color: "red" },
      description: "Required end-sem scores per subject for each grade target, at-risk subjects, and a preparation timeline.",
      iconName: "BookOpen", 
      iconColor: "#EF4444",
      iconBg: "rgba(239,68,68,0.10)",
      date: "Generated: Today",
      meta: "PDF · ~260 KB",
      lastDownloaded: null
    }
  ];
  
  export const OFFICIAL_DOCUMENTS = [
    {
      id: "DOC-1",
      title: "Bonafide Certificate",
      badge: { label: "Certificate", color: "blue" },
      description: "Official proof of enrollment. Required for bank account, internship, visa application, scholarship.",
      iconName: "FileText",
      iconColor: "#1A56DB",
      iconBg: "rgba(26,86,219,0.10)",
      processing: "2–3 working days · Principal signature required",
      state: "in-progress" // "available", "in-progress", "ready", "re-request"
    },
    {
      id: "DOC-2",
      title: "Character Certificate",
      badge: { label: "Certificate", color: "green" },
      description: "Character and conduct certification. Required for government jobs, passport, police verification.",
      iconName: "ShieldCheck",
      iconColor: "#10B981",
      iconBg: "rgba(16,185,129,0.10)",
      processing: "5–7 working days · HOD signature + seal",
      state: "available"
    },
    {
      id: "DOC-3",
      title: "Transfer Certificate",
      badge: { label: "Certificate", color: "red" },
      description: "Required when transferring to another institution. Issued after all dues are cleared and NOC obtained.",
      iconName: "ArrowRightLeft",
      iconColor: "#EF4444",
      iconBg: "rgba(239,68,68,0.10)",
      processing: "7–10 working days · Requires No Dues Certificate",
      state: "available"
    },
    {
      id: "DOC-4",
      title: "Consolidated Transcript",
      badge: { label: "Transcript", color: "violet" },
      description: "All semesters marks and grades in official sealed format. Required for higher education, education loans.",
      iconName: "ScrollText",
      iconColor: "#7C3AED",
      iconBg: "rgba(124,58,237,0.10)",
      processing: "3–5 working days · Registrar approval + seal",
      state: "available"
    },
    {
      id: "DOC-5",
      title: "NOC for Internship",
      badge: { label: "NOC", color: "amber" },
      description: "No Objection Certificate for joining an internship company. Attach internship offer letter.",
      iconName: "Briefcase",
      iconColor: "#F59E0B",
      iconBg: "rgba(245,158,11,0.10)",
      processing: "2–3 working days · Requires offer letter upload",
      state: "available"
    },
    {
      id: "DOC-6",
      title: "Fee Structure Letter",
      badge: { label: "Letter", color: "teal" },
      description: "Official fee breakdown per semester. Required for education loan applications and scholarship submissions.",
      iconName: "Receipt",
      iconColor: "#0EA5E9",
      iconBg: "rgba(14,165,233,0.10)",
      processing: "1–2 working days · Accounts department",
      state: "available"
    },
    {
      id: "DOC-7",
      title: "Migration Certificate",
      badge: { label: "Certificate", color: "red" },
      description: "Required for admission to other universities or competitive exam registration. Issued after final semester.",
      iconName: "MapPin",
      iconColor: "#EF4444",
      iconBg: "rgba(239,68,68,0.10)",
      processing: "10–14 working days · Only after degree completion",
      note: "⚠ Available only after final semester completion",
      state: "available" // available but restricted
    },
    {
      id: "DOC-8",
      title: "Provisional Degree Certificate",
      badge: { label: "Certificate", color: "green" },
      description: "Issued after final year results pending the official convocation. Required for immediate employment.",
      iconName: "GraduationCap",
      iconColor: "#10B981",
      iconBg: "rgba(16,185,129,0.10)",
      processing: "5–7 working days · Only after all semester results",
      note: "⚠ Available only after final semester",
      state: "available"
    }
  ];
  
  export const ACTIVE_REQUESTS_MOCK = [
    {
      id: "REQ-2403",
      title: "Bonafide Certificate",
      purpose: "For: Internship application",
      submittedDate: "Submitted: 16 Mar 2026",
      urgency: "Standard",
      stage: 2,
      totalStages: 4,
      statusLine: "Currently: Under review · Updated 3 hours ago · Estimated ready: 24 Mar 2026",
      notifyEnabled: true,
      readyToCollect: false
    }
  ];
  
  export const HISTORY_MOCK = [
    {
      id: "1",
      name: "Marks Sheet — Sem 5",
      type: "Auto-generated",
      typeColor: "blue",
      reference: "AUTO-2025-12",
      purpose: "End of semester",
      issued: "08 Dec 2025",
      validity: "Valid 90 days",
      validColor: "gray",
      copies: "1",
      status: "Active",
      action: "Regenerate"
    },
    {
      id: "2",
      name: "Bonafide Certificate",
      type: "Certificate",
      typeColor: "blue",
      reference: "REQ-2398",
      purpose: "Bank account",
      issued: "14 Jan 2026",
      validity: "Valid until 14 Apr 2026",
      validColor: "amber",
      copies: "1",
      status: "Active",
      action: "Download"
    },
    {
      id: "3",
      name: "NOC for Internship",
      type: "NOC",
      typeColor: "amber",
      reference: "REQ-2391",
      purpose: "Internship joining",
      issued: "22 Nov 2025",
      validity: "Expired",
      validColor: "red",
      copies: "1",
      status: "Expired",
      action: "Re-request"
    },
    {
      id: "4",
      name: "CGPA Report",
      type: "Auto-generated",
      typeColor: "blue",
      reference: "AUTO-2025-11",
      purpose: "Academic reference",
      issued: "01 Nov 2025",
      validity: "Valid 90 days",
      validColor: "gray",
      copies: "1",
      status: "Active",
      action: "Regenerate"
    },
    {
      id: "5",
      name: "Character Certificate",
      type: "Certificate",
      typeColor: "green",
      reference: "REQ-2385",
      purpose: "Government exam",
      issued: "15 Oct 2025",
      validity: "Valid until 15 Jan 2026",
      validColor: "red",
      copies: "1",
      status: "Expired",
      action: "Re-request"
    },
    {
      id: "6",
      name: "Attendance Report — Sem 5",
      type: "Auto-generated",
      typeColor: "green",
      reference: "AUTO-2025-10",
      purpose: "Scholarship",
      issued: "30 Oct 2025",
      validity: "Valid 90 days",
      validColor: "gray",
      copies: "1",
      status: "Active",
      action: "Regenerate"
    },
    {
      id: "7",
      name: "Fee Structure Letter",
      type: "Letter",
      typeColor: "teal",
      reference: "REQ-2378",
      purpose: "Education loan",
      issued: "10 Sep 2025",
      validity: "Expired",
      validColor: "red",
      copies: "1",
      status: "Expired",
      action: "Re-request"
    },
    {
      id: "8",
      name: "Marks Sheet — Sem 4",
      type: "Auto-generated",
      typeColor: "red",
      reference: "AUTO-2025-04",
      purpose: "Higher education",
      issued: "25 Apr 2025",
      validity: "Expired",
      validColor: "red",
      copies: "2",
      status: "Expired",
      action: "Regenerate"
    }
  ];
