import { BASE_URL } from "../constants";
import { Event, EventAPIResponse } from "../events.type";

export const getEventById = async (id: string): Promise<EventAPIResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/${id}`);
  
    if (response.status !== 200) {
      const errorBody = await response.json();
      const errorMessage = errorBody.message || `HTTP error! status: ${response.status}`;
      throw new Error(`${errorMessage}`);
    }
    return await response.json() as EventAPIResponse;

  } catch (error) {
    return Promise.reject(error)
  }
};

export default getEventById;
