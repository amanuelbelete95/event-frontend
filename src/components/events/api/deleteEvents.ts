import { BASE_URL } from "../constants";

export const onDelete = async (event_id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/events/${event_id}/delete`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to delete event");
  }
  return await response.json();
}
