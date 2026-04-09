import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { db } from '../../../firebase/config';
import { doc, onSnapshot, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';

interface ParentContextType {
  parentProfile: any | null;
  studentProfile: any | null;
  linkedStudents: any[];
  activeStudentUID: string | null;
  setActiveStudentUID: (uid: string) => void;
  loading: boolean;
  accessDenied: boolean;
  logout: () => Promise<void>;
}

const ParentContext = createContext<ParentContextType>({
  parentProfile: null,
  studentProfile: null,
  linkedStudents: [],
  activeStudentUID: null,
  setActiveStudentUID: () => {},
  loading: true,
  accessDenied: false,
  logout: async () => {},
});

export const useParentAuth = () => useContext(ParentContext);

export const ParentProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, logout } = useAuth();
  const [parentProfile, setParentProfile] = useState<any | null>(null);
  const [studentProfile, setStudentProfile] = useState<any | null>(null);
  const [linkedStudents, setLinkedStudents] = useState<any[]>([]);
  const [activeStudentUID, _setActiveStudentUID] = useState<string | null>(localStorage.getItem('ecap_active_student_uid'));
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  // Wrapper for setActiveStudentUID to persist it
  const setActiveStudentUID = useCallback((uid: string) => {
    _setActiveStudentUID(uid);
    localStorage.setItem('ecap_active_student_uid', uid);
  }, []);

  // Helper to find student doc by UID or Roll Number
  const fetchStudentInfo = async (id: string) => {
    // 1. Try by Doc ID (UID)
    const sDoc = await getDoc(doc(db, 'users', id));
    if (sDoc.exists()) return { uid: id, ...sDoc.data() };

    // 2. Try by Roll Number query
    const q = query(collection(db, 'users'), where('rollNo', '==', id));
    const qSnap = await getDocs(q);
    if (!qSnap.empty) {
      const doc = qSnap.docs[0];
      return { uid: doc.id, ...doc.data() };
    }

    return null;
  };

  // 1. Sub to Parent Profile
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const parentRef = doc(db, 'users', currentUser.uid);
    const unsubscribe = onSnapshot(parentRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Role Check
        const devRole = localStorage.getItem('ecap_dev_role');
        const isParent = data.role === 'parent' || devRole === 'parent';

        if (!isParent) {
          setAccessDenied(true);
          setLoading(false);
          return;
        }

        setParentProfile({ uid: currentUser.uid, ...data });
        setAccessDenied(false);

        // Manage Linked Students
        const rawUids = data.linkedStudentUIDs || (data.linkedStudentUID ? [data.linkedStudentUID] : []);
        
        if (rawUids.length > 0) {
           const studentsData = await Promise.all(rawUids.map(uid => fetchStudentInfo(uid)));
           const validStudents = studentsData.filter(s => s !== null);
           
           setLinkedStudents(validStudents);

           if (validStudents.length > 0) {
              const firstValidUid = validStudents[0].uid;
              if (!activeStudentUID || !validStudents.some(s => s.uid === activeStudentUID)) {
                 setActiveStudentUID(firstValidUid);
              }
           } else {
             setLoading(false);
           }
        } else {
           setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }, (err) => {
      console.error("Parent Context: Parent sub error", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, activeStudentUID, setActiveStudentUID]);

  // 2. Sub to Active Student Profile
  useEffect(() => {
    if (!activeStudentUID) return;

    setLoading(true);
    const studentRef = doc(db, 'users', activeStudentUID);
    const unsubscribe = onSnapshot(studentRef, (sSnap) => {
      if (sSnap.exists()) {
        setStudentProfile({ uid: activeStudentUID, ...sSnap.data() });
      } else {
        // Fallback for roll number links
        fetchStudentInfo(activeStudentUID).then(data => {
          if (data) setStudentProfile(data);
          else setStudentProfile(null);
        });
      }
      setLoading(false);
    }, (err) => {
      console.error("Parent Context: Student sub error", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeStudentUID]);

  return (
    <ParentContext.Provider value={{ 
      parentProfile, 
      studentProfile, 
      linkedStudents,
      activeStudentUID,
      setActiveStudentUID,
      loading, 
      accessDenied, 
      logout 
    }}>
      {children}
    </ParentContext.Provider>
  );
};
