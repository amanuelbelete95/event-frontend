
export interface Event {
  name: string;
  event_date: string;
  event_status: string;
  location: string;
  description?: string;
}

export interface EventAPIResponse {
  event_id: string;
  name: string;
  location: string;
  event_date: string;
  event_status: string;
  description?: string;
}
