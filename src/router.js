import {
  createBrowserRouter
} from "react-router-dom";
import EventEdit, { loader as eventEditLoader } from "./admin/EventEdit";
import EventNew from "./admin/EventNew";
import EventsAdminList, { eventListAdminLoader } from "./admin/EventsAdminList";
import UserNew from "./admin/UserNew";
import UsersAdminList, { loader as userListAdminLoader } from "./admin/UsersAdminList";
import Contacts from "./components/contacts/Contacts";
import EventDetail, { loader as eventDetailLoader } from "./components/events/EventDetail";
import EventsListClient, { loader as eventListClientLoader } from "./components/events/EventsListClient";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import NoMatch from "./components/nomatch/NoMatch";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "events",
        children: [
          { index: true, element: <EventsListClient />, loader: eventListClientLoader },
          { path: "detail/:id", element: <EventDetail />, loader: eventDetailLoader },
        ]
      },
      {

        path: "admin/events",
        children: [
          { index: true, element: <EventsAdminList />, loader: eventListAdminLoader },
          { path: "new", element: <EventNew />, },
          { path: "edit/:id", element: <EventEdit />, loader: eventEditLoader },
          { path: "detail/:id", element: <EventDetail />, loader: eventDetailLoader },

        ]
      }
      ,
      {
        path: "admin/users",
        children: [
          { index: true, element: <UsersAdminList />, loader: userListAdminLoader },
          { path: "new", element: <UserNew />, },
        ]
      },
      { path: "contact", element: <Contacts /> },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);
