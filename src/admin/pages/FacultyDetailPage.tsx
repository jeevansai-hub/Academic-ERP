import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, BookOpen, 
  Settings, Shield, Award, Calendar,
  MoreHorizontal, Users, Activity
} from 'lucide-react';
import { useAdminFaculty } from '../hooks/useAdminHooks';

const FacultyDetailPage: React.FC = () => {
  const { employeeId } = useParams();
  const { faculty } = useAdminFaculty();
  const [activeTab, setActiveTab] = useState('overview');
  
  const member = faculty.find(f => f.employeeId === employeeId);

  if (!member) return <div className="adm-root" style={{ padding: '40px', textAlign: 'center' }}>Faculty member not found.</div>;

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      <Link to="/admin/faculty" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--t4)', textDecoration: 'none', fontSize: '14px', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Faculty
      </Link>

      {/* Hero Header */}
      <div className="adm-card" style={{ 
        background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', 
        padding: '32px', display: 'flex', gap: '32px', alignItems: 'center' 
      }}>
        <div style={{ 
          width: '84px', height: '84px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700,
          border: '4px solid rgba(255,255,255,0.1)'
        }}>
          {member.firstName[0]}{member.lastName[0]}
        </div>
        <div style={{ flex: 1 }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 700 }}>{member.firstName} {member.lastName}</h1>
              <span className="adm-badge" style={{ background: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>{member.status}</span>
           </div>
           <div className="adm-mono" style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>{member.employeeId} • {member.department} • {member.designation}</div>
           <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}><Mail size={14} /> {member.email}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}><Phone size={14} /> {member.phone}</div>
           </div>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ fontSize: '12px', opacity: 0.7, textTransform: 'uppercase' }}>Subjects Assigned</div>
           <div style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'DM Mono' }}>{member.subjects.length}</div>
           <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
              {member.subjects.map((s: string) => (
                <span key={s} style={{ fontSize: '10px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>{s}</span>
              ))}
           </div>
        </div>
      </div>

       {/* Tabs */}
       <div style={{ display: 'flex', gap: '32px', marginTop: '32px', borderBottom: '1px solid var(--bdl)' }}>
        {[
          { id: 'overview', label: 'Overview', icon: <Activity size={16} /> },
          { id: 'subjects', label: 'Assigned Subjects', icon: <BookOpen size={16} /> },
          { id: 'compliance', label: 'Upload Compliance', icon: <Award size={16} /> },
          { id: 'settings', label: 'Access Settings', icon: <Shield size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 4px',
              border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px',
              fontWeight: activeTab === tab.id ? 600 : 500,
              color: activeTab === tab.id ? member.id % 2 === 0 ? '#7c3aed' : 'var(--p)' : 'var(--t3)',
              borderBottom: activeTab === tab.id ? `2px solid ${member.id % 2 === 0 ? '#7c3aed' : 'var(--p)'}` : '2px solid transparent',
              transition: 'all 200ms ease', marginBottom: '-1px'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '24px' }}>
        <div className="adm-card" style={{ padding: '64px', textAlign: 'center' }}>
           <Users size={48} color="#7c3aed" style={{ margin: '0 auto 16px' }} />
           <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Faculty Profile: {employeeId}</h3>
           <p style={{ color: 'var(--t4)', marginTop: '8px' }}>This page shows detailed professional information and assignments.</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailPage;
