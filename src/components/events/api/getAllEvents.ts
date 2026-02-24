import { BASE_URL } from "../constants";
import { EventAPIResponse } from "../events.type";


const getAllEvents = async (): Promise<EventAPIResponse[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    return await response.json();
  } catch (error) {
    return Promise.reject(error)
  }
};

export default getAllEvents;
