import { API_URL } from "../../core/constants.js";

export async function addBalance(userId, amount) {
  const response = await fetch(`${API_URL}/user/${userId}/balance/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  return response;
}

export async function getBalance(userId) {
  const response = await fetch(`${API_URL}/user/${userId}/balance`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export async function purchaseSubscription(userId, server, amount) {
  const response = await fetch(
    `${API_URL}/user/${userId}/subscription/purchase`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ server, amount }),
    }
  );
  return response;
}

export async function getUserSubscription(userId) {
  const response = await fetch(`${API_URL}/user/${userId}/subscriptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response;
}
