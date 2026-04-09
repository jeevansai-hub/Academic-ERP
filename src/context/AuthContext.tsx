import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin' | 'parent';
  rollNo?: string | null;
  branch?: string | null;
  semester?: number | null;
  department?: string | null;
  designation?: string | null;
  avatar: string;
  isActive: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string, role: string) => Promise<void>;
  signInWithGoogle: (role: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  login: async () => {},
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
      
      if (user) {
        // 1. Immediately create a local profile so the app loads FAST
        const pendingRole = localStorage.getItem('ecap_dev_role') || 'student';
        
        // Extract potential roll number from email prefix
        const emailPrefix = user.email?.split('@')[0] || '';
        const potentialRollNo = (emailPrefix.includes('-') || /^\d+$/.test(emailPrefix)) ? emailPrefix : null;

        const initialProfile: UserProfile = {
          uid: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          role: pendingRole as any,
          rollNo: potentialRollNo,
          isActive: true,
          avatar: user.photoURL || ''
        };
        setUserProfile(initialProfile);

        // 2. Fetch the real profile from Firestore in the background
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Critical Fix: Always favor the dev role if set and valid
            const devRole = localStorage.getItem('ecap_dev_role');
            const finalRole = (devRole && devRole !== 'student') ? devRole : (data.role || 'student');
            
            setUserProfile({ ...data, role: finalRole } as UserProfile);
          } else {
            setDoc(docRef, initialProfile).catch(() => {});
          }
        }).catch((err) => {
          console.warn("Background profile sync skipped:", err);
        });
      } else {
        setUserProfile(null);
      }
      
      // 3. Mark as loaded IMMEDIATELY
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (emailOrRoll: string, pass: string, role: string) => {
    try {
      localStorage.setItem('ecap_dev_role', role); 
      const input = emailOrRoll.trim().replace(/\s+/g, '');
      const email = input.includes('@') ? input : `${input}@viit.ac.in`;
      
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, email, pass);
      } catch (signInError: any) {
        if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential' || signInError.code === 'auth/invalid-login-credentials') {
          console.log("User not found, auto-creating account...");
          userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        } else {
          throw signInError;
        }
      }

      // Just set the user; the onAuthStateChanged handle above will take it from here
      setCurrentUser(userCredential.user);

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signInWithGoogle = async (role: string) => {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    localStorage.setItem('ecap_dev_role', role);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign-in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('ecap_userRole');
      localStorage.removeItem('ecap_dev_role');
      localStorage.removeItem('ecap_adminUser');
      setUserProfile(null);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, login, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
