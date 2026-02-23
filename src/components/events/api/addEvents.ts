
import { BASE_URL } from "../constants";
import { EventAPIResponse } from "../events.type";
import { CreateUpdateEvent } from "../schema";


export const addEvents = async (
    event: CreateUpdateEvent
): Promise<EventAPIResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/api/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });
        return await response.json();
    } catch (error) {
        return Promise.reject(error)
    }
};