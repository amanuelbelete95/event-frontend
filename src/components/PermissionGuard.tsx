import { ReactNode } from 'react';
import { UserRole } from './events/events.type';
import { useAuth } from './auth/AuthProvider';

interface PermissionGuardProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
    fallback?: ReactNode;
}

export const PermissionGuard = ({
    children,
    allowedRoles,
    fallback = null,
}: PermissionGuardProps) => {
    const { user } = useAuth();
    if (!user) return <>{fallback}</>;

    if (allowedRoles && !allowedRoles.includes(user.role)) return <>{fallback}</>;

    return <>{children}</>;
};
