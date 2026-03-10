import { BASE_URL } from '../constants';
import { EventAPIResponse } from '../events.type';
import { CreateUpdateEvent } from '../schema';



const updateEvent = async (event: CreateUpdateEvent, id: string): Promise<EventAPIResponse> => {
    const response = await fetch(`${BASE_URL}/api/events/${id}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
}

export default updateEvent;