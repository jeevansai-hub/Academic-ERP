import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, 
  Calendar, Award, BookOpen, AlertCircle,
  TrendingUp, Activity, Lock, Edit3
} from 'lucide-react';
import { useAdminStudents } from '../hooks/useAdminHooks';

const StudentDetailPage: React.FC = () => {
  const { rollNumber } = useParams();
  const { students } = useAdminStudents();
  const [activeTab, setActiveTab] = useState('overview');
  
  const student = students.find(s => s.rollNumber === rollNumber);

  if (!student) return <div className="adm-root" style={{ padding: '40px', textAlign: 'center' }}>Student not found.</div>;

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      <Link to="/admin/students" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--t4)', textDecoration: 'none', fontSize: '14px', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Students
      </Link>

      {/* Hero Header */}
      <div className="adm-card" style={{ 
        background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', color: '#fff', 
        padding: '32px', display: 'flex', gap: '32px', alignItems: 'center' 
      }}>
        <div style={{ 
          width: '84px', height: '84px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700,
          border: '4px solid rgba(255,255,255,0.1)'
        }}>
          {student.firstName[0]}{student.lastName[0]}
        </div>
        <div style={{ flex: 1 }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 700 }}>{student.firstName} {student.lastName}</h1>
              <span className="adm-badge" style={{ background: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>{student.status}</span>
           </div>
           <div className="adm-mono" style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>{student.rollNumber} • {student.branch} • Semester {student.semester}</div>
           <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}><Mail size={14} /> {student.email}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}><Phone size={14} /> {student.phone}</div>
           </div>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ fontSize: '12px', opacity: 0.7, textTransform: 'uppercase' }}>Academic Standing</div>
           <div style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'DM Mono' }}>{student.cgpa.toFixed(2)}</div>
           <div style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px', display: 'inline-block' }}>Top 5% of Branch</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', marginTop: '32px', borderBottom: '1px solid var(--bdl)' }}>
        {[
          { id: 'overview', label: 'Overview', icon: <Activity size={16} /> },
          { id: 'academic', label: 'Academic Records', icon: <BookOpen size={16} /> },
          { id: 'marks', label: 'Marks History', icon: <TrendingUp size={16} /> },
          { id: 'backlogs', label: 'Backlogs', icon: <AlertCircle size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 4px',
              border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px',
              fontWeight: activeTab === tab.id ? 600 : 500,
              color: activeTab === tab.id ? 'var(--p)' : 'var(--t3)',
              borderBottom: activeTab === tab.id ? '2px solid var(--p)' : '2px solid transparent',
              transition: 'all 200ms ease', marginBottom: '-1px'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: '24px' }}>
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
             <div className="adm-card">
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Personal Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   {[
                     { label: 'Parent Name', value: student.parentName, icon: <User size={14} /> },
                     { label: 'Parent Phone', value: student.parentPhone, icon: <Phone size={14} /> },
                     { label: 'Date of Birth', value: student.dateOfBirth, icon: <Calendar size={14} /> },
                     { label: 'Address', value: student.address, icon: <MapPin size={14} /> },
                   ].map((item, i) => (
                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ color: 'var(--t4)' }}>{item.icon}</div>
                        <div>
                           <div style={{ fontSize: '11px', color: 'var(--t4)' }}>{item.label}</div>
                           <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.value}</div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="adm-card">
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button className="adm-btn adm-btn-outline"><Edit3 size={16} /> Edit Profile</button>
                  <button className="adm-btn adm-btn-outline"><Lock size={16} /> Reset Password</button>
                  <button className="adm-btn adm-btn-outline" style={{ color: 'var(--d)' }}><AlertCircle size={16} /> Suspend Access</button>
                  <button className="adm-btn adm-btn-outline"><Activity size={16} /> View Full Logs</button>
                </div>
             </div>
          </div>
        )}

        {activeTab !== 'overview' && (
           <div className="adm-card" style={{ padding: '100px', textAlign: 'center' }}>
             <Award size={48} color="var(--p)" style={{ margin: '0 auto 16px' }} />
             <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Records for {rollNumber}</h3>
             <p style={{ color: 'var(--t4)', marginTop: '8px' }}>The complete academic history is available for review.</p>
           </div>
        )}
      </div>
    </div>
  );
};

const User = ({ size, color }: any) => <Activity size={size} color={color} />;

export default StudentDetailPage;
