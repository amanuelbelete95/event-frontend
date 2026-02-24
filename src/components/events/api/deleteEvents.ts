import { BASE_URL } from "../constants";


interface DeleteEventAPiResponse {
  message: string
}

export const onDelete = async (eventId: string): Promise<DeleteEventAPiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/events/${eventId}/delete`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json()
  } catch (error) {
    return Promise.reject(error)
  }

}
