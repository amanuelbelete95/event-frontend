import { BASE_URL } from '../constants';
import { Event, EventAPIResponse } from '../events.type';



const updateEvent = async (eventData: Event, id: string) => {
  try {
        const response = await fetch(`${BASE_URL}/api/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update event');
        }

        const updatedEvent: EventAPIResponse = await response.json();
        return updatedEvent;
    } catch (error) {
         return Promise.reject(error)
    }
}

export default updateEvent;