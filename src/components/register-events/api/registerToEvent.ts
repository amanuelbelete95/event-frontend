import { BASE_URL } from "../../events/constants";


export const registerToEvent = async (
    event: any
) => {
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