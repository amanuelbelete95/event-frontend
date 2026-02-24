
import { BASE_URL } from "../constants";
import { UserAPIResponse } from "../users.type";
import { CreateUpdateUser } from "../schema";

export const registerUser = async (
    user: CreateUpdateUser
): Promise<UserAPIResponse> => {
    const { username, password, confirmPassword } = user
    try {
        const response = await fetch(`${BASE_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, confirmPassword }),
        });
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