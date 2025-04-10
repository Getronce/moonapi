import { loginUser, registerUser } from "../../data/api/authApi.js";

export async function handleRegistration(email, password) {
  return await registerUser(email, password);
}

export async function handleLogin(email, password) {
  return await loginUser(email, password);
}
