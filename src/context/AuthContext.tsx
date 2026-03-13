import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
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
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Persistence for development/demo
  useEffect(() => {
    const savedUser = sessionStorage.getItem('ecap_mock_user');
    if (savedUser) {
      setUserProfile(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setCurrentUser(user);
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            setUserProfile(null);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (emailOrRoll: string, pass: string, role: any) => {
    setLoading(true);
    // In a real app, you'd call signInWithEmailAndPassword(auth, email, pass)
    // For now, we simulate success and set the profile
    
    const mockProfile: UserProfile = {
      uid: 'mock-uid-' + Date.now(),
      name: role === 'student' ? 'Rajesh Kumar' : role === 'faculty' ? 'Dr. Ramesh Kumar' : 'System Admin',
      email: emailOrRoll.includes('@') ? emailOrRoll : `${emailOrRoll}@viit.ac.in`,
      role: role,
      department: 'Computer Science & Engineering',
      avatar: '',
      isActive: true,
      rollNo: role === 'student' ? (emailOrRoll.includes('@') ? 'VIIT21CS001' : emailOrRoll) : null,
    };

    setUserProfile(mockProfile);
    sessionStorage.setItem('ecap_mock_user', JSON.stringify(mockProfile));
    setLoading(false);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setUserProfile(null);
    sessionStorage.removeItem('ecap_mock_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, login, logout }}>
      {(!loading || userProfile) && children}
    </AuthContext.Provider>
  );
};
