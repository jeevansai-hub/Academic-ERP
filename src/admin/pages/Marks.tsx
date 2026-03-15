import React, { useState } from 'react';
import { 
  Database, Search, Filter, Calendar, 
  CheckCircle, Clock, AlertCircle, Lock,
  MoreHorizontal, FileUp, Send
} from 'lucide-react';

const Marks: React.FC = () => {
  const [activeTab, setActiveTab] = useState('compliance');

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="adm-title">Marks & Assessments</h1>
          <p className="adm-subtitle">Monitor grading compliance and assessment schedules</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="adm-btn adm-btn-outline">
            <Calendar size={16} /> Exam Calendar
          </button>
          <button className="adm-btn adm-btn-primary">
            <FileUp size={16} /> Bulk Upload
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Entries', value: '48,200', icon: <Database />, color: 'blue' },
          { label: 'Pending Uploads', value: '12', icon: <Clock />, color: 'orange' },
          { label: 'Portal Average', value: '74.2%', icon: <CheckCircle />, color: 'green' },
          { label: 'Overdue Grading', value: '3', icon: <AlertCircle />, color: 'red' },
        ].map((s, i) => (
          <div key={i} className="adm-card" style={{ padding: '20px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--t4)', textTransform: 'uppercase' }}>{s.label}</div>
                <div style={{ color: `var(--${s.color})` }}>{s.icon}</div>
             </div>
             <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--t1)', marginTop: '8px' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Compliance Table */}
      <div className="adm-table-container">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--bdl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Faculty Upload Compliance</h3>
          <button className="adm-btn adm-btn-ghost" style={{ border: '1px solid var(--pd)', color: 'var(--p)' }}>Send Reminders to All</button>
        </div>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Faculty</th>
              <th>Subject</th>
              <th>Assessment</th>
              <th>Due Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { faculty: 'Dr. Rajesh Varma', subject: 'CS601', test: 'Mid-term 1', date: '2026-03-10', status: 'Uploaded', type: 'success' },
              { faculty: 'Dr. Suresh Rao', subject: 'EC601', test: 'Weekly Quiz 4', date: '2026-03-14', status: 'Pending', type: 'warning' },
              { faculty: 'Mrs. Anjali Murthy', subject: 'IT601', test: 'Mid-term 1', date: '2026-03-08', status: 'Overdue', type: 'error' },
            ].map((m, i) => (
              <tr key={i}>
                <td>{m.faculty}</td>
                <td className="adm-mono">{m.subject}</td>
                <td>{m.test}</td>
                <td>{m.date}</td>
                <td>
                  <span className="adm-badge" style={{ 
                    background: `var(--${m.type === 'success' ? 's' : m.type === 'warning' ? 'w' : 'd'}l)`, 
                    color: `var(--${m.type === 'success' ? 's' : m.type === 'warning' ? 'w' : 'd'})` 
                  }}>
                    {m.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="adm-btn adm-btn-ghost" style={{ width: '32px', height: '32px', padding: 0 }}>
                    {m.status === 'Uploaded' ? <Lock size={16} /> : <Send size={16} color="var(--p)" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
