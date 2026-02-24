
export type UserRole = 'admin' | 'employee' | 'user';

export interface User {
  id?: string;
  username: string;
  role?: UserRole | undefined;
  password: string;
  confirmPassword?: string
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  capacity: number;
  enrolledUsers: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventAPIResponse {
  id: string;
  name: string;
  location: string;
  event_date: string;
  event_status: string;
  description?: string;
}
