import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import AdminToast from '../components/AdminToast';
import '../styles/admin.css';

const AdminLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="adm-root adm-shell">
      <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className="adm-main">
        <AdminNavbar isSidebarCollapsed={isSidebarCollapsed} />
        <main className="adm-content">
          <Outlet />
        </main>
      </div>
      <AdminToast />
    </div>
  );
};

export default AdminLayout;
