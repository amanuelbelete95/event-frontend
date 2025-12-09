import { BASE_URL } from "../constants";
import { Event, EventAPIResponse } from "../events.type";

export const getEventById = async (id: string): Promise<EventAPIResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/${id}`);
  
    if (response.status !== 200) {
      const errorBody = await response.json(); 
      console.error(`Resource Error: ${errorBody.message}`)
      throw new Error(`Server error: ${errorBody.message}`);
    
    }
    return await response.json() as EventAPIResponse;

  } catch (error) {
    return Promise.reject(error)
  }
};

export default getEventById;
