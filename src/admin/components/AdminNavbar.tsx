import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, Plus, Bell, ChevronDown, 
  Menu, X, User, Settings, History, LogOut
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AdminNavbarProps {
  isSidebarCollapsed: boolean;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ isSidebarCollapsed }) => {
  const location = useLocation();
  const { showToast } = useAdmin();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  };

  const adminUser = JSON.parse(localStorage.getItem('ecap_adminUser') || '{}');

  return (
    <header style={{
      height: '60px',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(12px) saturate(180%)',
      borderBottom: '1px solid var(--bdl)',
      sticky: 'top',
      top: 0,
      zIndex: 90,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ 
          display: 'none', // Mobile only in full implementation
          background: 'none', border: 'none', cursor: 'pointer' 
        }}>
          <Menu size={24} color="var(--t2)" />
        </button>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--t4)', fontWeight: 500 }}>Admin / {getPageTitle()}</div>
          <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--t1)' }}>{getPageTitle()}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Search */}
        <button 
          className="adm-btn adm-btn-ghost" 
          style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%' }}
          onClick={() => setShowSearch(true)}
        >
          <Search size={20} />
        </button>

        {/* Add Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            className="adm-btn adm-btn-primary" 
            style={{ height: '34px', padding: '0 12px', borderRadius: '8px' }}
          >
            <Plus size={18} />
            <span style={{ fontSize: '13px' }}>Add New</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button 
            className="adm-btn adm-btn-ghost" 
            style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%', position: 'relative' }}
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
          >
            <Bell size={20} />
            <div style={{ 
              position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', 
              background: 'var(--d)', borderRadius: '50%', border: '2px solid #fff' 
            }}></div>
          </button>
          
          {showNotifDropdown && (
            <div style={{ 
              position: 'absolute', top: '48px', right: 0, width: '320px', 
              background: '#fff', borderRadius: '12px', boxShadow: 'var(--sh-xl)',
              border: '1px solid var(--bdl)', overflow: 'hidden', padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>Notifications</div>
                <button style={{ border: 'none', background: 'none', color: 'var(--p)', fontSize: '11px', cursor: 'pointer' }}>Mark all read</button>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 {[1, 2, 3].map(i => (
                   <div key={i} style={{ display: 'flex', gap: '12px', padding: '8px', borderRadius: '8px', background: i === 1 ? 'var(--pl)' : 'transparent' }}>
                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bdl)', flexShrink: 0 }}></div>
                     <div>
                       <div style={{ fontSize: '13px', fontWeight: 500 }}>System maintenance scheduled</div>
                       <div style={{ fontSize: '11px', color: 'var(--t4)' }}>2 hours ago</div>
                     </div>
                   </div>
                 ))}
               </div>
               <div style={{ borderTop: '1px solid var(--bdl)', marginTop: '16px', paddingTop: '12px', textAlign: 'center' }}>
                 <button style={{ border: 'none', background: 'none', color: 'var(--p)', fontSize: '13px', cursor: 'pointer' }}>View all notifications</button>
               </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button 
            className="adm-btn adm-btn-ghost" 
            style={{ height: '38px', padding: '0 8px', borderRadius: '8px', gap: '10px' }}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: '12px'
            }}>
              {adminUser.initials || 'AD'}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--t1)' }}>{adminUser.name?.split(' ')[0] || 'Admin'}</span>
            <ChevronDown size={14} style={{ transform: showProfileDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
          </button>

          {showProfileDropdown && (
            <div style={{ 
              position: 'absolute', top: '48px', right: 0, width: '220px', 
              background: '#fff', borderRadius: '12px', boxShadow: 'var(--sh-xl)',
              border: '1px solid var(--bdl)', overflow: 'hidden'
            }}>
              <div style={{ padding: '16px', borderBottom: '1px solid var(--bdl)' }}>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>{adminUser.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--t4)' }}>{adminUser.email}</div>
              </div>
              <div style={{ padding: '8px' }}>
                {[
                  { label: 'View Profile', icon: <User size={16} />, path: '#' },
                  { label: 'System Settings', icon: <Settings size={16} />, path: '/admin/settings' },
                  { label: 'Audit Logs', icon: <History size={16} />, path: '/admin/audit' },
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    style={{ 
                      width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px',
                      borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer',
                      fontSize: '13px', color: 'var(--t2)', transition: 'background 120ms'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                <div style={{ height: '1px', background: 'var(--bdl)', margin: '8px 0' }}></div>
                <button 
                  style={{ 
                    width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px',
                    borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer',
                    fontSize: '13px', color: 'var(--d)', transition: 'background 120ms'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dl)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => {
                    localStorage.removeItem('ecap_userRole');
                    localStorage.removeItem('ecap_adminUser');
                    window.location.href = '/login';
                  }}
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div style={{
          position: 'absolute', inset: 0, background: '#fff', zContext: 100,
          display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px',
          animation: 'adm-fadeIn 200ms ease'
        }}>
          <Search size={22} color="var(--t4)" />
          <input 
            autoFocus
            placeholder="Search students, faculty, subjects..."
            style={{ flex: 1, height: '44px', border: 'none', outline: 'none', fontSize: '16px' }}
          />
          <button 
            onClick={() => setShowSearch(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--t3)' }}
          >
            <X size={24} />
          </button>
        </div>
      )}
    </header>
  );
};

export default AdminNavbar;
