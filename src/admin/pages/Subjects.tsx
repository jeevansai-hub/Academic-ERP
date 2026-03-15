import React, { useState } from 'react';
import { 
  BookOpen, Search, Filter, Plus, 
  MoreHorizontal, Edit2, Trash2,
  Building2, GraduationCap, Calendar
} from 'lucide-react';
import { useAdminSubjects } from '../hooks/useAdminHooks';
import AdminSlidePanel from '../components/AdminSlidePanel';

const Subjects: React.FC = () => {
  const { subjects, addSubject } = useAdminSubjects();
  const [activeTab, setActiveTab] = useState<'subjects' | 'departments' | 'branches' | 'semesters'>('subjects');
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="adm-title">Subjects & Departments</h1>
          <p className="adm-subtitle">Manage curriculum, academic structure and calendars</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setIsAddPanelOpen(true)}>
          <Plus size={16} /> Add Subject
        </button>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', gap: '32px', marginBottom: '24px', 
        borderBottom: '1px solid var(--bdl)', position: 'relative' 
      }}>
        {[
          { id: 'subjects', label: 'Subjects', icon: <BookOpen size={16} /> },
          { id: 'departments', label: 'Departments', icon: <Building2 size={16} /> },
          { id: 'branches', label: 'Branches', icon: <GraduationCap size={16} /> },
          { id: 'semesters', label: 'Semesters', icon: <Calendar size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 4px',
              border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px',
              fontWeight: activeTab === tab.id ? 600 : 500,
              color: activeTab === tab.id ? 'var(--p)' : 'var(--t3)',
              borderBottom: activeTab === tab.id ? '2px solid var(--p)' : '2px solid transparent',
              transition: 'all 200ms ease',
              marginBottom: '-1px'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'subjects' && (
        <div className="adm-table-container">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Semester</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.code}>
                  <td className="adm-mono" style={{ fontWeight: 600, color: 'var(--p)' }}>{s.code}</td>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td>{s.dept}</td>
                  <td>{s.credits}</td>
                  <td>Sem {s.sem}</td>
                  <td>
                    <span className="adm-badge" style={{ background: 'var(--sl)', color: 'var(--s)' }}>{s.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="adm-btn adm-btn-ghost" style={{ width: '32px', height: '32px', padding: 0 }}>
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab !== 'subjects' && (
        <div className="adm-card" style={{ padding: '64px', textAlign: 'center' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--p)'
          }}>
            <Building2 size={32} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h3>
          <p style={{ color: 'var(--t4)', marginTop: '8px' }}>This section is being populated with regional data.</p>
        </div>
      )}

      <AdminSlidePanel 
        isOpen={isAddPanelOpen} 
        onClose={() => setIsAddPanelOpen(false)} 
        title="Add New Subject"
        subtitle="Create a new course in the curriculum"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="adm-input-group">
            <label className="adm-label">Subject Code *</label>
            <input className="adm-input adm-mono" placeholder="CS601" />
          </div>
          <div className="adm-input-group">
            <label className="adm-label">Subject Name *</label>
            <input className="adm-input" placeholder="Software Engineering" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
             <div className="adm-input-group">
                <label className="adm-label">Department *</label>
                <select className="adm-input"><option>CSE</option></select>
             </div>
             <div className="adm-input-group">
                <label className="adm-label">Credits *</label>
                <input type="number" className="adm-input" defaultValue={3} />
             </div>
          </div>
        </div>
      </AdminSlidePanel>
    </div>
  );
};

export default Subjects;
