
import { BASE_URL } from "../constants";
import { UserListResponse } from "../users.type";

export const getAllUsers = async (): Promise<UserListResponse> => {
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
        const users: UserListResponse = await response.json();
        return users;
    } catch (error) {
        return Promise.reject(error)
    }
};