import { createBrowserRouter, Navigate } from "react-router-dom";

// Import admin components
import EventEdit, { loader as eventEditLoader } from "./admin/events/EventEdit";
import EventNew from "./admin/events/EventNew";
import EventsAdminList, { loader as eventListAdminLoader } from "./admin/events/EventsAdminList";
import UserNew from "./admin/users/UserNew";
import UsersAdminList from "./admin/events/EventsAdminList"

// Import user components
import Contacts from "./components/contacts/Contacts";
import EventDetailUser, { loader as eventDetailUserLoader } from "./components/events/EventDetailUser";
import EventDetailAdmin, { loader as eventDetailAdminLoader } from "./admin/events/EventDetailAdmin";
import EventsListClient, { loader as eventListClientLoader } from "./components/events/EventsListClient";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import NoMatch from "./components/nomatch/NoMatch";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserLogInRegisterLayout from "./components/users/components/UserLoginLayout";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";
// Import authentication components (placeholder for future auth)
// import AdminLayout from "./components/layout/AdminLayout";
// import UserLayout from "./components/layout/UserLayout";

// Define route paths as constants for better maintainability
const ROUTE_PATHS = {
  HOME: "/",
  EVENTS: "/events",
  ADMIN: "/admin",
  CONTACT: "/contact",
  NOT_FOUND: "*",

  // Admin routes
  ADMIN_EVENTS: "/admin/events",
  ADMIN_USERS: "/admin/users",

  // User routes
  USER_EVENTS: "/events",
  USER_PROFILE: "/profile",
};

// Admin Dashboard Layout with sidebar navigation
const AdminDashboard = () => {
  return (
    <Layout>
      {/* Admin content will be rendered here */}
    </Layout>
  );
};


// Create the router with proper typing
export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: 
       <ProtectedRoute redirectPath="/login" requiredRole="admin">
          <Layout />,
     </ProtectedRoute>,
    children: [
      // Public routes
      { index: true, element: <Home /> },

      // User routes - accessible to all users
      {
        path: ROUTE_PATHS.EVENTS,
        children: [
          { index: true, element: <EventsListClient />, loader: eventListClientLoader },
          { path: "detail/:id", element: <EventDetailUser />, loader: eventDetailUserLoader },
        ]
      },

      // Contact route
      { path: ROUTE_PATHS.CONTACT, element: <Contacts /> },

      // Admin routes - protected routes with role-based access control
      {
        path: ROUTE_PATHS.ADMIN,
        element: (
          <ProtectedRoute redirectPath={"/forbidden"} requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          // Events management
          {
            path: "events",
            children: [
              { index: true, element: <EventsAdminList />, loader: eventListAdminLoader },
              { path: "new", element: <EventNew /> },
              { path: "edit/:id", element: <EventEdit />, loader: eventEditLoader },
              { path: "detail/:id", element: <EventDetailAdmin />, loader: eventDetailAdminLoader },
            ]
          },

          // Users management
          {
            path: "users",
            children: [
              { index: true, element: <UsersAdminList /> },
              { path: "new", element: <UserNew /> },
            ]
          },

          // Admin dashboard home (redirect to events for now)
          { index: true, element: <Navigate to="events" replace /> },
        ]
      },

      // User profile route (placeholder for future implementation)
      // { path: ROUTE_PATHS.USER_PROFILE, element: <UserProfile /> },

      // 404 Not Found
      { path: ROUTE_PATHS.NOT_FOUND, element: <NoMatch /> },
    ],
  },
  {
    path: "/login",
    element: <UserLogInRegisterLayout/>,
    children: [
      {
        index: true, element: <LogInPage/>
      },
       {
        path: "register", element: <RegisterPage/>
      }
    ]
  }
]);

// Export route paths for use throughout the application
export { ROUTE_PATHS };