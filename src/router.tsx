import { createBrowserRouter, Navigate } from "react-router-dom";

// Import admin components
import EventEdit, { loader as eventEditLoader } from "./admin/EventEdit";
import EventNew from "./admin/EventNew";
import EventsAdminList, { loader as eventListAdminLoader } from "./admin/EventsAdminList";
import UserNew from "./admin/UserNew";
import UsersAdminList from "./admin/UsersAdminList";

// Import user components
import Contacts from "./components/contacts/Contacts";
import EventDetail, { loader as eventDetailLoader } from "./components/events/EventDetail";
import EventsListClient, { loader as eventListClientLoader } from "./components/events/EventsListClient";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import NoMatch from "./components/nomatch/NoMatch";

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

// User Dashboard Layout
const UserDashboard = () => {
  return (
    <Layout>
      {/* User content will be rendered here */}
    </Layout>
  );
};

// Create the router with proper typing
export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: <Layout />,
    children: [
      // Public routes
      { path: ROUTE_PATHS.HOME, element: <Home /> },

      // User routes - accessible to all users
      {
        path: ROUTE_PATHS.EVENTS,
        children: [
          { index: true, element: <EventsListClient />, loader: eventListClientLoader },
          { path: "detail/:id", element: <EventDetail />, loader: eventDetailLoader },
        ]
      },

      // Contact route
      { path: ROUTE_PATHS.CONTACT, element: <Contacts /> },

      // Admin routes - protected routes (would add auth guard in real implementation)
      {
        path: ROUTE_PATHS.ADMIN,
        element: <AdminDashboard />, // Admin layout with sidebar
        children: [
          // Events management
          {
            path: "events",
            children: [
              { index: true, element: <EventsAdminList />, loader: eventListAdminLoader },
              { path: "new", element: <EventNew /> },
              { path: "edit/:id", element: <EventEdit />, loader: eventEditLoader },
              { path: "detail/:id", element: <EventDetail />, loader: eventDetailLoader },
            ]
          },

          // Users management
          {
            path: "users",
            children: [
              { index: true, element: <UsersAdminList /> },
              { path: "new", element: <UserNew /> },
              // Future user management routes would go here
              // { path: "edit/:id", element: <UserEdit />, loader: userEditLoader },
              // { path: "detail/:id", element: <UserDetail />, loader: userDetailLoader },
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
]);

// Export route paths for use throughout the application
export { ROUTE_PATHS };