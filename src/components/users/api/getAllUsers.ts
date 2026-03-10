
import { BASE_URL } from "../constants";
import { UserAPIResponse } from "../users.type";

export const getAllUsers = async (): Promise<UserAPIResponse[]> => {
    try {
        const response = await fetch(`${BASE_URL}/api/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
              },
        });
         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch users');
        }
        const users: UserAPIResponse[] = await response.json();
        return users;
    } catch (error) {
        return Promise.reject(error)
    }
};