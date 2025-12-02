import { BASE_URL } from "../constants";

export const onDelete = async (event_id: string): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/${event_id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete event");
  }
  return await response.json();

  } catch (error) {
    throw error;
  }
  
};
