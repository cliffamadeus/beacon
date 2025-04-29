// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, AuthState } from '../types/auth';
import { ROLES, ADMIN_EMAIL_DOMAIN } from '../utils/constants';
import { supabase } from '../api/supabase'; // Ensure this is your configured Supabase client

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: string) => Promise<AuthUser | null>;
  logout: () => void;
  verifyDomain: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const verifyDomain = (email: string) => {
    const allowedDomains = ['@nbsc.edu.ph'];
    return allowedDomains.some(domain => email.endsWith(domain));
  };

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    setError(null);
    try {
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

      setUser(user);
      setIsLoading(false);
      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setUser(null);
      setIsLoading(false);
      setError(message);
      return null;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
    setError(null);
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const email = session?.user?.email;

      if (email && !verifyDomain(email)) {
        await supabase.auth.signOut();
        setUser(null);
        setIsLoading(false);
        return;
      }

      if (session?.user) {
        const userRole = email?.endsWith(ADMIN_EMAIL_DOMAIN) ? ROLES.ADMIN : ROLES.ALUMNI;
        setUser({
          id: session.user.id,
          email: session.user.email,
          role: userRole,
        });
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, verifyDomain }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
