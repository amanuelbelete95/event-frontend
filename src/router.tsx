import { createBrowserRouter } from "react-router-dom";
import Contacts from "./components/contacts/Contacts";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import NoMatch from "./components/nomatch/NoMatch";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import EventList from "./components/events/components/EventList";
import UserLogInRegisterLayout from "./components/users/components/UserLoginLayout";
import EventNew from "./admin/events/EventNew";
import EventDetail, { loader as eventDetailLoader } from "./components/events/EventDetail";
import EventEdit from "./admin/events/EventEdit";
import EventRegisterForm from "./components/register-events/EventRegisterForm";
const ROUTE_PATHS = {
  HOME: "/",
  EVENTS: "/events",
  ADMIN: "/admin",
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
      { index: true, element: <Home /> },
      {
        path: ROUTE_PATHS.EVENTS,
        children: [
          { index: true, element: <EventList /> },
          { path: "new", element: <EventNew /> },
          { path: ":id/edit", element: <EventEdit />, loader: eventDetailLoader },
          { path: ":id/detail", element: <EventDetail />, loader: eventDetailLoader },
          { path: ":id/register-event", element: <EventRegisterForm /> },
        ]
      },
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
