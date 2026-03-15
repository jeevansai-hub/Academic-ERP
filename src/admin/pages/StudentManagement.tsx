import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, FileDown, 
  MoreHorizontal, Eye, Edit2, Lock, 
  Trash2, ArrowUpDown, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAdminStudents } from '../hooks/useAdminHooks';
import AdminSlidePanel from '../components/AdminSlidePanel';

const StudentManagement: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useAdminStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filteredStudents = students.filter(s => 
    s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return { bg: 'var(--sl)', text: 'var(--s)' };
      case 'Suspended': return { bg: 'var(--dl)', text: 'var(--d)' };
      case 'Graduated': return { bg: 'var(--pl)', text: 'var(--p)' };
      default: return { bg: 'var(--bdl)', text: 'var(--t4)' };
    }
  };

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="adm-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            Student Management
            <span style={{ fontSize: '13px', background: 'var(--bdl)', color: 'var(--t3)', padding: '2px 10px', borderRadius: '10px' }}>
              {students.length} Total
            </span>
          </h1>
          <p className="adm-subtitle">View and manage all students across all branches</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="adm-btn adm-btn-outline">
            <FileDown size={16} /> Export
          </button>
          <button className="adm-btn adm-btn-primary" onClick={() => setIsAddPanelOpen(true)}>
            <Plus size={16} /> Add Student
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
            placeholder="Search by name, roll number, email..." 
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
              <th>Roll Number <ArrowUpDown size={12} style={{ marginLeft: '4px' }} /></th>
              <th>Name</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>CGPA</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                <td><input type="checkbox" /></td>
                <td className="adm-mono" style={{ color: 'var(--p)', fontWeight: 500 }}>{s.rollNumber}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bdl)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600
                    }}>
                      {s.firstName[0]}{s.lastName[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--t1)' }}>{s.firstName} {s.lastName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--t4)' }}>{s.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="adm-badge" style={{ background: 'var(--pl)', color: 'var(--p)' }}>{s.branch}</span>
                </td>
                <td>Sem {s.semester}</td>
                <td className="adm-mono" style={{ fontWeight: 700 }}>{s.cgpa.toFixed(2)}</td>
                <td>
                  <span className="adm-badge" style={{ 
                    background: getStatusColor(s.status).bg, 
                    color: getStatusColor(s.status).text 
                  }}>
                    <div className="adm-badge-dot" style={{ background: getStatusColor(s.status).text }}></div>
                    {s.status}
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
        
        {/* Pagination Placeholder */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--bdl)' }}>
          <div style={{ fontSize: '12px', color: 'var(--t4)' }}>Showing 1 - {filteredStudents.length} of {students.length} students</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="adm-btn adm-btn-outline" style={{ width: '32px', padding: 0 }} disabled><ChevronLeft size={16} /></button>
            <button className="adm-btn adm-btn-primary" style={{ width: '32px', padding: 0 }}>1</button>
            <button className="adm-btn adm-btn-outline" style={{ width: '32px', padding: 0 }} disabled><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Add Student Panel */}
      <AdminSlidePanel 
        isOpen={isAddPanelOpen} 
        onClose={() => setIsAddPanelOpen(false)} 
        title="Add New Student"
        subtitle="Fill in the details to enroll a new student"
        footer={(
          <>
            <button className="adm-btn adm-btn-outline" onClick={() => setIsAddPanelOpen(false)}>Cancel</button>
            <button className="adm-btn adm-btn-primary" onClick={() => {
               // Pseudo add
               addStudent({
                 rollNumber: 'VIIT-2021-CSE-999',
                 firstName: 'New',
                 lastName: 'Student',
                 email: 'new.student@viit.ac.in',
                 branch: 'CSE',
                 semester: 1,
                 cgpa: 0,
                 status: 'Active'
               });
               setIsAddPanelOpen(false);
            }}>Save Student</button>
          </>
        )}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="adm-input-group">
              <label className="adm-label">First Name *</label>
              <input className="adm-input" placeholder="Arjun" />
            </div>
            <div className="adm-input-group">
              <label className="adm-label">Last Name *</label>
              <input className="adm-input" placeholder="Reddy" />
            </div>
          </div>
          <div className="adm-input-group">
              <label className="adm-label">Roll Number *</label>
              <input className="adm-input adm-mono" placeholder="VIIT-2021-CSE-001" />
          </div>
          <div className="adm-input-group">
              <label className="adm-label">Official Email *</label>
              <input className="adm-input" placeholder="arjun.reddy@viit.ac.in" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="adm-input-group">
              <label className="adm-label">Branch *</label>
              <select className="adm-input">
                <option>CSE</option>
                <option>IT</option>
                <option>ECE</option>
              </select>
            </div>
            <div className="adm-input-group">
              <label className="adm-label">Semester *</label>
              <select className="adm-input">
                {[1,2,3,4,5,6,7,8].map(s => <option key={s}>Semester {s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </AdminSlidePanel>
    </div>
  );
};

export default StudentManagement;
