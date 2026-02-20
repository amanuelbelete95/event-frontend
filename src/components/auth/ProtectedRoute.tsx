import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export type Role = "admin" | "employee" | "any";

interface ProtectedRouteProps {
  isSignedIn?: boolean;
  requiredRole?: Role;
  redirectPath?: string;
  children?: React.ReactNode;
}



const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  redirectPath = '/',
  children
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }



  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;