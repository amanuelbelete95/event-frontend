import { BASE_URL } from "../constants";

export const logInUser = async (userName: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json(); // { token: "..." }
  } catch (err) {
    return Promise.reject(err);
  }
};

