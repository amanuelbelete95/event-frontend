import { Navigate, Outlet } from 'react-router-dom';
import { isAuthorized, isAuthenticated } from '../../utils/auth';

interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'user'
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  redirectPath = '/',
  children
}) => {
  // Check if user is authenticated and authorized
  const isAuth = isAuthenticated();
  const isAllowed = isAuthorized(requiredRole);

  if (!isAuth) {
    // User is not authenticated, redirect to login or home
    return <Navigate to={redirectPath} replace />;
  }

  if (!isAllowed) {
    // User is authenticated but doesn't have required role
    // Redirect to unauthorized page or home
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;