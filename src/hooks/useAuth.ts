import { useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, isAuthenticated, isAdmin, hasRole, login as authLogin, logout as authLogout, User } from '../utils/auth';

/**
 * Custom hook for authentication and authorization
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  /**
   * Login function
   */
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const loggedInUser = await authLogin(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    authLogout();
    setUser(null);
  };

  /**
   * Check if user is authenticated
   */
  const checkAuth = (): boolean => {
    return isAuthenticated();
  };

  /**
   * Check if user has admin role
   */
  const checkAdmin = (): boolean => {
    return isAdmin();
  };

  /**
   * Check if user has specific role
   */
  const checkRole = (role: 'admin' | 'user'): boolean => {
    return hasRole(role);
  };

  /**
   * Check if user is authorized for a specific action
   */
  const checkAuthorization = (requiredRole: 'admin' | 'user' | 'any' = 'any'): boolean => {
    if (requiredRole === 'any') {
      return checkAuth();
    }
    return checkRole(requiredRole);
  };

  return {
    user,
    loading,
    isAuthenticated: checkAuth(),
    isAdmin: checkAdmin(),
    hasRole: checkRole,
    isAuthorized: checkAuthorization,
    login,
    logout,
    setUser
  };
};

/**
 * Higher-order component for role-based access control
 */
export const withAuth = (Component: React.ComponentType<any>, requiredRole: 'admin' | 'user' | 'any' = 'any') => {
  return (props: any) => {
    const { isAuthorized, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthorized(requiredRole)) {
      return <div>Unauthorized access</div>;
    }

    return <Component {...props} />;
  };
};