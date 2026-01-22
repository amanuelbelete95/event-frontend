import { BASE_URL } from "../constants";
import { CreateUpdateUser } from "../schema";

export const logInUser = async (user: Partial<CreateUpdateUser>) => {
  const {username, password } = user
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
  const data = await response.json(); // { token: "..." }
  console.log("loged In successfully")
  return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

