import { BASE_URL } from "../constants";
import { EventAPIResponse } from "../events.type";

export const getEventById = async (id: string): Promise<EventAPIResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/${id}`);
    return await response.json() as EventAPIResponse;
  } catch (error) {
    return Promise.reject(error)
  }
};

export default getEventById;
