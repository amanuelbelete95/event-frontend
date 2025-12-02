import { BASE_URL } from "../constants";
import { Event } from "../events.type";

const getEvent = async (id: string): Promise<Event> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/${id}`);
    // Check the specific HTTP status codes returned by the backend
    if (response.status !== 200) {
      const errorBody = await response.json(); // Read the JSON error message from the backend
      switch (response.status) {
        case 400:
          // Handle 'Bad Request' (e.g., missing ID)
          console.error(`Client Error: ${errorBody.message}`);
          // You might throw a specific error type or return null/undefined
          throw new Error(`Invalid request: ${errorBody.message}`);
        
        case 404:
          // Handle 'Not Found' (e.g., event ID not found in DB)
          console.error(`Resource Error: ${errorBody.message}`);
          throw new Error(`Event not found: ${errorBody.message}`);
          
        case 500:
          // Handle 'Internal Server Error' (e.g., DB connection failed)
          console.error(`Server Error: ${errorBody.message}`);
          throw new Error(`Server error: ${errorBody.message}`);

        default:
          // Handle any other unexpected non-2xx status codes
          throw new Error(`Failed to fetch event: ${errorBody.message || response.statusText}`);
      }
    }

    // If the response is OK (HTTP 200), parse and return the data
    return await response.json();

  } catch (error) {
    // This catch block handles network errors (fetch failure) 
    // or the specific errors thrown in the switch statement above.
    console.error("Error in getEvent:", error?.message);
    throw error; // Re-throw the structured error for the UI layer to handle
  }
};

export default getEvent;
