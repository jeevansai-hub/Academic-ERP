import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_KEYS, seedAdminStorage, readStorage, writeStorage, MOCK_AUDIT_LOGS } from '../data/adminMockData';

interface AdminContextType {
  students: any[];
  faculty: any[];
  subjects: any[];
  departments: any[];
  branches: any[];
  notifications: any[];
  auditLogs: any[];
  toasts: any[];
  loading: boolean;
  addStudent: (data: any) => Promise<any>;
  updateStudent: (id: string, data: any) => Promise<any>;
  deleteStudent: (id: string) => Promise<any>;
  deactivateStudent: (id: string, reason: string) => Promise<any>;
  addFaculty: (data: any) => Promise<any>;
  updateFaculty: (id: string, data: any) => Promise<any>;
  deleteFaculty: (id: string) => Promise<any>;
  addSubject: (data: any) => Promise<any>;
  updateSubject: (id: string, data: any) => Promise<any>;
  deleteSubject: (id: string) => Promise<any>;
  addAuditLog: (log: any) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
  sendNotification: (data: any) => Promise<any>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [toasts, setToasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedAdminStorage();
    setStudents(readStorage(ADMIN_KEYS.students) || []);
    setFaculty(readStorage(ADMIN_KEYS.faculty) || []);
    setSubjects(readStorage(ADMIN_KEYS.subjects) || []);
    setDepartments(readStorage(ADMIN_KEYS.departments) || []);
    setBranches(readStorage(ADMIN_KEYS.branches) || []);
    setNotifications(readStorage(ADMIN_KEYS.notifications) || []);
    setAuditLogs(readStorage(ADMIN_KEYS.auditLogs) || []);
    setLoading(false);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addAuditLog = (log: any) => {
    const adminUser = JSON.parse(localStorage.getItem('ecap_adminUser') || '{}');
    const newLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: adminUser.name || 'Admin',
      userId: 'admin',
      role: 'admin',
      status: 'success',
      ipAddress: '192.168.1.1',
      ...log
    };
    const updatedLogs = [newLog, ...auditLogs];
    setAuditLogs(updatedLogs);
    writeStorage(ADMIN_KEYS.auditLogs, updatedLogs);
  };

  // CRUD Helpers
  const createCRUD = (setter: any, key: string, entityName: string) => {
    return async (data: any) => {
      try {
        const newItem = { ...data, id: `${entityName.toUpperCase().slice(0,3)}-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        setter((prev: any[]) => {
          const updated = [newItem, ...prev];
          writeStorage(key, updated);
          return updated;
        });
        addAuditLog({ action: 'CREATE', entity: entityName, entityId: newItem.id, details: `Created new ${entityName}: ${data.firstName || data.name || data.code}` });
        showToast(`${entityName} added successfully`, 'success');
        return { success: true, data: newItem };
      } catch (e: any) {
        showToast(`Failed to add ${entityName}`, 'error');
        return { success: false, error: e.message };
      }
    };
  };

  const updateCRUD = (setter: any, key: string, entityName: string) => {
    return async (id: string, data: any) => {
      try {
        setter((prev: any[]) => {
          const updated = prev.map(item => item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item);
          writeStorage(key, updated);
          return updated;
        });
        addAuditLog({ action: 'UPDATE', entity: entityName, entityId: id, details: `Updated ${entityName}: ${id}` });
        showToast(`${entityName} updated successfully`, 'success');
        return { success: true };
      } catch (e: any) {
        showToast(`Failed to update ${entityName}`, 'error');
        return { success: false, error: e.message };
      }
    };
  };

  const deleteCRUD = (setter: any, key: string, entityName: string) => {
    return async (id: string) => {
      try {
        setter((prev: any[]) => {
          const updated = prev.filter(item => item.id !== id);
          writeStorage(key, updated);
          return updated;
        });
        addAuditLog({ action: 'DELETE', entity: entityName, entityId: id, details: `Deleted ${entityName}: ${id}` });
        showToast(`${entityName} deleted permanently`, 'success');
        return { success: true };
      } catch (e: any) {
        showToast(`Failed to delete ${entityName}`, 'error');
        return { success: false, error: e.message };
      }
    };
  };

  const addStudent = createCRUD(setStudents, ADMIN_KEYS.students, 'student');
  const updateStudent = updateCRUD(setStudents, ADMIN_KEYS.students, 'student');
  const deleteStudent = deleteCRUD(setStudents, ADMIN_KEYS.students, 'student');
  const deactivateStudent = async (id: string, reason: string) => {
     try {
       setStudents(prev => {
         const updated = prev.map(s => s.id === id ? { ...s, status: 'Suspended', updatedAt: new Date().toISOString() } : s);
         writeStorage(ADMIN_KEYS.students, updated);
         return updated;
       });
       addAuditLog({ action: 'DEACTIVATE', entity: 'student', entityId: id, details: `Deactivated student ${id}. Reason: ${reason}` });
       showToast('Student deactivated', 'warning');
       return { success: true };
     } catch (e: any) {
       showToast('Failed to deactivate', 'error');
       return { success: false };
     }
  };

  const addFaculty = createCRUD(setFaculty, ADMIN_KEYS.faculty, 'faculty');
  const updateFaculty = updateCRUD(setFaculty, ADMIN_KEYS.faculty, 'faculty');
  const deleteFaculty = deleteCRUD(setFaculty, ADMIN_KEYS.faculty, 'faculty');

  const addSubject = createCRUD(setSubjects, ADMIN_KEYS.subjects, 'subject');
  const updateSubject = updateCRUD(setSubjects, ADMIN_KEYS.subjects, 'subject');
  const deleteSubject = deleteCRUD(setSubjects, ADMIN_KEYS.subjects, 'subject');

  const sendNotification = async (data: any) => {
    try {
      const newNotif = { ...data, id: `NOT-${Date.now()}`, sentAt: new Date().toISOString(), readRate: 0 };
      setNotifications(prev => {
        const updated = [newNotif, ...prev];
        writeStorage(ADMIN_KEYS.notifications, updated);
        return updated;
      });
      addAuditLog({ action: 'CREATE', entity: 'notification', details: `Sent notification: ${data.title}` });
      showToast('Notification sent', 'success');
      return { success: true };
    } catch (e: any) {
      showToast('Failed to send notification', 'error');
      return { success: false };
    }
  };

  return (
    <AdminContext.Provider value={{
      students, faculty, subjects, departments, branches, notifications, auditLogs, toasts, loading,
      addStudent, updateStudent, deleteStudent, deactivateStudent,
      addFaculty, updateFaculty, deleteFaculty,
      addSubject, updateSubject, deleteSubject,
      addAuditLog, showToast, removeToast, sendNotification
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
