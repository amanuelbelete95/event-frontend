import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { logInUser } from "../users/api/logInUser";
import { BASE_URL } from "../events/constants";

export interface User {
  id: string;
  username: string;
  role: "admin" | "employee" | "any";
  password: string,
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  isAdminUser: boolean;
  isRandomUser: boolean;
  isEmployeeUser: boolean;
  login: (userName: string, password: string) => Promise<void>;
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
  const isAdminUser = user?.role === "admin";
  const isRandomUser = user?.role === "any";
  const isEmployeeUser = user?.role === "employee";

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      const response = await fetch(`${BASE_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();

      const transformedUser: User = {
        id: data.id,
        username: data.username,
        role: data.role,
        password: data.password,
      };

      setUser(transformedUser);
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err : new Error("Failed to fetch user"));
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userName: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { token } = await logInUser(userName, password);
      localStorage.setItem("token", token); 
      await fetchUser();
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
    await fetchUser();
  };
  
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
    refreshUser,
  };

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
