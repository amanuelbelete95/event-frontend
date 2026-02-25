import { BASE_URL } from "../../events/constants";
import { CreateUpdateRegistration, RegisterEventResponse } from "../EventRegisterForm";

export const registerToEvent = async (
    event: CreateUpdateRegistration
): Promise<RegisterEventResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/api/event-register`, {
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