import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, 
  BarChart3, Bell, ShieldCheck, Settings, 
  History, LogOut, ChevronLeft, ChevronRight,
  Database, ClipboardList
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const { showToast } = useAdmin();
  const adminUser = JSON.parse(localStorage.getItem('ecap_adminUser') || '{}');

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: 'dashboard' },
    { label: 'Students', icon: <Users size={20} />, path: 'students', badge: '2,400' },
    { label: 'Faculty', icon: <GraduationCap size={20} />, path: 'faculty', badge: '85' },
    { label: 'Subjects & Depts', icon: <BookOpen size={20} />, path: 'subjects' },
    { label: 'Marks & Assessments', icon: <Database size={20} />, path: 'marks' },
    { label: 'External Marks', icon: <ClipboardList size={20} />, path: 'external-marks' },
    { label: 'Analytics & Reports', icon: <BarChart3 size={20} />, path: 'analytics' },
    { label: 'Notifications', icon: <Bell size={20} />, path: 'notifications' },
    { label: 'Access & Roles', icon: <ShieldCheck size={20} />, path: 'access' },
    { label: 'System Settings', icon: <Settings size={20} />, path: 'settings' },
    { label: 'Audit Logs', icon: <History size={20} />, path: 'audit' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('ecap_userRole');
      localStorage.removeItem('ecap_adminUser');
      showToast('Logged out successfully', 'info');
      navigate('/login');
    }
  };

  return (
    <aside 
      className={`adm-sidebar ${isCollapsed ? 'adm-sidebar-collapsed' : ''}`}
      style={{
        width: isCollapsed ? '68px' : '248px',
        height: '100vh',
        background: '#fff',
        borderRight: '1px solid var(--bdl)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 300ms var(--ease-out)',
        position: 'relative',
        zIndex: 100
      }}
    >
      {/* Logo Section */}
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--bdl)' }}>
        <div style={{ 
          width: '32px', height: '32px', background: 'var(--adm)', borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifySelf: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px',
          flexShrink: 0, justifyContent: 'center'
        }}>V</div>
        {!isCollapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--t1)' }}>ECAP Admin</div>
            <div style={{ fontSize: '10px', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Management Portal</div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      {!isCollapsed && (
        <div style={{ padding: '16px' }}>
          <div style={{ 
            background: 'var(--adml)', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px',
            display: 'flex', alignItems: 'center', gap: '12px', position: 'relative'
          }}>
            <div style={{ 
              width: '38px', height: '38px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: '14px'
            }}>
              {adminUser.initials || 'AD'}
              <div style={{ 
                position: 'absolute', bottom: '12px', left: '40px', width: '8px', height: '8px', 
                background: '#22c55e', borderRadius: '50%', border: '2px solid #fff'
              }}></div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--t1)' }}>{adminUser.name || 'Admin User'}</div>
              <div style={{ fontSize: '11px', color: 'var(--t4)' }}>Administrator</div>
            </div>
            <div style={{ 
              position: 'absolute', top: '8px', right: '8px', fontSize: '10px', fontWeight: 700, 
              color: '#dc2626', background: 'rgba(220,38,38,0.1)', padding: '2px 6px', borderRadius: '4px' 
            }}>ADMIN</div>
          </div>
        </div>
      )}

      {/* Nav Section */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }} className="adm-sb-nav">
        {!isCollapsed && <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--t4)', padding: '8px 12px', letterSpacing: '0.1em' }}>MAIN MENU</div>}
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0 12px',
              height: '40px',
              borderRadius: '8px',
              marginBottom: '2px',
              textDecoration: 'none',
              transition: 'all 180ms ease',
              background: isActive ? 'var(--p)' : 'transparent',
              color: isActive ? '#fff' : 'var(--t3)',
              boxShadow: isActive ? 'var(--sh-blue)' : 'none',
              position: 'relative'
            })}
            title={isCollapsed ? item.label : ''}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px' }}>
              {item.icon}
            </span>
            {!isCollapsed && <span style={{ fontSize: '13px', fontWeight: 500 }}>{item.label}</span>}
            {!isCollapsed && item.badge && (
              <span style={{ 
                marginLeft: 'auto', background: 'rgba(0,0,0,0.05)', color: 'inherit',
                fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '10px'
              }}>{item.badge}</span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Logout Row */}
      <div style={{ borderTop: '1px solid var(--bdl)', padding: '8px' }}>
        <button 
          onClick={handleLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px', height: '40px',
            borderRadius: '8px', border: 'none', background: 'transparent', color: 'var(--d)', cursor: 'pointer',
            transition: 'background 120ms ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dl)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut size={20} />
          {!isCollapsed && <span style={{ fontSize: '13px', fontWeight: 600 }}>Log Out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'absolute', right: '-14px', top: '72px', width: '28px', height: '28px',
          borderRadius: '50%', background: 'var(--bdl)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t3)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10
        }}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
};

export default AdminSidebar;
