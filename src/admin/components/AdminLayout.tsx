import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import AdminToast from './shared/AdminToast';
import '../styles/admin.css';

const AdminLayout = () => {
  return (
    <div className="adm-root adm-shell">
      <AdminSidebar />
      <div className="adm-main">
        <AdminNavbar />
        <main className="adm-content">
          <Outlet />
        </main>
      </div>
      <AdminToast />
    </div>
  );
};

export default AdminLayout;
