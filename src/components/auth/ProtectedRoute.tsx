import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  isSignedIn?: boolean;
  requiredRole?: 'admin' | 'employee' | 'any';
  redirectPath?: string;
  children?: React.ReactNode;
}

export type Role = "admin" | "employee" | "any";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  redirectPath = '/',
  children
}) => {
  const { isAuthenticated, isAdminUser, isEmployeeUser, isRandomUser, isLoading } = useAuth();

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  // Check authorization based on required role
  let isAllowed = true;
  if (requiredRole) {
    switch (requiredRole) {
      case 'admin':
        isAllowed = isAdminUser;
        break;
      case 'employee':
        isAllowed = isEmployeeUser;
        break;
      case 'any':
        isAllowed = isRandomUser;
        break;
      default:
        isAllowed = false;
    }
  }


  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  if (requiredRole && !isAllowed) {
    return <Navigate to={redirectPath} replace ={true} />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;