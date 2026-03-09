import React, { useState } from 'react';
import StudentLayout from '../../components/layout/StudentLayout';
import Dashboard from './Dashboard';
import MarksOverview from './MarksOverview';
import SubjectAnalysis from './SubjectAnalysis';
import WeeklyTestInsights from './WeeklyTestInsights';
import InternalAssessment from './InternalAssessment';
import CGPAProgress from './CGPAProgress';
import BacklogsAlerts from './BacklogsAlerts';
import RemarksFeedback from './RemarksFeedback';
import ReportsDownloads from './ReportsDownloads';
import SmartSearch from './SmartSearch';
import StudentProfile from './StudentProfile';

const pageComponents: Record<string, React.FC> = {
  dashboard: Dashboard,
  marks: MarksOverview,
  analysis: SubjectAnalysis,
  weekly: WeeklyTestInsights,
  internal: InternalAssessment,
  cgpa: CGPAProgress,
  backlogs: BacklogsAlerts,
  remarks: RemarksFeedback,
  reports: ReportsDownloads,
  search: SmartSearch,
  profile: StudentProfile,
};

const StudentDashboard: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const PageComponent = pageComponents[activePage] || Dashboard;

  return (
    <StudentLayout activePage={activePage} onNavigate={setActivePage}>
      <PageComponent />
    </StudentLayout>
  );
};

export default StudentDashboard;
