import {
  createBrowserRouter
} from "react-router-dom";
import Contacts from "./components/contacts/Contacts";
import EventDetail, { loader as eventDetailLoader } from "./components/events/EventDetail";
import EventsList, { loader as eventLoader } from "./components/events/EventsList";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import NoMatch from "./components/nomatch/NoMatch";

import EventForm from "./components/events/components/EventForm";

// Admin
import ImportSettings from "./components/settings/ImportSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "events",
        children: [
          { index: true, element: <EventsList />, loader: eventLoader, errorElement: <h1>No Event List Found</h1> },
          { path: "new", element: <EventForm />, },
          { path: "detail/:id", element: <EventDetail />, loader: eventDetailLoader },
        ],
      },
      {
        path: "settings", element: <ImportSettings />
      },
      { path: "contact", element: <Contacts /> },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);
