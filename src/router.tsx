import { createBrowserRouter } from "react-router-dom";
import EventEdit from "./admin/events/EventEdit";
import EventNew from "./admin/events/EventNew";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Contacts from "./components/contacts/Contacts";
import EventDetail, { loader as eventDetailLoader } from "./components/events/EventDetail";
import EventList from "./components/events/components/EventList";
import RoleBasedHome from "./components/home/RoleBasedHome";
import Layout from "./components/layout/Layout";
import NoMatch from "./components/nomatch/NoMatch";
import UserLogInRegisterLayout from "./components/users/components/UserLoginLayout";
import RegisterEvents from "./components/register-events/RegeisterEvents";
const ROUTE_PATHS = {
  HOME: "/",
  EVENTS: "/events",
  REGISTER_EVENTS: "/register-events",
  CONTACT: "/contact",
  NOT_FOUND: "*",
  USER_EVENTS: "/events",
  USER_PROFILE: "/profile",
};

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element:
      < ProtectedRoute redirectPath="/login">
        <Layout />,
      </ProtectedRoute >,
    children: [
      { index: true, element: <RoleBasedHome /> },
      {
        path: ROUTE_PATHS.EVENTS,
        children: [
          { index: true, element: <EventList /> },
          { path: "new", element: <EventNew /> },
          { path: ":id/edit", element: <EventEdit />, loader: eventDetailLoader },
          { path: ":id/detail", element: <EventDetail />, loader: eventDetailLoader },
        ]
      },
       { path: ROUTE_PATHS.REGISTER_EVENTS, element: <RegisterEvents /> },
      { path: ROUTE_PATHS.CONTACT, element: <Contacts /> },
      { path: ROUTE_PATHS.NOT_FOUND, element: <NoMatch /> },
    ],
  },
  {
    path: "/login",
    element: <UserLogInRegisterLayout />,
    children: [
      {
        index: true, element: <LogInPage />
      },
      {
        path: "new", element: <RegisterPage />
      }
    ]
  }
]);

export { ROUTE_PATHS };

