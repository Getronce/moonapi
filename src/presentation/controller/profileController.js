import { getUserFromLocalStorageById } from "../../data/storage/storage.js";
import {
  handleBalanceUpdate,
  handleSubscription,
  loadUserData,
} from "../../domain/services/profileService.js";

export async function initializeProfilePage() {
  const userId = getUserFromLocalStorageById();

  if (!userId) {
    window.location.href = "login.html";
    return;
  }

  loadUserData(userId);

  document.querySelector(".logout-button").addEventListener("click", logout);

  document.querySelectorAll(".buy-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const amount = parseInt(button.getAttribute("data-amount"));
      handleBalanceUpdate(userId, amount);
    });
  });

  document.querySelectorAll(".buy-btn-server").forEach((button) => {
    button.addEventListener("click", () => {
      const server = button.getAttribute("data-server");
      const amount = parseInt(button.getAttribute("data-amount"));
      handleSubscription(userId, server, amount);
    });
  });
}

function logout() {
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  window.location.href = "main.html";
}
