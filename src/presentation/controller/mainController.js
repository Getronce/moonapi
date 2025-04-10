import { toggleTheme } from "../../core/theme.js";
import {
  checkAuthStatus,
  connect,
  loadSubscriptions,
  selectFlag,
} from "../../domain/services/mainService.js";

export function initializeMainPage() {
  checkAuthStatus();
  loadSubscriptions();

  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);

  document.querySelector(".connect-btn").addEventListener("click", function () {
    connect(this);
  });

  document.querySelectorAll(".flags img").forEach((flag) => {
    flag.addEventListener("click", function () {
      selectFlag(flag);
    });
  });
}
