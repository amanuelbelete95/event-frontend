
import { BASE_URL } from "../constants";
import { EventAPIResponse } from "../events.type";
import { CreateUpdateEvent } from "../schema";


export const addEvents = async (
    event: CreateUpdateEvent
): Promise<EventAPIResponse> => {
    const response = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message)
    }
    return data;
};