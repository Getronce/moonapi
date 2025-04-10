import { getUserSubscription } from "../../data/api/userApi.js";
import {
  getUserFromLocalStorageByEmail,
  getUserFromLocalStorageById,
} from "../../data/storage/storage.js";

let selectedFlag = null;

export function checkAuthStatus() {
  const userEmail = getUserFromLocalStorageByEmail();
  const authContainer = document.getElementById("menu");
  if (userEmail) {
    const profileLink = document.createElement("a");
    profileLink.href = "profile.html";
    const profileImg = document.createElement("img");
    profileImg.src = "../../../public/assets/acc.png";
    profileImg.alt = "Профиль";
    profileLink.appendChild(profileImg);
    authContainer.innerHTML = "";
    authContainer.appendChild(profileLink);
  } else {
    authContainer.innerHTML =
      '<a href="../pages/login.html">Вход/Регистрация</a>';
  }
}

export async function loadSubscriptions() {
  const userId = getUserFromLocalStorageById();

  try {
    const subscriptionDataResponse = await getUserSubscription(userId);

    if (subscriptionDataResponse.ok) {
      const subscriptions = await subscriptionDataResponse.json();
      const activeServers = new Set(
        Array.isArray(subscriptions)
          ? subscriptions.map((sub) => sub.servers)
          : []
      );

      updateFlagsStatus(activeServers);
    } else {
      console.log("Подписки не найдены.");
    }
  } catch (error) {
    console.error("Ошибка при загрузке подписок:", error);
  }
}

function updateFlagsStatus(activeServers) {
  const allFlags = document.querySelectorAll(".flags img");

  allFlags.forEach((flag) => {
    const flagId = flag.id;

    if (!activeServers.has(flagId)) {
      flag.classList.add("disabled");
      flag.style.pointerEvents = "none";
    } else {
      flag.classList.remove("disabled");
      flag.style.pointerEvents = "auto";
    }
  });
}

export function selectFlag(flag) {
  const btn = document.querySelector(".connect-btn");

  if (
    btn.innerHTML === "ПОДКЛЮЧЕНО" ||
    btn.innerHTML === "Подключение..." ||
    btn.innerHTML === "Отключение..."
  ) {
    return;
  }

  if (flag.classList.contains("disabled")) {
    return;
  }

  document.querySelectorAll(".flags img").forEach((f) => {
    f.classList.remove("selected-flag");
    f.classList.remove("disabled2");
  });

  flag.classList.add("selected-flag");
  selectedFlag = flag.id;

  btn.innerText = "ПОДКЛЮЧИТЬСЯ";
}

export function connect(button) {
  const flags = document.querySelectorAll(".flags img");

  if (button.innerText === "Выберите сервер подключения") {
    return;
  }

  if (button.innerText === "ПОДКЛЮЧИТЬСЯ") {
    button.classList.add("loading");
    button.innerText = "Подключение...";

    flags.forEach((flag) => {
      if (!flag.classList.contains("selected-flag")) {
        flag.classList.add("hidden");
        flag.classList.add("disabled2");
      }
    });

    setTimeout(() => {
      button.classList.remove("loading");
      button.classList.add("connected");
      button.innerText = "ПОДКЛЮЧЕНО";
    }, 5000);
  } else if (button.innerText === "ПОДКЛЮЧЕНО") {
    button.classList.add("loading");
    button.innerText = "Отключение...";

    setTimeout(() => {
      button.classList.remove("loading");
      button.classList.remove("connected");
      button.innerText = "ПОДКЛЮЧИТЬСЯ";

      flags.forEach((flag) => {
        flag.classList.remove("hidden");
        flag.classList.remove("disabled2");
      });
    }, 3000);
  }
}
