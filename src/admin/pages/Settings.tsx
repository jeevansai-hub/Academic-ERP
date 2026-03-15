import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Globe, Shield, 
  Palette, Layout, Link as LinkIcon, Database,
  Check, Save
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const { showToast } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);

  const navItems = [
    { id: 'general', label: 'General', icon: <Globe size={18} /> },
    { id: 'academic', label: 'Academic', icon: <Layout size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'integrations', label: 'Integrations', icon: <LinkIcon size={18} /> },
    { id: 'backup', label: 'Backup', icon: <Database size={18} /> },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Settings saved successfully', 'success');
    }, 1000);
  };

  return (
    <div className="adm-root" style={{ animation: 'adm-fadeUp 400ms var(--ease-out)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="adm-title">System Settings</h1>
          <p className="adm-subtitle">Configure portal behavior, security, and appearance</p>
        </div>
        <button 
          className="adm-btn adm-btn-primary" 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? <Check size={16} /> : <Save size={16} />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
        {/* Nav Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                borderRadius: '10px', border: 'none', background: activeSection === item.id ? 'var(--p)' : 'transparent',
                color: activeSection === item.id ? '#fff' : 'var(--t3)',
                fontSize: '14px', fontWeight: activeSection === item.id ? 600 : 500,
                cursor: 'pointer', textAlign: 'left', transition: 'all 200ms ease'
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="adm-card" style={{ padding: '32px' }}>
          {activeSection === 'general' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>General Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="adm-input-group">
                  <label className="adm-label">Portal Name</label>
                  <input className="adm-input" defaultValue="ECAP — VIIT Student Performance Portal" />
                </div>
                <div className="adm-input-group">
                  <label className="adm-label">Institution Name</label>
                  <input className="adm-input" defaultValue="Vignan's Institute of Information Technology" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                   <div className="adm-input-group">
                      <label className="adm-label">Contact Email</label>
                      <input className="adm-input" defaultValue="support@viit.ac.in" />
                   </div>
                   <div className="adm-input-group">
                      <label className="adm-label">Institution Phone</label>
                      <input className="adm-input" defaultValue="+91 891 2755222" />
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeSection !== 'general' && (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
               <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--p)' }}>
                  <SettingsIcon size={32} />
               </div>
               <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Configuration</h3>
               <p style={{ color: 'var(--t4)', marginTop: '8px' }}>This section is currently using default system values.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
