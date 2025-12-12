import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getUser } from '../users/api/getUser';
import { UserAPIResponse } from '../users/users.type';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'employee' | 'any';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  isAdminUser: boolean;
  isRandomUser: boolean;
  isEmployeeUser: boolean;
  login: () => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Check if user is authenticated
  const isAuthenticated = user !== null;

  // Role-based checks with null safety
  const isAdminUser = user?.role === "admin";
  const isRandomUser = user?.role === "any";
  const isEmployeeUser = user?.role === "employee";

  // Fetch user data
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await getUser();

      // Transform API response to match our User interface
      const transformedUser: User = {
        id: userData.id,
        username: userData.username,
        role: userData.role as 'admin' | 'employee' | 'any'
      };

      setUser(transformedUser);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch user data'));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async () => {
    await fetchUser();
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Refresh user data
  const refreshUser = async () => {
    await fetchUser();
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    isAuthenticated,
    isAdminUser,
    isRandomUser,
    isEmployeeUser,
    login,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
