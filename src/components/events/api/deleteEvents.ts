import { BASE_URL } from "../constants";


interface DeleteEventAPiResponse {
  message: string
}

export const onDelete = async (event_id: string): Promise<DeleteEventAPiResponse> => {
  const response = await fetch(`${BASE_URL}/api/events/${event_id}/delete`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete event");
  }
  const data: DeleteEventAPiResponse = await response.json()
  return data
}
