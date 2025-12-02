
import { EventFormTypes } from "../components/EventForm";
import { BASE_URL } from "../constants";


export const addEvents = async (
    event: EventFormTypes
): Promise<Event | null> => {
    try {
        const response = await fetch(`${BASE_URL}/api/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(event),
        });
        if (!response.ok) throw new Error("Failed to add event");
        const newAddisEvent: Event = await response.json();
        return newAddisEvent;
    } catch (error) {
        throw error;
    }
};