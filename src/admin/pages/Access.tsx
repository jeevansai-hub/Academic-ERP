import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Eye, Key, 
  UserX, ShieldAlert, Monitor, Globe,
  Check, X, MoreHorizontal
} from 'lucide-react';

const Access: React.FC = () => {
  const [activeTab, setActiveTab] = useState('permissions');

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="adm-title">Access & Roles</h1>
          <p className="adm-subtitle">Manage user permissions and security sessions</p>
        </div>
        <button className="adm-btn adm-btn-primary">
          <Key size={16} /> Manage Roles
        </button>
      </div>

      <div style={{ display: 'flex', gap: '32px', marginBottom: '24px', borderBottom: '1px solid var(--bdl)' }}>
        {[
          { id: 'permissions', label: 'Permissions Matrix', icon: <ShieldCheck size={16} /> },
          { id: 'sessions', label: 'Active Sessions', icon: <Monitor size={16} /> },
          { id: 'locked', label: 'Locked Accounts', icon: <UserX size={16} /> },
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

      {activeTab === 'permissions' && (
        <div className="adm-table-container">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Feature / Module</th>
                <th style={{ textAlign: 'center' }}>Admin</th>
                <th style={{ textAlign: 'center' }}>Faculty</th>
                <th style={{ textAlign: 'center' }}>Student</th>
              </tr>
            </thead>
            <tbody>
              {[
                { module: 'View Personal Profile', admin: true, faculty: true, student: true },
                { module: 'Edit Personal Profile', admin: true, faculty: true, student: false },
                { module: 'View All Student Data', admin: true, faculty: true, student: false },
                { module: 'Modify Marks', admin: true, faculty: true, student: false },
                { module: 'System Settings', admin: true, faculty: false, student: false },
                { module: 'Audit Log Access', admin: true, faculty: false, student: false },
              ].map((m, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{m.module}</td>
                  <td style={{ textAlign: 'center' }}><Check size={18} color="var(--s)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ textAlign: 'center' }}>
                    {m.faculty ? <Check size={18} color="var(--s)" style={{ margin: '0 auto' }} /> : <X size={18} color="var(--t4)" style={{ margin: '0 auto' }} />}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {m.student ? <Check size={18} color="var(--s)" style={{ margin: '0 auto' }} /> : <X size={18} color="var(--t4)" style={{ margin: '0 auto' }} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab !== 'permissions' && (
        <div className="adm-card" style={{ padding: '64px', textAlign: 'center' }}>
           <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--p)' }}>
              <ShieldAlert size={32} />
           </div>
           <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{activeTab === 'sessions' ? 'Session' : 'Security'} Management</h3>
           <p style={{ color: 'var(--t4)', marginTop: '8px' }}>Tracking active system users and security events.</p>
        </div>
      )}
    </div>
  );
};

export default Access;
