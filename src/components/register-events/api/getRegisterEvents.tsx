import { get } from "http";
import { BASE_URL } from "../../events/constants";
import { EventAPIResponse } from "../../events/events.type";
import { UserAPIResponse } from "../../users/users.type";
interface RegisterEventApiResponse {
    event: EventAPIResponse;
    user: UserAPIResponse;
    id: string;
    user_id: string;
    event_id: string;
    reason: string;
}
export const getRegisterEvents = async ({params}: {params?: Record<string, string>}) : Promise<RegisterEventApiResponse[]> => {
  const queryString = params
    ? "?" + new URLSearchParams(params).toString()
    : "";

  const response = await fetch(`${BASE_URL}/api/event-register${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch register events");
  }

  const data = await response.json();
  return data;
};