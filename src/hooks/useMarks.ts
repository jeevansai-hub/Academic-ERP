import { useState, useEffect, useCallback } from 'react';
import * as marksService from '../services/marksService';

export function useStudentMarks(studentUid: string, semester: number, academicYear: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    // This is now a manual trigger for refresh if needed, 
    // but onSnapshot handles most cases.
    try {
      setLoading(true);
      const res = await marksService.getStudentAllMarks(studentUid, semester, academicYear);
      setData(res);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [studentUid, semester, academicYear]);

  useEffect(() => {
    if (!studentUid) return;
    setLoading(true);
    
    // 🔥 REAL-TIME DYNAMIC UPDATE: Listen for changes instantly
    const unsubscribe = marksService.subscribeToStudentMarks(studentUid, semester, academicYear, (allMarks) => {
      setData(allMarks);
      setLoading(false);
      setError(null);
    });

    // 🌐 CROSS-TAB SYNC: Listen for LocalStorage changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
        if (e.key?.startsWith('ecap_marks_')) {
            marksService.getStudentAllMarks(studentUid, semester, academicYear).then(setData);
        }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [studentUid, semester, academicYear]);

  return { data, loading, error, refetch: fetchData };
}

export function useStudentWeeklyMarks(studentUid: string, subjectCode: string | null, semester: number, academicYear: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!studentUid) return;
    marksService.getStudentWeeklyMarks(studentUid, subjectCode, semester, academicYear)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [studentUid, subjectCode, semester, academicYear]);

  return { data, loading, error };
}

export function useStudentMidMarks(studentUid: string, semester: number, academicYear: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!studentUid) return;
    marksService.getStudentMidMarks(studentUid, semester, academicYear)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [studentUid, semester, academicYear]);

  return { data, loading, error };
}

export function useStudentLabMarks(studentUid: string, semester: number, academicYear: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!studentUid) return;
    marksService.getStudentLabMarks(studentUid, semester, academicYear)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [studentUid, semester, academicYear]);

  return { data, loading, error };
}

export function useStudentExternalMarks(studentUid: string, semester: number, academicYear: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!studentUid) return;
    marksService.getStudentExternalMarks(studentUid, semester, academicYear)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [studentUid, semester, academicYear]);

  return { data, loading, error };
}

export function useClassMarksEntry(subjectCode: string, section: string, assessmentType: string, week: number | null, semester: number, academicYear: string) {
  const [draftData, setDraftData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!subjectCode || !section) return;
    setLoading(true);
    marksService.getClassMarksForEntry(subjectCode, section, assessmentType, week, semester, academicYear)
      .then(setDraftData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [subjectCode, section, assessmentType, week, semester, academicYear]);

  return { draftData, loading, error };
}

export function useExternalMarksAdmin(semester: number, academicYear: string, section?: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchAdminMarks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await marksService.getAllStudentsExternalMarks(semester, academicYear, section);
      setData(res);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [semester, academicYear, section]);

  useEffect(() => {
    fetchAdminMarks();
  }, [fetchAdminMarks]);

  return { data, loading, error, refetch: fetchAdminMarks };
}

export function usePublishStatus(semester: number, academicYear: string) {
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [counts, setCounts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await marksService.getMarksPublishStatus(semester, academicYear);
      setStatus(res.publishStatus);
      setCounts(res);
    } finally {
      setLoading(false);
    }
  }, [semester, academicYear]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { status, counts, loading, refetch: fetchStatus };
}

export function useSaveMarks() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const wrapSave = async (fn: () => Promise<any>) => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await fn();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const saveWeekly = (payload: any) => wrapSave(() => marksService.saveWeeklyMarks(payload));
  const saveMid = (payload: any) => wrapSave(() => marksService.saveMidMarks(payload));
  const saveLab = (payload: any) => wrapSave(() => marksService.saveLabMarks(payload));
  const saveExternal = (payload: any) => wrapSave(() => marksService.saveExternalMarks(payload));
  const publishExternal = (sem: number, year: string, uid: string) => wrapSave(() => marksService.publishExternalMarks(sem, year, uid));

  return { saveWeekly, saveMid, saveLab, saveExternal, publishExternal, saving, error, success };
}
