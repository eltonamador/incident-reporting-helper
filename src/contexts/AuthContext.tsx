import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'despachante' | 'respondedor';

interface User {
  role: UserRole;
  gbm?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, gbm?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (role: UserRole, gbm?: string) => {
    const newUser = { role, gbm };
    setUser(newUser);

    if (role === 'despachante') {
      navigate('/ciodes');
    } else if (role === 'respondedor' && gbm) {
      navigate(`/${gbm.toLowerCase()}`);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};