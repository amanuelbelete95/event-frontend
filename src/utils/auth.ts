/**
 * Authentication and Authorization Utilities
 */

// Mock user data - in a real app, this would come from your auth provider
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  token?: string;
}

// Mock current user - replace with actual auth state management
let currentUser: User | null = null;

/**
 * Set the current authenticated user
 */
export const setCurrentUser = (user: User | null) => {
  currentUser = user;
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = (): User | null => {
  return currentUser;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return currentUser !== null;
};

/**
 * Check if user has admin role
 */
export const isAdmin = (): boolean => {
  return currentUser?.role === 'admin';
};

/**
 * Check if user has specific role
 */
export const hasRole = (role: 'admin' | 'user' | "any"): boolean => {
  return currentUser?.role === role;
};

/**
 * Check if user is authorized to access a route
 */
export const isAuthorized = (requiredRole: 'admin' | 'user' | 'any' = 'any'): boolean => {
  return  isAuthenticated() &&  hasRole(requiredRole);
};

// /**
