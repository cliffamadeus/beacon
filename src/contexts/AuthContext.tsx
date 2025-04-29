// src/contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import { AuthUser, AuthState } from '../types/auth';
import { ROLES, ADMIN_EMAIL_DOMAIN } from '../utils/constants';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: string) => Promise<AuthUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });

  const login = async (email: string, password: string, role: string) => {
    setState({ ...state, isLoading: true });
    try {
      // In a real app, you would call your authentication API here
      // This is a mock implementation for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const userRole = email.endsWith(ADMIN_EMAIL_DOMAIN) ? ROLES.ADMIN : ROLES.ALUMNI;
      
      if (role !== userRole) {
        throw new Error(`You must login as ${userRole}`);
      }

      const user: AuthUser = {
        id: 'mock-user-id',
        email,
        role: userRole,
      };

      setState({ user, isLoading: false, error: null });
      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setState({ user: null, isLoading: false, error: message });
      return null;
    }
  };

  const logout = () => {
    setState({ user: null, isLoading: false, error: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);