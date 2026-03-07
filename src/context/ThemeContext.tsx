import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface ThemeContextType {
  themeColor: string;
}

const ThemeContext = createContext<ThemeContextType>({
  themeColor: 'var(--blue-accent)',
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { userProfile } = useAuth();
  const [themeColor, setThemeColor] = useState('var(--blue-accent)');

  useEffect(() => {
    if (userProfile?.role === 'student') {
      setThemeColor('var(--role-student)');
    } else if (userProfile?.role === 'faculty') {
      setThemeColor('var(--role-faculty)');
    } else if (userProfile?.role === 'admin') {
      setThemeColor('var(--role-admin)');
    } else {
      setThemeColor('var(--blue-accent)');
    }
    
    // Set customized CSS variable for active role color globally
    document.documentElement.style.setProperty('--active-role-color', themeColor);
  }, [userProfile?.role, themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
