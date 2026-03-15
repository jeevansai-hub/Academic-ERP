import { useAdmin } from '../context/AdminContext';

export const useAdminStudents = () => {
  const { students, loading, addStudent, updateStudent, deleteStudent, deactivateStudent } = useAdmin();
  return { students, loading, addStudent, updateStudent, deleteStudent, deactivateStudent };
};

export const useAdminFaculty = () => {
  const { faculty, loading, addFaculty, updateFaculty, deleteFaculty } = useAdmin();
  return { faculty, loading, addFaculty, updateFaculty, deleteFaculty };
};

export const useAdminSubjects = () => {
  const { subjects, loading, addSubject, updateSubject, deleteSubject } = useAdmin();
  return { subjects, loading, addSubject, updateSubject, deleteSubject };
};

export const useAdminAudit = () => {
  const { auditLogs, loading, addAuditLog } = useAdmin();
  return { auditLogs, loading, addAuditLog };
};
