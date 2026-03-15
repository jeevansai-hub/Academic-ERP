import React, { useState } from 'react';
import { 
  History, Search, Filter, FileDown, 
  Activity, ArrowUpDown, ChevronLeft, ChevronRight,
  ShieldAlert, User, Clock, Terminal
} from 'lucide-react';
import { useAdminAudit } from '../hooks/useAdminHooks';

const AuditLogs: React.FC = () => {
  const { auditLogs } = useAdminAudit();
  const [searchTerm, setSearchTerm] = useState('');

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return '#10b981';
      case 'UPDATE': return '#2563eb';
      case 'DELETE': return '#ef4444';
      case 'LOGIN': return '#7c3aed';
      case 'DEACTIVATE': return '#f59e0b';
      default: return 'var(--t4)';
    }
  };

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="adm-title">Audit Logs</h1>
          <p className="adm-subtitle">Track every administrative action and security event</p>
        </div>
        <button className="adm-btn adm-btn-outline">
          <FileDown size={16} /> Export Logs
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: "Today's Actions", value: '24', icon: <Activity />, color: 'blue' },
          { label: "Critical Events", value: '0', icon: <ShieldAlert />, color: 'red' },
          { label: "Active Admins", value: '1', icon: <User />, color: 'purple' },
          { label: "Storage Used", value: '85 MB', icon: <Terminal />, color: 'green' },
        ].map((s, i) => (
          <div key={i} className="adm-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
               <div style={{ padding: '8px', background: `var(--${s.color}l)`, color: `var(--${s.color})`, borderRadius: '8px' }}>{s.icon}</div>
               <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--t4)', textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--t1)' }}>{s.value}</div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="adm-table-container">
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--bdl)', display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} color="var(--t4)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              className="adm-input" 
              placeholder="Search logs by user, action, or details..." 
              style={{ paddingLeft: '42px', height: '42px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="adm-btn adm-btn-outline" style={{ height: '42px' }}>
            <Filter size={18} /> All Actions
          </button>
        </div>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>IP Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id}>
                <td className="adm-mono" style={{ fontSize: '11px' }}>
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bdl)', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AD</div>
                    <span style={{ fontWeight: 500 }}>{log.userName}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '3px', height: '14px', background: getActionColor(log.action), borderRadius: '2px' }}></div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--t1)' }}>{log.action}</span>
                  </div>
                </td>
                <td>{log.details}</td>
                <td className="adm-mono" style={{ color: 'var(--t4)' }}>{log.ipAddress}</td>
                <td>
                  <span className="adm-badge" style={{ background: 'var(--sl)', color: 'var(--s)' }}>{log.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
