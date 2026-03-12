import { useQuery } from "@tanstack/react-query";
import getAllEvents from "../api/getAllEvents";
import { EventAPIResponse } from "../events.type";
import getEventById from "../api/getEvent";

const useFetchEvent = (id: string) =>
  useQuery<EventAPIResponse>({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });

export default useFetchEvent;