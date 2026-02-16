import { ReactNode } from 'react';
import { UserRole } from './events/events.type';
import { useAuth } from './auth/AuthProvider';

interface PermissionGuardProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
    requireAdmin?: boolean;
    fallback?: ReactNode;
}

export const PermissionGuard = ({
    children,
    allowedRoles,
    requireAdmin = false,
    fallback = null,
}: PermissionGuardProps) => {
    const { user } = useAuth();

    const isAdmin = user?.role === "admin";

    if (!user) return <>{fallback}</>;

    if (requireAdmin && !isAdmin) return <>{fallback}</>;

    if (allowedRoles && !allowedRoles.includes(user.role)) return <>{fallback}</>;

    return <>{children}</>;
};
