import { BASE_URL } from "../constants";
import { Event, EventAPIResponse } from "../events.type";


const getAllEvents = async (): Promise<EventAPIResponse[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const events = await response.json();
    return events;
  } catch (error) {
   return Promise.reject(error)
  }
};

export default getAllEvents;
