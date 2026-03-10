import { useQuery } from "@tanstack/react-query";
import getAllEvents from "../api/getAllEvents";
import { EventAPIResponse } from "../events.type";

const useFetchAllEvents = () =>
  useQuery<EventAPIResponse[]>({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });

export default useFetchAllEvents;