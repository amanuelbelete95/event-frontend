import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { BASE_URL } from "../events/constants";
import { logInUser } from "../users/api/logInUser";
import { CreateUpdateUser } from "../users/schema";
import { UserAPIResponse } from "../users/users.type";
import { UserRole } from "../events/events.type";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  password?: string,
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  login: (data: CreateUpdateUser) => Promise<UserAPIResponse>;
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

  const isAuthenticated = !!user;

  const login = async (data: CreateUpdateUser): Promise<UserAPIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const { token, user } = await logInUser(data);
      localStorage.setItem("token", token);
      setIsLoading(false)
      setUser(user)
      return user;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Login failed"));
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const refreshUser = async () => {
    // Implementation can be added later if needed
  };

  const contextValue = useMemo<AuthContextType>(() => ({
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    refreshUser
  }), [user, isLoading, error, isAuthenticated, login]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
