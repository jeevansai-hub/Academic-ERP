import React, { useState } from 'react';
import { 
  Bell, Send, Filter, MoreHorizontal, 
  Users, User, Building2, Megaphone, 
  AlertTriangle, Calendar, Info, Clock, Check
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Notifications: React.FC = () => {
  const { notifications, sendNotification, showToast } = useAdmin();
  const [activeTab, setActiveTab] = useState('compose');

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="adm-title">Notifications</h1>
          <p className="adm-subtitle">Broadcast messages and manage system alerts</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 7fr', gap: '32px' }}>
         {/* Compose / Left Side */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div className="adm-card" style={{ padding: '24px', borderLeft: '4px solid var(--p)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Send size={18} color="var(--p)" /> Compose New
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div className="adm-input-group">
                   <label className="adm-label">To Group *</label>
                   <select className="adm-input"><option>All Students (2,400)</option><option>All Faculty (85)</option><option>Everyone</option></select>
                 </div>
                 <div className="adm-input-group">
                   <label className="adm-label">Notification Type *</label>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <button className="adm-btn adm-btn-outline" style={{ height: '32px', fontSize: '11px', borderColor: 'var(--p)', background: 'var(--pl)' }}><Megaphone size={14} /> Announcement</button>
                      <button className="adm-btn adm-btn-outline" style={{ height: '32px', fontSize: '11px' }}><AlertTriangle size={14} /> Alert</button>
                   </div>
                 </div>
                 <div className="adm-input-group">
                   <label className="adm-label">Title *</label>
                   <input className="adm-input" placeholder="e.g. Mid-term Results Published" />
                 </div>
                 <div className="adm-input-group">
                   <label className="adm-label">Message *</label>
                   <textarea 
                    className="adm-input" 
                    style={{ height: '100px', padding: '12px', resize: 'none' }}
                    placeholder="Type your message here..."
                   ></textarea>
                 </div>
                 <button 
                  className="adm-btn adm-btn-primary" 
                  style={{ width: '100%', marginTop: '8px' }}
                  onClick={() => {
                    sendNotification({ title: 'New Notification', message: 'Message sent successfully', type: 'Announcement', priority: 'Normal' });
                  }}
                >
                  <Send size={16} /> Send Notification
                 </button>
              </div>
           </div>
         </div>

         {/* History / Right Side */}
         <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--bdl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Sent History</h3>
               <button className="adm-btn adm-btn-ghost" style={{ fontSize: '12px' }}><Filter size={14} /> Filter</button>
            </div>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
               {notifications.map((n, i) => (
                 <div key={i} style={{ padding: '16px 24px', borderBottom: '1px solid var(--bdl)', display: 'flex', gap: '16px', background: i === 0 ? 'rgba(37,99,235,0.02)' : 'transparent' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: n.type === 'Alert' ? 'var(--dl)' : 'var(--pl)', color: n.type === 'Alert' ? 'var(--d)' : 'var(--p)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {n.type === 'Alert' ? <AlertTriangle size={20} /> : <Megaphone size={20} />}
                    </div>
                    <div style={{ flex: 1 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--t1)' }}>{n.title}</h4>
                          <span style={{ fontSize: '11px', color: 'var(--t4)' }}>{new Date(n.sentAt).toLocaleDateString()}</span>
                       </div>
                       <p style={{ fontSize: '13px', color: 'var(--t3)', marginTop: '4px', lineHeight: '1.4' }}>{n.message}</p>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--t4)', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> Recipients: All Students</span>
                          <span style={{ fontSize: '11px', color: 'var(--s)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><Check size={12} /> {n.readRate}% Read</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Notifications;
