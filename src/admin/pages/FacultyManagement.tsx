import React, { useState } from 'react';
import { 
  GraduationCap, Search, Filter, Plus, FileDown, 
  MoreHorizontal, Eye, Edit2, Shield,
  Trash2, ArrowUpDown, ChevronLeft, ChevronRight,
  BookOpen, Star
} from 'lucide-react';
import { useAdminFaculty } from '../hooks/useAdminHooks';
import AdminSlidePanel from '../components/AdminSlidePanel';

const FacultyManagement: React.FC = () => {
  const { faculty, addFaculty } = useAdminFaculty();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);

  const filteredFaculty = faculty.filter(f => 
    f.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="adm-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            Faculty Management
            <span style={{ fontSize: '13px', background: 'var(--bdl)', color: 'var(--t3)', padding: '2px 10px', borderRadius: '10px' }}>
              {faculty.length} Total
            </span>
          </h1>
          <p className="adm-subtitle">Manage teaching staff and subject assignments</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="adm-btn adm-btn-outline">
            <FileDown size={16} /> Export
          </button>
          <button className="adm-btn adm-btn-primary" onClick={() => setIsAddPanelOpen(true)}>
            <Plus size={16} /> Add Faculty
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ 
        background: '#fff', border: '1px solid var(--bd)', borderRadius: '14px', 
        padding: '16px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' 
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} color="var(--t4)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input 
            className="adm-input" 
            placeholder="Search by name, ID, department..." 
            style={{ paddingLeft: '42px', height: '44px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="adm-btn adm-btn-outline" style={{ height: '44px' }}>
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Table */}
      <div className="adm-table-container">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" /></th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Subjects</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.map((f) => (
              <tr key={f.id}>
                <td><input type="checkbox" /></td>
                <td className="adm-mono" style={{ color: 'var(--p)', fontWeight: 500 }}>{f.employeeId}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', background: 'var(--pl)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600,
                      color: 'var(--p)'
                    }}>
                      {f.firstName[0]}{f.lastName[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--t1)' }}>{f.firstName} {f.lastName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--t4)' }}>{f.email}</div>
                    </div>
                  </div>
                </td>
                <td>{f.department}</td>
                <td style={{ fontSize: '12px' }}>{f.designation}</td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {f.subjects.map((s: string) => (
                      <span key={s} className="adm-badge" style={{ background: 'var(--bdl)', color: 'var(--t3)', padding: '2px 6px' }}>{s}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className="adm-badge" style={{ 
                    background: f.status === 'Active' ? 'var(--sl)' : 'var(--wl)', 
                    color: f.status === 'Active' ? 'var(--s)' : 'var(--w)' 
                  }}>
                    <div className="adm-badge-dot" style={{ background: f.status === 'Active' ? 'var(--s)' : 'var(--w)' }}></div>
                    {f.status}
                  </span>
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

      <AdminSlidePanel 
        isOpen={isAddPanelOpen} 
        onClose={() => setIsAddPanelOpen(false)} 
        title="Add Faculty Member"
        subtitle="Enroll a new faculty member and assign subjects"
        footer={(
          <>
            <button className="adm-btn adm-btn-outline" onClick={() => setIsAddPanelOpen(false)}>Cancel</button>
            <button className="adm-btn adm-btn-primary">Add Faculty</button>
          </>
        )}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '16px', background: 'var(--bg)', borderRadius: '12px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px dashed var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t4)' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Profile Photo</div>
              <div style={{ fontSize: '11px', color: 'var(--t4)' }}>Supported: JPG, PNG (Max 2MB)</div>
              <button className="adm-btn adm-btn-outline" style={{ height: '28px', fontSize: '11px', marginTop: '8px' }}>Browse Files</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
             <div className="adm-input-group">
                <label className="adm-label">First Name *</label>
                <input className="adm-input" />
             </div>
             <div className="adm-input-group">
                <label className="adm-label">Last Name *</label>
                <input className="adm-input" />
             </div>
          </div>
          <div className="adm-input-group">
              <label className="adm-label">Employee ID *</label>
              <input className="adm-input adm-mono" placeholder="VU-FAC-001" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
             <div className="adm-input-group">
                <label className="adm-label">Department *</label>
                <select className="adm-input"><option>CSE</option><option>IT</option></select>
             </div>
             <div className="adm-input-group">
                <label className="adm-label">Designation *</label>
                <select className="adm-input"><option>Assistant Professor</option><option>Professor</option></select>
             </div>
          </div>
        </div>
      </AdminSlidePanel>
    </div>
  );
};

export default FacultyManagement;
