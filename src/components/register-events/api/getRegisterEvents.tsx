import { get } from "http";
import { BASE_URL } from "../../events/constants";

export const getRegisterEvents = async () => {
    const response = await fetch(`${BASE_URL}/api/event-register`);
     const data =  response.json();
     if(!response.ok) {
        throw new Error("Failed to fetch register events");
     }
     return data;
}