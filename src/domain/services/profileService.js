import {
  addBalance,
  getBalance,
  getUserSubscription,
  purchaseSubscription,
} from "../../data/api/userApi.js";
import { getUserFromLocalStorageByEmail } from "../../data/storage/storage.js";
import { showModal } from "../../presentation/components/modal.js";

export async function handleBalanceUpdate(userId, amount) {
  try {
    const response = await addBalance(userId, amount);
    if (response.status === 201) {
      showModal(
        "Баланс пополнен успешно!",
        "Вы успешно пополнили баланс.",
        "success"
      );
    } else {
      const data = response.json();
      showModal(
        "Ошибка",
        "Не удалось пополнить баланс. Попробуйте снова.",
        "error"
      );
    }
  } catch (error) {
    console.error("Ошибка при пополнении баланса:", error);
  }
}

export async function handleSubscription(userId, server, amount) {
  try {
    const response = await purchaseSubscription(userId, server, amount);
    if (response.ok) {
      showModal(
        "Подписка успешна!",
        `Подписка на сервер ${server} успешна!`,
        "success"
      );
    } else {
      const data = await response.json();
      showModal(
        "Ошибка",
        `Ошибка: ${data.message || "Не удалось подписаться."}`,
        "error"
      );
    }
  } catch (error) {
    console.error("Ошибка при подписке:", error);
  }
}

export async function loadUserData(userId) {
  const userEmail = getUserFromLocalStorageByEmail();
  document.getElementById("user-email").textContent = userEmail;

  let balance = null;
  let subscriptions = [];
  const statusElement = document.querySelector(".status");

  try {
    const balanceDataResponse = await getBalance(userId);

    if (!balanceDataResponse.ok) {
      throw new Error(
        `Ошибка при получении баланса: ${balanceDataResponse.status}`
      );
    }

    balance = await balanceDataResponse.json();
  } catch (error) {
    console.error("Ошибка при получении баланса:", error);
  }

  try {
    const subscriptionDataResponse = await getUserSubscription(userId);

    if (subscriptionDataResponse.ok) {
      subscriptions = await subscriptionDataResponse.json();

      if (subscriptions.length === 0) {
        displayNoSubscriptionsMessage(statusElement);
      } else {
        displaySubscriptions(subscriptions, statusElement);
      }
    } else {
      throw new Error(
        `Ошибка при получении подписок: ${subscriptionDataResponse.status}`
      );
    }
  } catch (error) {
    console.error(error);
  }

  updateUserProfile(balance, subscriptions);
}

function updateUserProfile(balance, subscriptions) {
  document.getElementById("user-balance").textContent = balance.balance;

  const activeServers = new Set(
    Array.isArray(subscriptions) ? subscriptions.map((sub) => sub.servers) : []
  );

  updateServerButtons(activeServers);
}

function updateServerButtons(subscribedServers) {
  const isDarkTheme = document.body.classList.contains("dark-theme");

  document.querySelectorAll(".server-item").forEach((serverItem) => {
    const button = serverItem.querySelector(".buy-btn-server");
    const serverName = button.getAttribute("data-server");

    if (subscribedServers.has(serverName)) {
      button.textContent = "Подписка установлена";
      if (isDarkTheme) {
        button.style.backgroundColor = "#808080";
      } else {
        button.style.backgroundColor = "#808080";
      }
      button.disabled = true;
    }
  });
}

function displayNoSubscriptionsMessage(statusElement) {
  const messageElement = document.createElement("p");
  messageElement.textContent =
    "У вас нет подписок. Приобретите их, пожалуйста.";
  messageElement.style.color = "red";
  messageElement.style.fontWeight = "bold";
  statusElement.appendChild(messageElement);
}

function displaySubscriptions(subscriptions, statusElement) {
  const subscriptionsList = document.createElement("ul");

  subscriptions.forEach((sub) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Подписка на сервер: ${sub.servers}`;
    subscriptionsList.appendChild(listItem);
  });

  statusElement.appendChild(subscriptionsList);
}
