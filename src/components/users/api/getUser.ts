
import { BASE_URL } from "../constants";
import { UserAPIResponse } from "../users.type";

export const getUser = async (
): Promise<UserAPIResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/api/register`);
         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }
        const newUser: UserAPIResponse = await response.json();
        return newUser;
    } catch (error) {
        return Promise.reject(error)
    }
};