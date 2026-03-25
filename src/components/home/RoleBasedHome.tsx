import { useAuth } from "../auth/AuthProvider";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";

const RoleBasedHome = () => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <AdminHome />;
  }

  return <UserHome />;
};

export default RoleBasedHome;
