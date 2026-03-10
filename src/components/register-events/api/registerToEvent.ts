import { BASE_URL } from "../../events/constants";
import { CreateUpdateRegistration, RegisterEventResponse } from "../EventRegisterForm";

export const registerToEvent = async (
    event: CreateUpdateRegistration
): Promise<RegisterEventResponse> => {
    const response = await fetch(`${BASE_URL}/api/event-register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
    return data;
};