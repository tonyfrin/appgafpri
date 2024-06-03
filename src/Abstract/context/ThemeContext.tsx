'use client'
import { createContext, useContext, ReactNode } from 'react';
import { UseGafpriAppWebReturn, useGafpriAppWeb } from '../states/useGafpriAppWeb';

const ThemeContext = createContext<UseGafpriAppWebReturn | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const useAppWeb = useGafpriAppWeb();

  return (
    <ThemeContext.Provider value={useAppWeb}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};