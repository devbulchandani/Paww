import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing auth on mount
    const savedToken = localStorage.getItem('paww_token');
    const savedUserId = localStorage.getItem('paww_user_id');
    
    if (savedToken && savedUserId) {
      setToken(savedToken);
      // In a real app, you'd fetch user details here
      // For now, we'll just set basic user info
      setUser({
        id: savedUserId,
        name: '', // Will be populated when we fetch user details
        phone: '',
        role: 'ADOPTER',
        city: ''
      });
    }
  }, []);

  const login = (newToken: string, userId: string) => {
    localStorage.setItem('paww_token', newToken);
    localStorage.setItem('paww_user_id', userId);
    setToken(newToken);
    setUser({
      id: userId,
      name: '', // Will be populated when we fetch user details
      phone: '',
      role: 'ADOPTER',
      city: ''
    });
  };

  const logout = () => {
    localStorage.removeItem('paww_token');
    localStorage.removeItem('paww_user_id');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};